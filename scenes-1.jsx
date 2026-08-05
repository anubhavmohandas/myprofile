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
