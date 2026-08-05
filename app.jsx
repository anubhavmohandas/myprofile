// ============================================================
// APP — Root, theme, easter eggs, terminal, Lenis
// ============================================================

const { useEffect, useRef, useState } = React;

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
const Completed_ = window.Completed;
const Archive_ = window.Archive;
const Writing_ = window.Writing;
const Contact_ = window.Contact;

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
