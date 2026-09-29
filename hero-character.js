/* ============================================================
   HERO CHARACTER — frame-sequence engine (vanilla, no React state)
   Video → frames → cursor-zone reactions.

   Data: assets/hero-frames/manifest.json (written by tools/extract-frames.sh)
   {
     "fps": 15, "count": 120,
     "desktop": { "dir": "assets/hero-frames/desktop/", "w": 1440, "h": 810 },
     "mobile":  { "dir": "assets/hero-frames/mobile/",  "w": 720,  "h": 810 },
     "pattern": "f_%04d.webp",           // 1-based file index
     "segments": {                        // 0-based frame indices, inclusive
       "idle":  [0, 29],                  // working on laptop (ping-pong loop)
       "left":  [30, 44],                 // [start, peak] look-left
       "right": [45, 59],                 // [start, peak] look-right
       "greet": [60, 119]                 // notice → headset off → wave → point
     },
     "greetBeats": [0.0, 0.45, 0.78]      // progress where each center message starts
   }

   The cursor never drives the character directly — it only selects a zone.
   ============================================================ */
(function () {
  'use strict';

  var HOLD_MS = 2600;          // left/right reaction hold
  var GREET_HOLD_MS = 3200;    // minimum hold on the final "pointing" pose
  var XFADE_MS = 240;          // crossfade when jumping between non-adjacent frames
  var ZONE_L = 0.36, ZONE_R = 0.64, HYST = 0.02;

  var MSG = {
    left: ['Anyone here on the left?'],
    right: ['Anyone here on the right?'],
    greet: ["Hey, it's you!", 'Hiiii!', 'Check out the portfolio']
  };

  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function fileName(pattern, i) {
    return pattern.replace(/%0(\d)d/, function (_, w) { return pad(i + 1, +w); });
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function mount(root, opts) {
    opts = opts || {};
    var manifestUrl = opts.manifest || 'assets/hero-frames/manifest.json';
    var canvas = root.querySelector('.hc-canvas');
    var msgEl = root.querySelector('.hc-message');
    var msgText = root.querySelector('.hc-message-text');
    if (!canvas) return function () {};
    var ctx = canvas.getContext('2d', { alpha: true });

    var mqDesktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)');
    var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    var alive = true, raf = 0, visible = true, lastT = 0;
    var M = null, set = null, frames = [], fps = 15;
    var S = null; // segments

    // ---- playback state ----
    var head = 0;            // float frame index
    var target = 0;
    var speed = 1;           // multiplier on fps
    var dir = 1;             // idle ping-pong direction
    var mode = 'boot';       // idle | react-in | react-hold | react-out | greet | greet-hold | greet-out
    var react = null;        // 'left' | 'right'
    var holdUntil = 0;
    var ghost = -1, ghostAlpha = 0; // crossfade source
    var pending = null;      // zone-enter event waiting to be consumed
    var zone = null;         // current pointer zone
    var msgKey = '';

    // ---------- messages (direct DOM, no React) ----------
    function setMessage(key, text, side) {
      if (!msgEl || key === msgKey) return;
      msgKey = key;
      msgEl.classList.remove('is-on');
      clearTimeout(setMessage._t);
      if (!text) { msgEl.removeAttribute('data-side'); return; }
      setMessage._t = setTimeout(function () {
        msgText.textContent = text;
        msgEl.setAttribute('data-side', side || 'center');
        msgEl.classList.add('is-on');
      }, 160);
    }
    root.setAttribute('data-hc-zone', 'none');

    // ---------- sizing ----------
    function resize() {
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    }

    // ---------- loading ----------
    function loadImg(i) {
      if (frames[i]) return frames[i].p;
      var img = new Image();
      img.decoding = 'async';
      var rec = { img: img, ok: false, p: null };
      frames[i] = rec;
      rec.p = new Promise(function (res) {
        img.onload = function () {
          (img.decode ? img.decode() : Promise.resolve()).catch(function () {}).then(function () { rec.ok = true; res(); });
        };
        img.onerror = function () { res(); };
      });
      img.src = set.dir + fileName(M.pattern, i);
      return rec.p;
    }
    function loadRange(a, b) {
      var ps = [];
      for (var i = a; i <= b; i++) ps.push(loadImg(i));
      return Promise.all(ps);
    }
    function nearestLoaded(i) {
      i = clamp(i, 0, M.count - 1);
      if (frames[i] && frames[i].ok) return i;
      for (var d = 1; d < M.count; d++) {
        if (frames[i - d] && frames[i - d].ok) return i - d;
        if (frames[i + d] && frames[i + d].ok) return i + d;
      }
      return -1;
    }

    // ---------- drawing ----------
    function drawImage(idx, alpha) {
      var k = nearestLoaded(idx);
      if (k < 0) return;
      var img = frames[k].img;
      var cw = canvas.width, ch = canvas.height;
      var s = Math.min(cw / img.naturalWidth, ch / img.naturalHeight); // contain: never crop head/laptop
      var w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, ch - h, w, h); // bottom-anchored
    }
    function render() {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var f0 = Math.floor(head), t = head - f0;
      drawImage(f0, 1);
      if (t > 0.01) drawImage(f0 + 1, t);          // sub-frame interpolation
      if (ghostAlpha > 0.01 && ghost >= 0) drawImage(ghost, ghostAlpha); // crossfade out of old pose
      ctx.globalAlpha = 1;
    }

    // ---------- transport ----------
    function jump(i) {
      ghost = Math.round(head); ghostAlpha = 1;
      head = i; target = i;
    }
    function step(dt) {
      var d = target - head;
      if (Math.abs(d) < 0.001) { head = target; return true; }
      var v = fps * speed * dt;
      var ease = clamp(Math.abs(d) / 3, 0.35, 1);   // soften the landing on the last frames
      var mv = Math.min(Math.abs(d), v * ease);
      head += d > 0 ? mv : -mv;
      return Math.abs(target - head) < 0.001;
    }

    // ---------- state machine ----------
    function toIdle() {
      mode = 'idle'; react = null; speed = 1;
      if (head < S.idle[0] || head > S.idle[1]) jump(S.idle[0] + Math.floor((S.idle[1] - S.idle[0]) / 2));
      dir = 1;
      setMessage('', '');
    }
    function startReact(side) {
      react = side; mode = 'react-in'; speed = 1.15;
      var seg = S[side];
      if (Math.abs(head - seg[0]) > 1.5) jump(seg[0]);
      target = seg[1];
      setMessage(side, MSG[side][0], side);
    }
    function startGreet() {
      mode = 'greet'; react = null; speed = 1;
      if (Math.abs(head - S.greet[0]) > 1.5) jump(S.greet[0]);
      target = S.greet[1];
    }
    function greetMessage() {
      var p = (head - S.greet[0]) / Math.max(1, S.greet[1] - S.greet[0]);
      var beats = M.greetBeats || [0, 0.45, 0.78];
      var k = 0;
      for (var i = 0; i < beats.length; i++) if (p >= beats[i]) k = i;
      setMessage('g' + k, MSG.greet[k], 'center');
      root.setAttribute('data-hc-greet', String(k));
    }

    function tick(now) {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      if (!visible) { lastT = now; return; }
      var dt = Math.min(0.05, (now - (lastT || now)) / 1000);
      lastT = now;

      if (ghostAlpha > 0) ghostAlpha = Math.max(0, ghostAlpha - dt * 1000 / XFADE_MS);

      // center interrupts anything that isn't already the greeting
      if (pending === 'center' && mode.indexOf('greet') !== 0) { pending = null; startGreet(); }

      switch (mode) {
        case 'idle':
          if (pending === 'left' || pending === 'right') { var p = pending; pending = null; startReact(p); break; }
          target = dir > 0 ? S.idle[1] : S.idle[0];
          speed = 0.9;
          if (step(dt)) dir = -dir;
          break;
        case 'react-in':
          if ((pending === 'left' || pending === 'right') && pending !== react) { mode = 'react-out'; target = S[react][0]; speed = 2; break; }
          if (step(dt)) { mode = 'react-hold'; holdUntil = now + HOLD_MS; }
          break;
        case 'react-hold':
          if (pending && pending !== react) { mode = 'react-out'; target = S[react][0]; speed = 1.8; break; }
          if (now > holdUntil) { mode = 'react-out'; target = S[react][0]; speed = 1; setMessage('', ''); }
          break;
        case 'react-out':
          if (step(dt)) toIdle();
          break;
        case 'greet':
          greetMessage();
          if (step(dt)) { mode = 'greet-hold'; holdUntil = now + GREET_HOLD_MS; }
          break;
        case 'greet-hold':
          // stay on the "point down" pose while the visitor is in the center
          if (now > holdUntil && zone !== 'center' && !opts._touch) {
            mode = 'greet-out'; target = S.greet[0]; speed = 2.2;
            setMessage('', ''); root.removeAttribute('data-hc-greet');
          }
          break;
        case 'greet-out':
          if (pending === 'left' || pending === 'right') { toIdle(); break; }
          if (step(dt)) toIdle();
          break;
      }
      render();
    }

    // ---------- input ----------
    function zoneFor(x) {
      if (zone === 'left' && x < ZONE_L + HYST) return 'left';
      if (zone === 'right' && x > ZONE_R - HYST) return 'right';
      if (zone === 'center' && x > ZONE_L - HYST && x < ZONE_R + HYST) return 'center';
      return x < ZONE_L ? 'left' : x > ZONE_R ? 'right' : 'center';
    }
    function onMove(e) {
      if (!mqDesktop.matches) return;
      var r = root.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      var z = zoneFor((e.clientX - r.left) / r.width);
      if (z !== zone) { zone = z; pending = z; root.setAttribute('data-hc-zone', z); }
    }
    function onLeave() { zone = null; root.setAttribute('data-hc-zone', 'none'); }
    function onTap() {
      if (mqDesktop.matches || !M) return;
      if (mode === 'greet-hold') { jump(S.greet[0]); startGreet(); }
      else if (mode.indexOf('greet') !== 0) pending = 'center';
    }

    // Mobile / touch: center experience only — greet when the hero comes into view, tap to replay.
    var greetedOnce = false;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        visible = en.isIntersecting;
        document.documentElement.toggleAttribute('data-hero-in', en.intersectionRatio > 0.15);
        if (visible && !mqDesktop.matches && !greetedOnce && M) {
          greetedOnce = true;
          setTimeout(function () { if (alive) pending = 'center'; }, 900);
        }
      });
    }, { threshold: [0, 0.15, 0.5] });
    io.observe(root);

    var ro = new ResizeObserver(function () { resize(); if (M) render(); });
    ro.observe(canvas);

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onTap);

    // ---------- boot ----------
    fetch(manifestUrl, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
      .then(function (m) {
        if (!alive) return;
        M = m; S = m.segments; fps = m.fps || 15;
        var pickSet = function () { return (!mqDesktop.matches && m.mobile) ? m.mobile : m.desktop; };
        set = pickSet();
        opts._touch = !mqDesktop.matches;
        root.style.setProperty('--hc-ar', set.w + ' / ' + set.h);
        resize();

        if (mqReduce.matches) {
          // Static: the final "pointing to the portfolio" pose, no motion.
          return loadImg(S.greet[1]).then(function () {
            head = target = S.greet[1];
            root.classList.add('hc-ready');
            render();
            setMessage('g2', MSG.greet[2], 'center');
          });
        }
        // Priority: idle loop first so she's visible fast, then everything else in chunks.
        return loadRange(S.idle[0], S.idle[1]).then(function () {
          if (!alive) return;
          head = target = S.idle[0];
          mode = 'idle';
          root.classList.add('hc-ready');
          raf = requestAnimationFrame(tick);
          var order = [S.greet, S.left, S.right];
          return order.reduce(function (p, seg) { return p.then(function () { return loadRange(seg[0], seg[1]); }); }, Promise.resolve());
        });
      })
      .catch(function (err) {
        // No frames yet → keep the fallback visual, site still works.
        root.classList.add('hc-nomedia');
        if (window.console) console.info('[hero-character] ' + err.message + ' — showing fallback');
      });

    return function destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onTap);
      document.documentElement.removeAttribute('data-hero-in');
    };
  }

  window.HeroCharacter = { mount: mount };
})();
