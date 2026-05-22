// ============================================================
// SCENES 3 — NYX, MIDAS, CyberTrace, HERMES
// ============================================================

const { useEffect, useRef, useState } = React;

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
    "scan github.com/anubhavmohandas/midas for cves",
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

// ---------- MIDAS ----------
function MIDASScene() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const D = window.PORTFOLIO_DATA.ongoing.find(p => p.id === "midas");

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const trigger = window.ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => setStep(Math.min(4, Math.floor(self.progress * 5.001)))
      });
      return () => trigger.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="scene" id="midas" data-screen-label="07 MIDAS">
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

        <div className="scene-stage midas-stage">
          <div className="scene-step-counter">
            <span className="cur">P{step + 1}</span> / P5
          </div>
          {D.phases.map((p, i) => (
            <div key={i} className={`midas-phase ${i === step ? 'active' : ''}`}>
              <div className="midas-phase-num">{p.num}</div>
              <div>
                <div className="midas-phase-title">{p.title}</div>
                <div className="midas-phase-desc">{p.desc}</div>
              </div>
              <div className="midas-phase-icons">
                {p.icons.map(ic => <span key={ic}>· {ic}</span>)}
              </div>
            </div>
          ))}
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
    <section ref={rootRef} className="scene" id="cybertrace" data-screen-label="08 CyberTrace">
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

  const stepLabel = ["54 OPEN-SOURCE REPOS", "20 MODULES", "5 LAYERS"];
  const stepTitle = [
    "Start with everything.",
    "Distill the patterns.",
    "Compose the engine."
  ];

  return (
    <section ref={rootRef} className="scene" id="hermes" data-screen-label="09 HERMES">
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
                {Array.from({ length: 54 }).map((_, i) => (
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
                  <div key={i} className="hermes-layer-row">
                    <span>{l}</span>
                    <span className="lbl-num">L{i + 1}</span>
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

window.NYXScene = NYXScene;
window.MIDASScene = MIDASScene;
window.CyberTraceScene = CyberTraceScene;
window.HERMESScene = HERMESScene;
