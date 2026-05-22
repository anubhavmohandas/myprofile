// ============================================================
// NAV — top bar + side journey trail
// ============================================================

const { useEffect, useRef, useState } = React;

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
    { href: 'midas', label: 'MIDAS' },
    { href: 'cybertrace', label: 'CT' },
    { href: 'hermes', label: 'HERMES' },
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
    { id: "midas", label: "MIDAS" },
    { id: "cybertrace", label: "CYBERTRACE" },
    { id: "hermes", label: "HERMES" },
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
