// ============================================================
// PORTFOLIO DATA — Anubhav Mohandas
// ============================================================

const PORTFOLIO_DATA = {
  identity: {
    name: "Anubhav Mohandas",
    location: "India",
    role: "Security + AI Systems",
    handle: "@anubhavmohandas",
    email: "anubhav.manav147@gmail.com",
    github: "https://github.com/anubhavmohandas",
    linkedin: "https://www.linkedin.com/in/anubhavmohandas/",
    twitter: "https://x.com/anubhavmohandas"
  },

  headline: {
    line1: "I build",
    line2: "autonomous",
    accent: "systems.",
  },

  sub: "Security agents, OSINT pipelines, and local AI that investigate, decide, and act — without supervision.",

  thesis: [
    "Most security tools",
    "notify.",
    "Most AI tools",
    "answer.",
    "I build the ones that",
    { italic: "act." }
  ],

  thesisStats: [
    { num: "08", lbl: "Autonomous systems in production or in flight" },
    { num: "13", lbl: "OSINT modules running concurrently in CyberTrace" },
    { num: "56", lbl: "Open-source repos distilled into HERMES" }
  ],

  // Ongoing — get full pinned scrollytelling scenes
  ongoing: [
    {
      id: "sage",
      codename: "ONGOING / 01",
      name: "SAGE",
      expand: "Security Analysis & Graph Engine",
      tagline: "An autonomous security pipeline that monitors code, maps transitive CVE exposure, generates validated patches, and raises GitHub PRs — without human intervention.",
      tags: ["Python", "Claude", "Semgrep", "tree-sitter", "NetworkX", "NVD API", "GitHub"],
      link: "https://github.com/anubhavmohandas/SAGE",
      steps: [
        { num: "01", title: "Watch", body: "Daily poll of NVD for new CVEs. Filtered against the actual transitive dependency chain — not just direct imports.", viz: "→ NVD" },
        { num: "02", title: "Map", body: "Synapse — a tree-sitter + NetworkX code graph — locates every function in the blast radius. Only those reach the LLM.", viz: "Σ Synapse" },
        { num: "03", title: "Patch", body: "Semgrep proves the vulnerability structurally. Claude generates a targeted fix. CVE-specific attack tests prove the fix works.", viz: "Δ patch" },
        { num: "04", title: "PR", body: "A pull request opens with the CVE reference, diff, and explanation. A human reviews and merges. That's all they do.", viz: "✓ merged" }
      ]
    },
    {
      id: "nyx",
      codename: "ONGOING / 02",
      name: "NYX",
      expand: "Personal AI Assistant",
      tagline: "A voice-activated local AI assistant. No cloud dependency. Multi-model fallback. Speaks Hindi, English, Hinglish, Malayalam.",
      tags: ["Python", "Claude API", "Ollama", "LangChain", "FastAPI", "VAD"],
      link: "https://github.com/anubhavmohandas",
      // see component
    },
    {
      id: "cybertrace",
      codename: "ONGOING / 03",
      name: "CyberTrace",
      expand: "OSINT Intelligence Platform",
      tagline: "Give it any identifier — email, BTC address, phone, IP, GSTIN — and it queries 30+ surface, deep, and dark web sources in parallel.",
      tags: ["Python", "aiohttp", "asyncio", "TOR", "OSINT", "Async"],
      link: "https://github.com/anubhavmohandas/CyberTrace",
      modules: [
        { name: "Email Breach", srcs: "HIBP · DeHashed" },
        { name: "Phone Intel", srcs: "Truecaller · NumLookup" },
        { name: "BTC Trace", srcs: "Blockchain · WalletExplorer" },
        { name: "Domain", srcs: "WHOIS · DNS" },
        { name: "IP Geo", srcs: "MaxMind · Shodan" },
        { name: "Dark Web", srcs: "Ahmia · DarkOwl" },
        { name: "Image EXIF", srcs: "Geolocation · Reverse" },
        { name: "Social", srcs: "13 platforms" },
        { name: "Government", srcs: "GSTIN · PAN · Vehicle" },
        { name: "Geo", srcs: "Coordinates · Maps" },
        { name: "Threat Intel", srcs: "AbuseIPDB · VirusTotal" },
        { name: "Username", srcs: "100+ platforms" },
      ]
    },
    {
      id: "hermes",
      codename: "ONGOING / 04",
      name: "HERMES",
      expand: "Hybrid Engine for Research, Memory, Execution & Synthesis",
      tagline: "One install. 1,420 patterns pulled from 56 open-source repos, consolidated into 7 modules — Apollo routes, Mnemos remembers, Curator learns, Clio tracks the cost, meta/ guards every tool call. Fetcher and Connect are next.",
      tags: ["Claude Skill", "Python", "SQLite", "HNSW", "MCP", "Cron"],
      link: "https://github.com/anubhavmohandas",
      modules: ["Apollo", "Mnemos", "Clio", "Curator", "Fetcher", "Connect", "meta/security"],
      layers: [
        { name: "Apollo", status: "built — routing real requests", done: true },
        { name: "meta/security", status: "built — 7 defense layers", done: true },
        { name: "Mnemos", status: "v1 + v2 built, HNSW verified", done: true },
        { name: "Curator", status: "built — human-gated proposals", done: true },
        { name: "Clio", status: "started", done: false },
        { name: "Fetcher", status: "not built yet (Phase 3C)", done: false },
        { name: "Connect", status: "not built yet (Phase 3C)", done: false }
      ]
    },
    {
      id: "aegis",
      codename: "ONGOING / 05",
      name: "AEGIS",
      expand: "Cross-Platform AI Security Assistant",
      tagline: "A resident endpoint monitor for macOS, Windows, and Linux — watches process launches, USB activity, startup persistence, and folders, scores severity locally before any AI call, and captures tamper evidence the moment someone tries to shut it off. Alpha: macOS-validated on real hardware; a signed public release is gated on Windows hardware validation.",
      tags: ["Python", "Claude/OpenAI", "watchdog", "psutil", "SQLite", "pywebview", "VirusTotal", "MITRE ATT&CK"],
      link: "https://github.com/anubhavmohandas/Aegis",
      steps: [
        { num: "01", title: "Watch", body: "Per-OS collectors stream process launches, USB activity, startup persistence, and recursive folder events onto a shared queue — real-time, not a polling gap.", viz: "→ collect" },
        { num: "02", title: "Score", body: "Your trust list is skipped outright. Everything else is rated low to critical by a local severity heuristic and signal-corroboration engine — before any AI call happens.", viz: "Σ severity" },
        { num: "03", title: "Explain", body: "Optional VirusTotal hash lookup and offline MITRE ATT&CK mapping enrich the event first. Claude or OpenAI turns it into a plain-English explanation.", viz: "Δ explain" },
        { num: "04", title: "Evidence", body: "Repeated failed auth on a protected action — Stop Monitoring, Delete Evidence — triggers webcam and screenshot capture into a password-gated Incident.", viz: "✓ tamper-proof" }
      ]
    }
  ],

  completed: [
    {
      id: "ghost",
      name: "GHOST",
      expand: "General Handler of Stored Templates",
      blurb: "A Chrome/Brave extension that intelligently autofills 80+ field types across the web using AES-256-GCM encrypted local profiles. Includes a Tatkal booking module for IRCTC's Angular monolith — reverse-engineered, no public API.",
      tags: ["Chrome MV3", "Web Crypto API", "AES-GCM", "Angular Interop", "Service Workers"],
      link: "https://github.com/anubhavmohandas/GHOST",
      mock: "ghost"
    },
    {
      id: "nyxine",
      name: "Nyxine",
      expand: "Privacy-First Resume Builder",
      blurb: "Industry + academic modes. 8 templates. A smart keyword engine that scores your experience against a job description in-browser. AI coaching that pre-fills Claude prompts for ATS gap analysis and bullet rewrites. Zero data ever leaves the browser.",
      tags: ["React 19", "Vite", "Tailwind", "localStorage", "Claude AI"],
      link: "https://github.com/anubhavmohandas/Nyxine-Resume-Maker",
      mock: "nyxine"
    },
    {
      id: "jerry",
      name: "Jerry",
      expand: "Personalized Virtual AI Assistant",
      blurb: "An earlier-generation personalized AI assistant. The architectural precursor to NYX — intelligent automation, personalized interactions, smart task management.",
      tags: ["AI Assistant", "Machine Learning", "Automation"],
      link: "https://github.com/anubhavmohandas/Jerry",
      mock: "jerry"
    },
    {
      id: "cvss",
      name: "Enhanced CVSS Calculator",
      expand: "Vulnerability Scoring Tool",
      blurb: "An advanced Common Vulnerability Scoring System calculator built for accurate risk assessment. Extends the standard CVSS with enhanced features used in real triage workflows.",
      tags: ["CVSS", "Vulnerability Assessment", "Risk Management"],
      link: "https://github.com/anubhavmohandas/Enhanced-CVSS-Calculator",
      mock: "cvss"
    }
  ],

  // Legacy archive — earlier security work, kept for depth
  archive: [
    {
      name: "Ultimate Digital Forensics Toolkit",
      blurb: "All-in-one forensics toolkit — multi-tool investigation, evidence collection, analysis capabilities for cyber crime cases.",
      tags: ["Forensics", "Investigation", "Evidence"],
      link: "https://github.com/anubhavmohandas/Ultimate-Digital-Forensics-Toolkit"
    },
    {
      name: "WhoisUser",
      blurb: "OSINT username enumeration framework — automated discovery across 100+ platforms with intelligent result merging.",
      tags: ["OSINT", "Username Enum", "Multi-Platform"],
      link: "https://github.com/anubhavmohandas/whoisuser"
    },
    {
      name: "Log Analyzer",
      blurb: "Security log analysis with automated threat detection, IP intelligence + geolocation, multi-format support (firewalls, systems, web servers).",
      tags: ["Log Analysis", "Threat Detection", "IP Intel"],
      link: "https://github.com/anubhavmohandas/log-analyzer"
    },
    {
      name: "Secure Gen",
      blurb: "Payload generation framework for ethical hacking — 15+ payload types, intelligent mutation, DB-specific attack vectors, WAF bypass.",
      tags: ["Payloads", "Ethical Hacking", "WAF Bypass"],
      link: "https://github.com/anubhavmohandas/secure_gen"
    },
    {
      name: "Recon Scanner",
      blurb: "Advanced reconnaissance tool for comprehensive security assessments and network reconnaissance.",
      tags: ["Python", "Recon", "OSINT"],
      link: "https://github.com/anubhavmohandas/recon_scanner"
    },
    {
      name: "SIEM Kernel Exploit Detection",
      blurb: "SIEM specialized in detecting kernel-level exploits and APTs in real-time. Bridges classic monitoring and modern threat hunting.",
      tags: ["SIEM", "Kernel", "APT Detection"],
      link: "https://github.com/anubhavmohandas/siem-kernel-exploit-detection"
    },
    {
      name: "AuthGuard",
      blurb: "Robust authentication and authorization security system. Multi-layer access control for application hardening.",
      tags: ["Auth", "AuthZ", "Access Control"],
      link: "https://github.com/anubhavmohandas/AuthGuard"
    },
    {
      name: "Web Detection System",
      blurb: "Web-based detection for identifying threats, malicious activities, and anomalous behavior in real-time traffic.",
      tags: ["Web Sec", "Threat Detection", "Anomaly"],
      link: "https://github.com/anubhavmohandas/web_detection"
    }
  ],

  writing: {
    notice: "Techtonic Hive (anubhavmohandas's writing home) is currently suspended. New venue TBD.",
    posts: [
      { date: "Feb 2024", title: "Essential Kali Linux Commands for Beginners", link: "#" },
      { date: "Apr 2023", title: "Why OSINT Matters: Exploring Cyber Intelligence", link: "#" },
      { date: "Coming", title: "Building SAGE — How an LLM Patches Its Own Dependencies", link: "#" },
      { date: "Coming", title: "HERMES — On Consolidating 54 Repos Into One Skill", link: "#" }
    ]
  }
};

if (typeof window !== 'undefined') window.PORTFOLIO_DATA = PORTFOLIO_DATA;
