// ============================================================
// SCENES 4 — Completed, Archive, Stack, Writing, Contact
// ============================================================

const { useEffect, useRef, useState } = React;

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

// ---------- Stack ----------
function Stack() {
  const rootRef = useRef(null);
  const D = window.PORTFOLIO_DATA.stack;

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const groups = rootRef.current.querySelectorAll('.stack-group');
      groups.forEach(g => {
        const items = g.querySelectorAll('li');
        window.gsap.to(items, {
          scrollTrigger: {
            trigger: g,
            start: "top 80%"
          },
          opacity: 1,
          x: 0,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => items.forEach(it => it.classList.add('lit'))
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="stack" id="stack" data-screen-label="12 Stack">
      <div className="section-eyebrow-row">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">005 — STACK</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 16, maxWidth: '14ch' }}>
            The <span className="t-serif-italic" style={{ color: 'var(--accent-warm)' }}>inventory.</span>
          </h2>
        </div>
        <div style={{ maxWidth: 320 }}>
          <p className="t-body">
            No icons. No badges. Just what I use, daily.
          </p>
        </div>
      </div>

      <div className="stack-grid">
        {D.map(g => (
          <div key={g.group} className="stack-group">
            <div className="stack-group-title">{g.group}</div>
            <ul>
              {g.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </div>
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
    <section ref={rootRef} className="writing" id="writing" data-screen-label="13 Writing">
      <div className="section-eyebrow-row">
        <div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="t-hairline">006 — WRITING</span>
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
    <section ref={rootRef} className="contact" id="contact" data-screen-label="14 Contact">
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
window.Stack = Stack;
window.Writing = Writing;
window.Contact = Contact;
