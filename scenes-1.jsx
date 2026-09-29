// ============================================================
// SCENES 1 — Hero, Portrait, Thesis
// ============================================================

const { useEffect, useRef, useState, useLayoutEffect } = React;

// ---------- Hero (interactive character) ----------
// Frame engine lives in hero-character.js (vanilla + rAF). React renders this
// markup once; zone changes, frames and messages never trigger a re-render.
function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!window.HeroCharacter || !rootRef.current) return;
    return window.HeroCharacter.mount(rootRef.current, {
      manifest: 'assets/hero-frames/manifest.json'
    });
  }, []);

  const scrollToWork = (e) => {
    const next = rootRef.current && rootRef.current.nextElementSibling;
    if (!next) return;
    e.preventDefault();
    next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={rootRef} className="hero hc" id="home" data-screen-label="01 Hero">
      <div className="hc-bg" aria-hidden="true"><div className="hc-glow" /></div>

      <div className="hc-stage">
        <canvas className="hc-canvas" role="img"
          aria-label="Illustrated Anubhav working on a laptop, who looks up and waves when you move toward the centre" />
        <img className="hc-fallback" src="assets/portrait.png" alt="" aria-hidden="true" />
      </div>

      <div className="hc-intro">
        <p className="hc-eyebrow">Portfolio / 2026</p>
        <h1 className="hc-name">
          <span className="hc-first">Anubhav</span>
          <span className="hc-last">Mohandas</span>
        </h1>
        <p className="hc-role">Security + AI Systems</p>
        <p className="hc-hint">
          <span className="hc-hint-track" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.5l11 5.2-4.6 1.3L6.6 12.6z" /></svg>
          </span>
          <span className="hc-hint-mouse">Move cursor to call me!</span>
          <span className="hc-hint-touch">Tap me to say hi</span>
        </p>
      </div>

      <div className="hc-message" aria-live="polite"><span className="hc-message-text" /></div>

      <a className="hc-cue" href="#portrait" onClick={scrollToWork}>
        Explore the work
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 1v9M2 6.5l4 4 4-4" /></svg>
      </a>
    </section>
  );
}

// ---------- Portrait Reveal ----------
function Portrait() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      // Pinned reveal — portrait scales + unblurs, meta text staggers in
      const img = rootRef.current.querySelector('.portrait-img');
      const bgText = rootRef.current.querySelector('.portrait-bg-text');
      const metas = rootRef.current.querySelectorAll('.portrait-meta-block');

      window.gsap.set(img, { scale: 1.3, filter: 'blur(16px) grayscale(60%)', opacity: 0 });
      window.gsap.set(bgText, { x: '-30vw', opacity: 0 });
      window.gsap.set(metas, { y: 30, opacity: 0 });

      window.gsap.to(img, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 0.8
        },
        scale: 1,
        filter: 'blur(0px) grayscale(20%)',
        opacity: 1,
        ease: "none"
      });

      window.gsap.to(bgText, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        x: '30vw',
        opacity: 0.8,
        ease: "none"
      });

      window.gsap.to(metas, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top center",
          end: "center center",
          scrub: 0.4
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out"
      });

    }, rootRef);
    return () => ctx.revert();
  }, []);

  const D = window.PORTFOLIO_DATA;

  return (
    <section ref={rootRef} className="portrait" id="about" data-screen-label="02 Portrait">
      <div className="portrait-pin">
        <div className="portrait-bg-text">ANUBHAV</div>

        <div className="portrait-img">
          <div className="portrait-frame-tag">REC · 4K · 60FPS</div>
          <img src="assets/portrait.png" alt="Anubhav Mohandas" />
        </div>

        <div className="portrait-meta">
          <div className="portrait-meta-block">
            <div className="t-hairline">SUBJECT</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--ink)' }}>
              {D.identity.name}
            </div>
            <div className="t-mono" style={{ marginTop: 4 }}>
              Cybersecurity researcher · AI systems engineer
            </div>
          </div>
          <div className="portrait-meta-block" style={{ textAlign: 'right' }}>
            <div className="t-hairline">LOCATION</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--ink)' }}>
              {D.identity.location}
            </div>
            <div className="t-mono" style={{ marginTop: 4 }}>
              28.6° N · 77.2° E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Thesis (word-by-word reveal) ----------
function Thesis() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const words = rootRef.current.querySelectorAll('.thesis-statement .word');

      window.gsap.to(words, {
        scrollTrigger: {
          trigger: rootRef.current.querySelector('.thesis-statement'),
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.6
        },
        opacity: 1,
        stagger: { each: 0.05 },
        ease: "none"
      });

      const stats = rootRef.current.querySelectorAll('.thesis-footer-cell');
      window.gsap.from(stats, {
        scrollTrigger: {
          trigger: rootRef.current.querySelector('.thesis-footer'),
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const D = window.PORTFOLIO_DATA;

  return (
    <section ref={rootRef} className="thesis">
      <div className="thesis-eyebrow eyebrow-row">
        <span className="eyebrow-dot" />
        <span className="t-hairline">001 — THESIS</span>
      </div>

      <h2 className="thesis-statement">
        <span className="word">Most</span>
        <span className="word">security</span>
        <span className="word">tools</span>
        <span className="word">notify.</span>{' '}
        <span className="word">Most</span>
        <span className="word">AI</span>
        <span className="word">tools</span>
        <span className="word">answer.</span>{' '}
        <span className="word">I</span>
        <span className="word">build</span>
        <span className="word">the</span>
        <span className="word">ones</span>
        <span className="word">that</span>
        <span className="word"><em>act.</em></span>
      </h2>

      <div className="thesis-footer">
        {D.thesisStats.map((s, i) => (
          <div key={i} className="thesis-footer-cell">
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Hero = Hero;
window.Portrait = Portrait;
window.Thesis = Thesis;
