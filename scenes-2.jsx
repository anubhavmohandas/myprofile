// ============================================================
// SCENES 2 — Studio, Constellation, SAGE
// ============================================================

const { useEffect, useRef, useState } = React;

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
