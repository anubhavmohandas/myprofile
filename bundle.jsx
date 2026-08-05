// === Combined bundle ===


// ---- scenes-1.jsx ----
// ============================================================
// SCENES 1 — Hero, Portrait, Thesis
// ============================================================

const { useEffect, useRef, useState, useLayoutEffect } = React;

// ---------- Hero ----------
function Hero() {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.4 }
      });

      // Initial mask reveal: each .word > span translates from below
      const wordSpans = headlineRef.current.querySelectorAll('.word > span');
      tl.to(wordSpans, {
        y: '0%',
        stagger: 0.12,
        delay: 0.2
      });

      tl.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, "-=0.6");

      // Scroll out: scale + fade as section leaves
      window.gsap.to(rootRef.current.querySelector('.hero-pin'), {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4
        },
        scale: 0.92,
        opacity: 0.4,
        ease: "none"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const D = window.PORTFOLIO_DATA;

  return (
    <section ref={rootRef} className="hero" id="home" data-screen-label="01 Hero">
      <div className="hero-pin">
        <div className="hero-bg" />

        <div className="hero-meta-top">
          <div className="t-mono" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent)' }} />
            PORTFOLIO / 2026
          </div>
          <div className="t-mono" style={{ textAlign: 'right' }}>
            ANUBHAV MOHANDAS<br/>
            <span style={{ color: 'var(--ink-3)' }}>SECURITY + AI · IN</span>
          </div>
        </div>

        <div className="hero-headline-wrap">
          <h1 ref={headlineRef} className="hero-headline">
            <span className="word"><span>I&nbsp;build</span></span>{' '}
            <span className="word"><span>autonomous</span></span>{' '}
            <span className="word"><span className="accent">systems.</span></span>
          </h1>
          <p ref={subRef} className="hero-sub">
            {D.sub}
          </p>
        </div>

        <div className="hero-meta-bot">
          <div className="t-mono">
            <div style={{ color: 'var(--ink-3)' }}>NOW SHIPPING</div>
            <div>SAGE · NYX · HERMES · AEGIS</div>
          </div>
          <div className="t-mono" style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--ink-3)' }}>EST.</div>
            <div>SECURITY 2019 · AI 2024</div>
          </div>
        </div>

        <div className="hero-scroll-cue">scroll</div>
      </div>
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


// ---- scenes-2.jsx ----
// ============================================================
// SCENES 2 — Studio, Constellation, SAGE
// ============================================================


// ---------- Studio (cover image, parallax full-bleed) ----------
function Studio() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const img = rootRef.current.querySelector('.studio-img');
      const cap = rootRef.current.querySelector('.studio-caption');
      const overTitle = rootRef.current.querySelector('.studio-over-title');

      // Parallax: image moves slower than scroll
      window.gsap.to(img, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        },
        y: '-15%',
        scale: 1.08,
        ease: "none"
      });

      window.gsap.from(overTitle, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 60%"
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "expo.out"
      });

      window.gsap.from(cap, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 50%"
        },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="studio" data-screen-label="03 Studio">
      <div className="studio-frame">
        <img className="studio-img" src="assets/cover.jpeg" alt="Studio" />
        <div className="studio-grad" />
        <div className="studio-overlay">
          <div className="studio-eyebrow">
            <span className="dot" /> THE STUDIO · INDIA · 03:14 AM
          </div>
          <h2 className="studio-over-title">
            Three monitors.<br/>One <em>obsession.</em>
          </h2>
          <p className="studio-caption">
            Where security investigations end and AI agents start. Most nights, both at once.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Architecture Constellation ----------
function Constellation() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);

  // Node positions (x%, y%)
  const nodes = [
    { id: "hermes",  x: 50, y: 50, label: "HERMES",  sub: "ENGINE",    size: "large", group: 0 },
    { id: "sage",    x: 22, y: 25, label: "SAGE",    sub: "SECURITY",  group: 1 },
    { id: "argus",   x: 78, y: 25, label: "ARGUS",   sub: "RECON",     group: 1 },
    { id: "nyx",     x: 50, y: 20, label: "NYX",     sub: "INTERFACE", group: 2 },
    { id: "ct",      x: 20, y: 78, label: "CYBERTRACE", sub: "OSINT",  group: 3 },
    { id: "ghost",   x: 50, y: 85, label: "GHOST",   sub: "TOOLING",   group: 3 },
    { id: "aegis",   x: 80, y: 78, label: "AEGIS",   sub: "ENDPOINT", group: 3 },
  ];

  // Edges revealed by step
  const edges = [
    { from: "hermes", to: "sage",   step: 1 },
    { from: "hermes", to: "argus",  step: 1 },
    { from: "hermes", to: "nyx",    step: 2 },
    { from: "sage",   to: "nyx",    step: 2, dashed: true },
    { from: "argus",  to: "nyx",    step: 2, dashed: true },
  ];

  const steps = [
    { num: "01", title: "An engine", body: "HERMES is the foundation — 7 consolidated modules (Apollo, Mnemos, Clio, Curator, Fetcher, Connect, meta/security). Routing, memory, learning, cost tracking. The capability stack." },
    { num: "02", title: "A security layer", body: "SAGE watches code for CVEs and patches them autonomously. ARGUS scouts the web for recon signals. Both built on HERMES." },
    { num: "03", title: "An interface", body: "NYX is the voice on top — local-first, multi-model, multilingual. Calls SAGE and ARGUS as tools." },
    { num: "04", title: "And the standalone work", body: "CyberTrace for investigators. GHOST for the browser. Aegis watching the endpoint. Each its own product, each shipping value today." }
  ];

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const s = Math.min(3, Math.floor(self.progress * 4));
          setStep(s);
        }
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const visibleNode = (n) => n.group <= step;
  const visibleEdge = (e) => e.step <= step;
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <section ref={rootRef} className="constellation" id="systems" data-screen-label="04 Constellation">
      <div className="constellation-pin">
        <div className="constellation-side">
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">002 — ARCHITECTURE</span>
          </div>

          <div className="con-step-counter">
            {String(step + 1).padStart(2, '0')} / 04
          </div>

          <h2 className="t-h2">{steps[step].title}</h2>
          <p className="t-body" style={{ color: 'var(--ink-2)' }}>{steps[step].body}</p>

          <div className="t-mono" style={{ marginTop: 'auto', color: 'var(--ink-3)' }}>
            Each ring is a system. Each line is a call site.
          </div>
        </div>

        <div className="constellation-canvas">
          <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Edges as lines between node positions */}
            {edges.map((e, i) => {
              const a = nodeMap[e.from];
              const b = nodeMap[e.to];
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={visibleEdge(e) ? "var(--accent)" : "transparent"}
                  strokeWidth="0.12"
                  strokeDasharray={e.dashed ? "1 1" : "none"}
                  opacity={visibleEdge(e) ? 0.6 : 0}
                  style={{ transition: 'opacity 0.5s, stroke 0.5s' }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {nodes.map(n => (
            <div
              key={n.id}
              className="node"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                opacity: visibleNode(n) ? 1 : 0,
                transition: 'opacity 0.5s'
              }}
            >
              <div className={`node-dot ${n.size === "large" ? "large" : ""}`} />
              <div className="node-label">{n.label}</div>
              <div className="node-sub">{n.sub}</div>
            </div>
          ))}

          {/* Subtle radial pulse around HERMES */}
          <div
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 400, height: 400,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,94,26,0.12), transparent 60%)',
              pointerEvents: 'none',
              opacity: step >= 0 ? 1 : 0,
              transition: 'opacity 0.5s'
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ---------- SAGE pinned scene ----------
function SAGEScene() {
  const rootRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "sage");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          // Map progress to 4 steps
          const s = Math.min(3, Math.floor(self.progress * 4.001));
          setActiveStep(s);
        }
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="scene sage-scene" id="sage" data-screen-label="05 SAGE">
      <div className="scene-pin">
        <div className="scene-sidebar">
          <div>
            <div className="scene-eyebrow">
              <span className="scene-codename">{D.codename}</span>
            </div>
            <h2 className="scene-title">{D.name}</h2>
            <p className="t-mono" style={{ marginTop: 12, color: 'var(--accent-warm)' }}>
              {D.expand}
            </p>
            <p className="scene-blurb" style={{ marginTop: 24 }}>
              {D.tagline}
            </p>
            <div className="scene-tags">
              {D.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
            </div>
          </div>

          <a className="scene-link" href={D.link} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>

        <div className="scene-stage sage-stage">
          <div className="scene-step-counter">
            <span className="cur">{String(activeStep + 1).padStart(2, '0')}</span> / 04
          </div>

          <div className="sage-pipe">
            {D.steps.map((s, i) => (
              <div key={i} className={`sage-card ${i === activeStep ? 'active' : ''} ${i < activeStep ? 'done' : ''}`}>
                <div className="sage-card-num">STEP {s.num}</div>
                <div className="sage-card-title">{s.title}</div>
                <div className="sage-card-body">{s.body}</div>
                <div className="sage-card-viz">
                  {i === 0 && <SageWatchViz active={i === activeStep} />}
                  {i === 1 && <SageMapViz active={i === activeStep} />}
                  {i === 2 && <SagePatchViz active={i === activeStep} />}
                  {i === 3 && <SagePRViz active={i === activeStep} />}
                </div>
              </div>
            ))}
          </div>

          <div className="scene-progress">
            <div className="scene-progress-bar" style={{ width: `${((activeStep + 1) / 4) * 100}%`, transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Small vizs for each SAGE card
function SageWatchViz({ active }) {
  return (
    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--accent)', textAlign: 'center', padding: 4 }}>
      <div style={{ opacity: 0.7 }}>CVE-2024-44193</div>
      <div style={{ opacity: 0.5, marginTop: 2 }}>CVE-2024-44195</div>
      <div style={{ opacity: 0.3, marginTop: 2 }}>CVE-2024-44201</div>
      <div style={{ fontSize: 8, marginTop: 6, color: 'var(--ink-3)' }}>↓ NVD daily poll</div>
    </div>
  );
}
function SageMapViz({ active }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 60" style={{ padding: 6 }}>
      {/* nodes connected as a tiny call-graph */}
      {[[20,20],[50,15],[80,25],[35,45],[65,50],[15,50]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={i === 2 || i === 4 ? "var(--accent)" : "var(--ink-2)"} />
      ))}
      <line x1="20" y1="20" x2="50" y2="15" stroke="var(--ink-3)" strokeWidth="0.4" />
      <line x1="50" y1="15" x2="80" y2="25" stroke="var(--accent)" strokeWidth="0.6" />
      <line x1="50" y1="15" x2="35" y2="45" stroke="var(--ink-3)" strokeWidth="0.4" />
      <line x1="35" y1="45" x2="65" y2="50" stroke="var(--accent)" strokeWidth="0.6" />
      <line x1="80" y1="25" x2="65" y2="50" stroke="var(--ink-3)" strokeWidth="0.4" />
      <line x1="35" y1="45" x2="15" y2="50" stroke="var(--ink-3)" strokeWidth="0.4" />
    </svg>
  );
}
function SagePatchViz({ active }) {
  return (
    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, padding: 6, color: 'var(--ink-2)', lineHeight: 1.4, textAlign: 'left', width: '100%' }}>
      <div style={{ color: '#ff5e5e' }}>- exec(user_input)</div>
      <div style={{ color: 'var(--accent-warm)' }}>+ subprocess.run(</div>
      <div style={{ color: 'var(--accent-warm)' }}>+   shlex.split(input))</div>
      <div style={{ marginTop: 4, color: 'var(--ink-3)', fontSize: 8 }}>+ 2 −1</div>
    </div>
  );
}
function SagePRViz({ active }) {
  return (
    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, padding: 6, lineHeight: 1.5, textAlign: 'left', width: '100%' }}>
      <div style={{ color: 'var(--accent)' }}>● Open #429</div>
      <div style={{ color: 'var(--ink)' }}>fix(sec): patch CVE-2024-44193</div>
      <div style={{ color: 'var(--ink-3)', fontSize: 8, marginTop: 4 }}>checks: 3/3 ✓</div>
    </div>
  );
}

window.Studio = Studio;
window.Constellation = Constellation;
window.SAGEScene = SAGEScene;


// ---- scenes-3.jsx ----
// ============================================================
// SCENES 3 — NYX, CyberTrace, HERMES
// ============================================================


// ---------- NYX ----------
function NYXScene() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "nyx");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4.001)))
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const transcripts = [
    "",
    "scan github.com/...",
    "scan github.com/anubhavmohandas/Aegis for cves",
    "Found 2 transitive CVEs in lodash@4.17.20. SAGE is patching now — PR will open in ~90 seconds."
  ];

  const routes = [
    { name: "Claude API",  status: ["IDLE", "PROBING", "ROUTING", "ROUTING"] },
    { name: "Mistral",     status: ["IDLE", "STANDBY", "STANDBY", "STANDBY"] },
    { name: "Qwen 3.5 72B", status: ["IDLE", "LOCAL", "LOCAL", "FALLBACK"] }
  ];

  // Animated bars
  const bars = Array.from({ length: 28 }, (_, i) => i);

  return (
    <section ref={rootRef} className="scene" id="nyx" data-screen-label="06 NYX">
      <div className="scene-pin">
        <div className="scene-sidebar">
          <div>
            <div className="scene-eyebrow">
              <span className="scene-codename">{D.codename}</span>
            </div>
            <h2 className="scene-title">{D.name}</h2>
            <p className="t-mono" style={{ marginTop: 12, color: 'var(--accent-warm)' }}>
              {D.expand}
            </p>
            <p className="scene-blurb" style={{ marginTop: 24 }}>{D.tagline}</p>
            <div className="scene-tags">
              {D.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
            </div>
          </div>
          <a className="scene-link" href={D.link} target="_blank" rel="noreferrer">View on GitHub →</a>
        </div>

        <div className="scene-stage nyx-stage">
          <div className="scene-step-counter">
            <span className="cur">{String(step + 1).padStart(2, '0')}</span> / 04
          </div>

          <div className="nyx-window">
            <div className="nyx-titlebar">
              <span className={`nyx-dot ${step >= 0 ? 'live' : ''}`} />
              NYX · LOCAL · {step === 0 ? "LISTENING" : step === 1 ? "TRANSCRIBING" : step === 2 ? "ROUTING" : "RESPONDED"}
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--ink-3)' }}>
                M5 Pro · Offline ready
              </span>
            </div>

            <div className="nyx-body">
              <div className="nyx-waveform">
                {bars.map(i => {
                  const baseHeight = Math.abs(Math.sin(i * 0.4 + step * 1.3)) * 60 + 6;
                  const dim = step === 0 ? 1 : 0.5;
                  return (
                    <div
                      key={i}
                      className="nyx-bar"
                      style={{
                        height: baseHeight,
                        opacity: dim,
                        background: step === 3 && i % 4 === 0 ? 'var(--accent-warm)' : 'var(--accent)',
                        animation: step === 0 ? `nyxWave ${1.2 + i * 0.04}s ease-in-out infinite` : 'none'
                      }}
                    />
                  );
                })}
              </div>

              <div className="nyx-transcript">
                {step === 0 && <span style={{ color: 'var(--ink-3)' }}>Listening for "Hey NYX"...</span>}
                {step >= 1 && (
                  <span>
                    <span style={{ color: 'var(--ink-3)' }}>USER: </span>
                    {transcripts[step]}
                    {step < 3 && <span className="cursor" />}
                  </span>
                )}
                {step >= 3 && (
                  <div style={{ marginTop: 16, color: 'var(--accent-warm)' }}>
                    NYX: {transcripts[3]}
                  </div>
                )}
              </div>

              <div className="nyx-routes">
                {routes.map((r, i) => {
                  const status = r.status[step];
                  const isActive = step === 2 && i === 0;
                  const isSelected = step === 3 && (
                    (status === "ROUTING") || (status === "FALLBACK" && i === 2)
                  );
                  return (
                    <div key={r.name} className={`nyx-route ${isActive ? 'active' : ''} ${isSelected && i === 0 ? 'selected' : ''}`}>
                      <div className="nyx-route-name">{r.name}</div>
                      <div className="nyx-route-status">{status}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="scene-progress">
            <div className="scene-progress-bar" style={{ width: `${((step + 1) / 4) * 100}%`, transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CyberTrace ----------
function CyberTraceScene() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "cybertrace");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4.001)))
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // step 0: input types  step 1: querying  step 2: results streaming  step 3: done
  const inputText = "anubhav.manav147@gmail.com";
  const typedLen = step === 0 ? Math.floor((Date.now() % 4000 / 4000) * inputText.length) : inputText.length;

  return (
    <section ref={rootRef} className="scene" id="cybertrace" data-screen-label="07 CyberTrace">
      <div className="scene-pin">
        <div className="scene-sidebar">
          <div>
            <div className="scene-eyebrow">
              <span className="scene-codename">{D.codename}</span>
            </div>
            <h2 className="scene-title">{D.name}</h2>
            <p className="t-mono" style={{ marginTop: 12, color: 'var(--accent-warm)' }}>
              {D.expand}
            </p>
            <p className="scene-blurb" style={{ marginTop: 24 }}>{D.tagline}</p>
            <div className="scene-tags">
              {D.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
            </div>
          </div>
          <a className="scene-link" href={D.link} target="_blank" rel="noreferrer">View on GitHub →</a>
        </div>

        <div className="scene-stage ct-stage">
          <div className="scene-step-counter">
            <span className="cur">{["TYPE", "QUERY", "STREAM", "DONE"][step]}</span> · {step + 1}/04
          </div>

          <div className="ct-input">
            <span className="ct-input-prompt">$ cybertrace</span>
            <span className="ct-input-value">
              {inputText.slice(0, step === 0 ? Math.min(inputText.length, typedLen) : inputText.length)}
              {step === 0 && <span className="cursor" />}
            </span>
          </div>

          <div className="ct-modules">
            {D.modules.map((m, i) => {
              let cls = '';
              if (step === 1) cls = 'querying';
              else if (step >= 2) cls = (i < (step === 2 ? 8 : D.modules.length)) ? 'done' : 'querying';
              return (
                <div key={m.name} className={`ct-module ${cls}`}>
                  <div className="ct-module-status" />
                  <div className="ct-module-name">{m.name}</div>
                  <div className="ct-module-srcs">{m.srcs}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- HERMES ----------
function HERMESScene() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "hermes");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => setStep(Math.min(2, Math.floor(self.progress * 3.001)))
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const stepLabel = ["56 OPEN-SOURCE REPOS", "7 MODULES", "BUILD STATUS"];
  const stepTitle = [
    "Start with everything.",
    "Consolidate the pattern set.",
    "Prove what's actually built."
  ];

  return (
    <section ref={rootRef} className="scene" id="hermes" data-screen-label="08 HERMES">
      <div className="scene-pin">
        <div className="scene-sidebar">
          <div>
            <div className="scene-eyebrow">
              <span className="scene-codename">{D.codename}</span>
            </div>
            <h2 className="scene-title">{D.name}</h2>
            <p className="t-mono" style={{ marginTop: 12, color: 'var(--accent-warm)' }}>
              {D.expand}
            </p>
            <p className="scene-blurb" style={{ marginTop: 24 }}>{D.tagline}</p>
            <div className="scene-tags">
              {D.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
            </div>
          </div>
          <a className="scene-link" href={D.link} target="_blank" rel="noreferrer">View on GitHub →</a>
        </div>

        <div className="scene-stage hermes-stage">
          <div className="hermes-step-label">{stepLabel[step]} · {step + 1}/03</div>
          <div className="hermes-stage-title">{stepTitle[step]}</div>

          <div className="hermes-viz">
            <div className={`hermes-layer ${step === 0 ? 'active' : ''}`}>
              <div className="hermes-repos">
                {Array.from({ length: 56 }).map((_, i) => (
                  <div key={i} className="hermes-repo" />
                ))}
              </div>
            </div>

            <div className={`hermes-layer ${step === 1 ? 'active' : ''}`}>
              <div className="hermes-modules">
                {D.modules.map((m, i) => (
                  <div key={i} className="hermes-module">{m}</div>
                ))}
              </div>
            </div>

            <div className={`hermes-layer ${step === 2 ? 'active' : ''}`}>
              <div className="hermes-layers">
                {D.layers.map((l, i) => (
                  <div key={i} className={`hermes-layer-row ${l.done ? 'done' : 'pending'}`}>
                    <span>{l.name} <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>— {l.status}</span></span>
                    <span className="lbl-num">{l.done ? '✓' : '…'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- AEGIS ----------
function AegisScene() {
  const rootRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "aegis");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => setActiveStep(Math.min(3, Math.floor(self.progress * 4.001)))
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cardVizText = [
    "● process.launch\n● usb.connect\n● folder.write",
    "LOW · MEDIUM · HIGH\nCRITICAL",
    "Verdict: Review Suggested\nConfidence: High",
    "🔒 Incident #04 captured"
  ];

  return (
    <section ref={rootRef} className="scene" id="aegis" data-screen-label="09 AEGIS">
      <div className="scene-pin">
        <div className="scene-sidebar">
          <div>
            <div className="scene-eyebrow">
              <span className="scene-codename">{D.codename}</span>
            </div>
            <h2 className="scene-title">{D.name}</h2>
            <p className="t-mono" style={{ marginTop: 12, color: 'var(--accent-warm)' }}>
              {D.expand}
            </p>
            <p className="scene-blurb" style={{ marginTop: 24 }}>{D.tagline}</p>
            <div className="scene-tags">
              {D.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
            </div>
          </div>
          <a className="scene-link" href={D.link} target="_blank" rel="noreferrer">View on GitHub →</a>
        </div>

        <div className="scene-stage aegis-stage">
          <div className="scene-step-counter">
            <span className="cur">{String(activeStep + 1).padStart(2, '0')}</span> / 04
          </div>

          <div className={`aegis-video ${activeStep >= 0 ? 'lit' : ''}`}>
            <video src="assets/aegis-hero.mp4" poster="assets/aegis-hero.jpg" muted autoPlay loop playsInline />
            <div className="aegis-video-badge">
              <span className="aegis-video-dot" />
              MONITORING ACTIVE
            </div>
          </div>

          <div className="aegis-pipe">
            {D.steps.map((s, i) => (
              <div key={i} className={`aegis-card ${i === activeStep ? 'active' : ''} ${i < activeStep ? 'done' : ''}`}>
                <div className="aegis-card-num">STEP {s.num}</div>
                <div className="aegis-card-title">{s.title}</div>
                <div className="aegis-card-body">{s.body}</div>
                <div className="aegis-card-viz">
                  {cardVizText[i].split('\n').map((line, li) => <div key={li}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div className="scene-progress">
            <div className="scene-progress-bar" style={{ width: `${((activeStep + 1) / 4) * 100}%`, transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

window.NYXScene = NYXScene;
window.CyberTraceScene = CyberTraceScene;
window.HERMESScene = HERMESScene;
window.AegisScene = AegisScene;


// ---- scenes-4.jsx ----
// ============================================================
// SCENES 4 — Completed, Archive, Stack, Writing, Contact
// ============================================================


// ---------- Completed flagship work ----------
function Completed() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const cards = rootRef.current.querySelectorAll('.completed-card');
      window.gsap.from(cards, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%"
        },
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const D = window.PORTFOLIO_DATA.completed;

  return (
    <section ref={rootRef} className="completed" id="completed" data-screen-label="10 Completed">
      <div className="section-eyebrow-row">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">003 — SHIPPED</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 16, maxWidth: '14ch' }}>
            Things that <span className="t-serif-italic" style={{ color: 'var(--accent-warm)' }}>already</span> work.
          </h2>
        </div>
        <div style={{ maxWidth: 280 }}>
          <p className="t-mono" style={{ color: 'var(--ink-3)' }}>
            Completed projects. Each one shipped — not a demo.
          </p>
        </div>
      </div>

      <div className="completed-grid">
        {D.map(p => (
          <CompletedCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function CompletedCard({ project: p }) {
  return (
    <a className="completed-card" href={p.link} target="_blank" rel="noreferrer">
      <div className="completed-card-mock">
        {p.mock === "ghost" && (
          <div className="ghost-mock">
            {[
              ["Name", "Anubhav M."],
              ["Email", "anubhav.manav147@gmail.com"],
              ["PAN", "•••••••••"],
              ["Train", "12903 · Mumbai → NDLS"]
            ].map(([lbl, val]) => (
              <div key={lbl} className="ghost-mock-field">
                <span className="lbl">{lbl}</span>
                <span className="val">{val}</span>
              </div>
            ))}
          </div>
        )}
        {p.mock === "nyxine" && (
          <div className="nyx-mock">
            <div className="nyx-mock-side">
              <div className="nyx-mock-side-item" />
              <div className="nyx-mock-side-item active" />
              <div className="nyx-mock-side-item" />
              <div className="nyx-mock-side-item" />
              <div className="nyx-mock-side-item" />
            </div>
            <div className="nyx-mock-doc">
              <div className="nyx-mock-doc-title">Anubhav Mohandas</div>
              <div className="nyx-mock-doc-line long" />
              <div className="nyx-mock-doc-line med" />
              <div className="nyx-mock-doc-line short" />
              <div style={{ height: 4 }} />
              <div className="nyx-mock-doc-line long" />
              <div className="nyx-mock-doc-line long" />
              <div className="nyx-mock-doc-line med" />
            </div>
          </div>
        )}
        {p.mock === "jerry" && (
          <div style={{
            display: 'grid', placeItems: 'center', height: '100%',
            fontFamily: 'var(--f-display)', fontSize: 64, color: 'var(--accent)',
            letterSpacing: '-0.04em'
          }}>
            jerry<span style={{ color: 'var(--accent-warm)' }}>.</span>
            <div style={{ position: 'absolute', bottom: 12, left: 16,
              fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
              v0.4 · PROTOTYPE
            </div>
          </div>
        )}
        {p.mock === "cvss" && (
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, height: '100%' }}>
            {[
              ["AV", "N"], ["AC", "L"], ["PR", "N"], ["UI", "R"]
            ].map(([k, v]) => (
              <div key={k} style={{
                padding: 12, border: '1px solid var(--rule)', borderRadius: 4,
                fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-2)',
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span>{k}</span><span style={{ color: 'var(--accent)' }}>{v}</span>
              </div>
            ))}
            <div style={{
              gridColumn: '1 / -1', padding: 14, border: '1px solid var(--accent)',
              borderRadius: 4, fontFamily: 'var(--f-display)', fontSize: 28, textAlign: 'center',
              color: 'var(--accent)', background: 'var(--accent-soft)'
            }}>
              9.8 · CRITICAL
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="t-mono" style={{ color: 'var(--accent)', fontSize: 11, letterSpacing: '0.15em' }}>
          {p.expand?.toUpperCase()}
        </div>
        <div className="completed-card-title" style={{ marginTop: 6 }}>{p.name}</div>
      </div>
      <p className="completed-card-blurb">{p.blurb}</p>
      <div className="completed-card-tags">
        {p.tags.map(t => <span key={t} className="scene-tag">{t}</span>)}
      </div>
      <div className="completed-card-link">View work →</div>
    </a>
  );
}

// ---------- Archive (older security work, deep but compact) ----------
function Archive() {
  const rootRef = useRef(null);
  const D = window.PORTFOLIO_DATA.archive;

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const rows = rootRef.current.querySelectorAll('.archive-row');
      window.gsap.from(rows, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%"
        },
        opacity: 0,
        x: -20,
        stagger: 0.06,
        duration: 0.8,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="archive" id="archive" data-screen-label="11 Archive">
      <div className="section-eyebrow-row">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">004 — ARCHIVE</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 16, maxWidth: '16ch' }}>
            The <span className="t-serif-italic" style={{ color: 'var(--accent-warm)' }}>foundation.</span>
          </h2>
        </div>
        <div style={{ maxWidth: 320 }}>
          <p className="t-body">
            Eight security tools written before the AI work. The vocabulary I think in now.
          </p>
        </div>
      </div>

      <div className="archive-list">
        {D.map((p, i) => (
          <a className="archive-row" key={i} href={p.link} target="_blank" rel="noreferrer">
            <div className="archive-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="archive-main">
              <div className="archive-name">{p.name}</div>
              <div className="archive-blurb">{p.blurb}</div>
            </div>
            <div className="archive-tags">
              {p.tags.map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="archive-arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Writing ----------
function Writing() {
  const rootRef = useRef(null);
  const D = window.PORTFOLIO_DATA.writing;

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const items = rootRef.current.querySelectorAll('.writing-item');
      window.gsap.from(items, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%"
        },
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="writing" id="writing" data-screen-label="12 Writing">
      <div className="section-eyebrow-row">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">005 — WRITING</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 16, maxWidth: '14ch' }}>
            Thinking <span className="t-serif-italic" style={{ color: 'var(--accent-warm)' }}>out loud.</span>
          </h2>
        </div>
      </div>

      <div className="writing-note">
        <span className="dot" />
        {D.notice}
      </div>

      <div className="writing-list">
        {D.posts.map((p, i) => (
          <a key={i} className="writing-item" href={p.link}>
            <div className="writing-item-date">{p.date}</div>
            <div className="writing-item-title">{p.title}</div>
            <div className="writing-item-arrow">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  const rootRef = useRef(null);
  const D = window.PORTFOLIO_DATA.identity;

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const words = rootRef.current.querySelectorAll('.contact-headline .word');
      window.gsap.from(words, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%"
        },
        y: 60, opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: "expo.out"
      });

      window.gsap.from(rootRef.current.querySelectorAll('.contact-channel'), {
        scrollTrigger: {
          trigger: rootRef.current.querySelector('.contact-grid'),
          start: "top 75%"
        },
        x: -30, opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out"
      });

      // Footer glyph: word-by-word reveal of name as huge type
      window.gsap.from(rootRef.current.querySelector('.footer-glyph'), {
        scrollTrigger: {
          trigger: rootRef.current.querySelector('footer'),
          start: "top 80%"
        },
        y: 100, opacity: 0,
        duration: 1.6,
        ease: "expo.out"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const channels = [
    { lbl: "Email", val: D.email, href: `mailto:${D.email}` },
    { lbl: "GitHub", val: "@anubhavmohandas", href: D.github },
    { lbl: "LinkedIn", val: "anubhavmohandas", href: D.linkedin },
    { lbl: "X", val: "@anubhavmohandas", href: D.twitter },
  ];

  return (
    <section ref={rootRef} className="contact" id="contact" data-screen-label="13 Contact">
      <h2 className="contact-headline">
        <span className="word">Let's</span>{' '}
        <span className="word">build</span>{' '}
        <span className="word"><em>something</em></span>{' '}
        <span className="word">that</span>{' '}
        <span className="word">acts.</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-channels">
          {channels.map(c => (
            <a key={c.lbl} className="contact-channel" href={c.href} target="_blank" rel="noreferrer">
              <span className="contact-channel-lbl">{c.lbl}</span>
              <span className="contact-channel-val">{c.val}</span>
              <span className="contact-channel-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="contact-side">
          <div className="t-hairline">CV</div>
          <p className="t-body" style={{ color: 'var(--ink-2)' }}>
            One-page PDF. Last updated this week.
          </p>
          <a className="btn-resume" href="#" onClick={(e) => { e.preventDefault(); alert('Resume download — wire to your PDF here.'); }}>
            <span>Download résumé</span>
            <span>↓</span>
          </a>
          <div className="t-mono" style={{ color: 'var(--ink-3)', fontSize: 11, marginTop: 8 }}>
            Open to research collabs, security retainers, and AI engineering roles.
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-glyph">ANUBHAV.</div>
        <div>© 2026 ANUBHAV MOHANDAS · {D.location}</div>
        <div style={{ textAlign: 'right' }}>
          BUILT WITH OBSESSION<br/>
          <span style={{ color: 'var(--ink-4)' }}>(↑↑↓↓←→←→ — try it)</span>
        </div>
      </footer>
    </section>
  );
}

window.Completed = Completed;
window.Archive = Archive;
window.Writing = Writing;
window.Contact = Contact;


// ---- nav.jsx ----
// ============================================================
// NAV — top bar + side journey trail
// ============================================================


function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const logoClickCount = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Section detection for nav highlight
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id) setActiveSection(e.target.id);
      });
    }, { threshold: 0.25, rootMargin: '-30% 0px -30% 0px' });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const items = [
    { href: 'systems', label: 'Systems' },
    { href: 'sage', label: 'SAGE' },
    { href: 'nyx', label: 'NYX' },
    { href: 'cybertrace', label: 'CT' },
    { href: 'hermes', label: 'HERMES' },
    { href: 'aegis', label: 'AEGIS' },
    { href: 'completed', label: 'Work' },
    { href: 'contact', label: 'Contact' }
  ];

  const handleLogoClick = () => {
    logoClickCount.current++;
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      window.dispatchEvent(new CustomEvent('boot-replay'));
    }
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={handleLogoClick}>
          <span className="nav-logo-dot" />
          <span>ANUBHAV<span style={{ color: 'var(--accent)' }}>.</span></span>
        </div>

        <ul className="nav-menu">
          {items.map(i => (
            <li key={i.href}>
              <a href={`#${i.href}`} className={activeSection === i.href ? 'active' : ''}>
                {i.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={onToggleTheme} className="nav-theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? '☀' : '◐'}
            </button>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a className="nav-cta" href="#contact">
            <span>Hire me</span>
            <span>→</span>
          </a>
          <button className="nav-mobile-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        {items.map(i => (
          <a key={i.href} href={`#${i.href}`} onClick={() => setMobileOpen(false)}>
            {i.label}
          </a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); onToggleTheme(); setMobileOpen(false); }}>
          Toggle {theme === 'dark' ? 'light' : 'dark'}
        </a>
      </div>
    </>
  );
}

// ============================================================
// JOURNEY TRAIL — pinned left-edge progress with checkpoints
// ============================================================

function JourneyTrail() {
  const trailRef = useRef(null);
  const fillRef = useRef(null);
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);

  const checkpoints = [
    { id: "home", label: "START" },
    { id: "about", label: "WHO" },
    { id: "systems", label: "MAP" },
    { id: "sage", label: "SAGE" },
    { id: "nyx", label: "NYX" },
    { id: "cybertrace", label: "CYBERTRACE" },
    { id: "hermes", label: "HERMES" },
    { id: "aegis", label: "AEGIS" },
    { id: "completed", label: "SHIPPED" },
    { id: "contact", label: "END" }
  ];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, window.scrollY / h));
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${pct})`;
      }

      // Find closest active checkpoint
      let activeIdx = 0;
      checkpoints.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5) activeIdx = i;
        }
      });
      setActiveCheckpoint(activeIdx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="trail" ref={trailRef}>
      <div className="trail-line">
        <div className="trail-fill" ref={fillRef} />
      </div>
      <div className="trail-checkpoints">
        {checkpoints.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`trail-checkpoint ${i === activeCheckpoint ? 'active' : ''} ${i < activeCheckpoint ? 'passed' : ''}`}
          >
            <span className="trail-pin" />
            <span className="trail-label">{c.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

window.Nav = Nav;
window.JourneyTrail = JourneyTrail;


// ---- app.jsx ----
// ============================================================
// APP — Root, theme, easter eggs, terminal, Lenis
// ============================================================


function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch (e) { return 'dark'; }
  });
  const [terminal, setTerminal] = useState({ open: false, log: [] });
  const [konami, setKonami] = useState(false);
  const [bootReplay, setBootReplay] = useState(false);
  const typedBuffer = useRef("");
  const konamiBuffer = useRef([]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Lenis smooth scroll
  useEffect(() => {
    if (typeof window.Lenis !== 'function') return;
    const lenis = new window.Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });
    function raf(time) {
      lenis.raf(time);
      window.ScrollTrigger?.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links via Lenis
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -40, duration: 1.2 });
    });

    return () => lenis.destroy();
  }, []);

  // GSAP defaults
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.config({ nullTargetWarn: false });
    }
  }, []);

  // ============================================================
  // EASTER EGGS
  // ============================================================
  useEffect(() => {
    // Konami code
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

    const onKey = (e) => {
      // Don't intercept text input
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      // Konami sequence
      konamiBuffer.current.push(e.key);
      if (konamiBuffer.current.length > KONAMI.length) konamiBuffer.current.shift();
      if (konamiBuffer.current.join(',') === KONAMI.join(',')) {
        setKonami(true);
        setTimeout(() => setKonami(false), 6000);
        konamiBuffer.current = [];
        runTerminal(["KONAMI · 0xFEEDFACE", "rainbow alarm engaged."]);
      }

      // sudo / whoami / clear / etc.
      if (e.key === 'Escape') {
        setTerminal({ open: false, log: [] });
        return;
      }

      if (terminal.open) return; // capture only when closed

      if (e.key.length === 1 && /[a-z0-9 ]/i.test(e.key)) {
        typedBuffer.current = (typedBuffer.current + e.key).slice(-32);
      }
      if (e.key === 'Backspace') {
        typedBuffer.current = typedBuffer.current.slice(0, -1);
      }

      const buf = typedBuffer.current.toLowerCase();

      const triggers = [
        { word: "sudo", action: () => openTerminal() },
        { word: "whoami", action: () => runTerminal([
          "anubhav@portfolio:~$ whoami",
          "Anubhav Mohandas",
          "uid=1000(anubhav) groups=security,ai,osint,researcher",
          "shell: /bin/zsh",
          "location: 28.6° N · 77.2° E"
        ]) },
        { word: "help", action: () => runTerminal([
          "anubhav@portfolio:~$ help",
          "available commands:",
          "  whoami    — about me",
          "  sudo      — open terminal",
          "  ls        — list projects",
          "  contact   — get in touch",
          "  matrix    — ¯\\_(ツ)_/¯",
          "  ↑↑↓↓←→←→ba  — secret"
        ]) },
        { word: "ls", action: () => runTerminal([
          "anubhav@portfolio:~$ ls projects/",
          "sage/   nyx/    cybertrace/   hermes/  aegis/",
          "ghost/  nyxine/ jerry/   archive/"
        ]) },
        { word: "matrix", action: () => {
          setKonami(true);
          setTimeout(() => setKonami(false), 4000);
        } },
        { word: "contact", action: () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } }
      ];

      for (const t of triggers) {
        if (buf.endsWith(t.word)) {
          t.action();
          typedBuffer.current = "";
          break;
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [terminal.open]);

  const openTerminal = () => {
    setTerminal({ open: true, log: [
      "anubhav@portfolio:~$ sudo",
      "[sudo] password for anubhav: ********",
      "welcome to portfolio.shell — type 'help' for commands.",
      ""
    ]});
  };

  const runTerminal = (lines) => {
    setTerminal(t => ({
      open: true,
      log: t.log.length ? [...t.log, "", ...lines] : ["welcome.", "", ...lines]
    }));
  };

  // Logo 5x click → boot replay
  useEffect(() => {
    const onBoot = () => {
      setBootReplay(true);
      setTimeout(() => setBootReplay(false), 4500);
    };
    window.addEventListener('boot-replay', onBoot);
    return () => window.removeEventListener('boot-replay', onBoot);
  }, []);

  return (
    <>
      <Nav_ theme={theme} onToggleTheme={toggleTheme} />
      <JourneyTrail_ />

      <main>
        <Hero_ />
        <Portrait_ />
        <Studio_ />
        <Thesis_ />
        <Constellation_ />
        <SAGEScene_ />
        <NYXScene_ />
        <CyberTraceScene_ />
        <HERMESScene_ />
        <AegisScene_ />
        <Completed_ />
        <Archive_ />
        <Writing_ />
        <Contact_ />
      </main>

      {konami && <div className="konami-alarm" />}
      {bootReplay && <BootSplash onDone={() => setBootReplay(false)} />}
      {terminal.open && (
        <TerminalModal
          log={terminal.log}
          onClose={() => setTerminal({ open: false, log: [] })}
          onCmd={(cmd) => handleCommand(cmd, runTerminal)}
        />
      )}
    </>
  );
}

// ---------- Terminal modal ----------
function TerminalModal({ log, onClose, onCmd }) {
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [log]);

  return (
    <div className="term-modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="term-window">
        <div className="term-titlebar">
          <span style={{ width: 10, height: 10, background: '#ff5f56', borderRadius: '50%' }} />
          <span style={{ width: 10, height: 10, background: '#ffbd2e', borderRadius: '50%' }} />
          <span style={{ width: 10, height: 10, background: '#27c93f', borderRadius: '50%' }} />
          <span style={{ marginLeft: 12 }}>anubhav@portfolio — zsh — 80×24</span>
          <span style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={onClose}>esc</span>
        </div>
        <div className="term-body" ref={bodyRef}>
          {log.map((line, i) => (
            <div key={i} className={line.startsWith('anubhav@') ? '' : 'term-output'}>
              {line}
            </div>
          ))}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            onCmd(input.trim());
            setInput("");
          }} style={{ display: 'flex', alignItems: 'center' }}>
            <span className="term-prompt">anubhav@portfolio:~$</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}

function handleCommand(cmd, runTerminal) {
  const c = cmd.toLowerCase();
  const responses = {
    "whoami": ["Anubhav Mohandas", "Security + AI engineer · India"],
    "ls": ["sage  nyx  cybertrace  hermes  ghost  nyxine  jerry  aegis"],
    "help": ["whoami · ls · help · contact · matrix · clear · exit"],
    "clear": ["__CLEAR__"],
    "contact": ["anubhav.manav147@gmail.com"],
    "matrix": ["follow the white rabbit. ↑↑↓↓←→←→ba"],
    "exit": ["__CLEAR__"],
    "date": [new Date().toString()],
    "uname": ["Portfolio · darwin · aarch64"],
    "echo": [cmd.slice(5)],
  };
  const base = c.split(' ')[0];
  const out = responses[base] || responses[c] || [`zsh: command not found: ${cmd}`];
  runTerminal([`anubhav@portfolio:~$ ${cmd}`, ...out]);
}

// ---------- Boot splash (logo 5x clicks) ----------
function BootSplash({ onDone }) {
  const [line, setLine] = useState(0);
  const lines = [
    "[ OK ] booting portfolio.kernel 0.4.2",
    "[ OK ] mounting /projects",
    "[ OK ] loading SAGE.engine",
    "[ OK ] loading NYX.interface",
    "[ OK ] loading HERMES.runtime",
    "[ OK ] portfolio ready.",
  ];
  useEffect(() => {
    const id = setInterval(() => setLine(l => Math.min(lines.length, l + 1)), 350);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', zIndex: 9000,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 8vw', fontFamily: 'var(--f-mono)', fontSize: 14,
      color: 'var(--accent)',
      animation: 'fadeIn 0.3s'
    }}>
      {lines.slice(0, line).map((l, i) => (
        <div key={i} style={{ color: l.includes("OK") ? "var(--accent)" : "var(--ink-2)", lineHeight: 1.8 }}>
          {l}
        </div>
      ))}
      <div style={{ color: 'var(--ink-3)', marginTop: 20, fontSize: 11 }}>
        (esc to skip)
      </div>
    </div>
  );
}

// Mount — alias all window-exported components to local PascalCase vars
const Nav_ = window.Nav;
const JourneyTrail_ = window.JourneyTrail;
const Hero_ = window.Hero;
const Portrait_ = window.Portrait;
const Studio_ = window.Studio;
const Thesis_ = window.Thesis;
const Constellation_ = window.Constellation;
const SAGEScene_ = window.SAGEScene;
const NYXScene_ = window.NYXScene;
const CyberTraceScene_ = window.CyberTraceScene;
const HERMESScene_ = window.HERMESScene;
const AegisScene_ = window.AegisScene;
const Completed_ = window.Completed;
const Archive_ = window.Archive;
const Writing_ = window.Writing;
const Contact_ = window.Contact;

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

