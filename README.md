```
█████╗ ███╗   ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
██╔══██╗████╗  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗██║   ██║
███████║██╔██╗ ██║██║   ██║██████╔╝███████║███████║██║   ██║
██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██╔══██║╚██╗ ██╔╝
██║  ██║██║ ╚████║╚██████╔╝██████╔╝██║  ██║██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝ 
```

<div align="center">

**Cybersecurity Researcher · Digital Forensics · Autonomous Systems**

[![Live](https://img.shields.io/badge/LIVE-anubhavmohandas.netlify.app-00d4ff?style=for-the-badge&logo=netlify&logoColor=white)](https://anubhavmohandas.netlify.app)
[![Security](https://img.shields.io/badge/SECURITY-2019%20→%20NOW-ff6b35?style=for-the-badge)](https://anubhavmohandas.netlify.app)
[![Status](https://img.shields.io/badge/SYSTEMS-SHIPPING-00ff88?style=for-the-badge)](https://anubhavmohandas.netlify.app)

</div>

---

> *Systems that investigate, decide, and act — without supervision.*
>
> This isn't a portfolio in the traditional sense. It's a running record of autonomous tools built at the intersection of security research, AI, and digital forensics. Every project here either works in production or is actively being broken and rebuilt.

---

## `// active systems`

### ◈ SAGE — *Security Analysis & Graph Engine*
CVE drops. SAGE wakes up. It maps your entire transitive dependency graph using tree-sitter + NetworkX, finds every function in the blast radius, calls Claude for a targeted patch, runs CVE-specific exploit tests to verify it, then opens a GitHub PR. You review and merge. That's it. That's all you do.

### ◈ NYX — *Personal AI Assistant*
Fully local. No API keys phoning home. Voice-activated, multi-model fallback, speaks Hindi / English / Hinglish / Malayalam. The anti-cloud AI assistant — because why trust your conversations to someone else's server?

### ◈ CyberTrace — *OSINT Intelligence Platform*
One identifier in. Everything out. Email → breach history. BTC address → wallet graph. Phone → carrier + owner. IP → geolocation + Shodan exposure. GSTIN → business intel. 30+ sources across surface, deep, and dark web — queried in parallel, results merged and ranked.

### ◈ HERMES — *Hybrid Engine for Research, Memory, Execution & Synthesis*
1,420 patterns pulled from 56 open-source repos, consolidated into 7 modules — Apollo, Mnemos, Clio, Curator, Fetcher, Connect, meta/security. Apollo, meta/security, Mnemos, and Curator are built and verified; Fetcher and Connect are next. One install. Built so Claude can do everything without switching contexts.

### ◈ Aegis — *Cross-Platform AI Security Assistant*
A resident endpoint monitor for macOS, Windows, and Linux — watches process launches, USB activity, startup persistence, and folders, scores severity locally before any AI call, and captures tamper evidence the moment someone tries to shut it off. Alpha: macOS-validated on real hardware; a signed public release is gated on Windows hardware validation.

---

## `// shipped`

| Tool | What it actually does |
|------|----------------------|
| **GHOST** | AES-256-GCM autofill extension. Reverse-engineered IRCTC's Angular monolith for Tatkal booking. No public API was used. |
| **Nyxine** | Resume builder that never touches a server. JD keyword scoring, ATS gap analysis, AI coaching — all in-browser. |
| **WhoisUser** | Username across 100+ platforms. One query. |
| **Secure Gen** | Payload framework — 15+ types, WAF bypass, DB-specific vectors. For ethical hacking. |
| **SIEM Kernel Exploit Detector** | Real-time APT and kernel-level exploit detection. |
| **Digital Forensics Toolkit** | All-in-one investigation suite for cyber crime cases. |
| **Enhanced CVSS Calculator** | Because the standard one isn't enough for real triage. |

---

## `// how it's built`

No Webpack. No Vite. No Next.js. No `npm install` before you can see a button.

```
React 18 (UMD)  ──▶  loaded from unpkg CDN
Babel Standalone ──▶  JSX compiled in-browser, at runtime  
GSAP + ScrollTrigger ──▶  every scroll animation
Lenis  ──▶  smooth scroll
Geist + Instrument Serif  ──▶  the typography
```

The entire app ships as one `index.html` with components inlined as `<script type="text/babel">`. It's unconventional. It's intentional. Zero toolchain means zero toolchain problems.

---

## `// run it`

```bash
git clone https://github.com/anubhavmohandas/myprofile.git
cd myprofile
python3 -m http.server 3000
```

`http://localhost:3000` — no setup, no installs, no environment files.

---

## `// deploy`

Netlify. Auto-deploys on push to `main`. No build step.

```toml
[build]
  publish = "."
  command = "echo 'No build needed'"
```

```bash
# force a manual push
netlify deploy --prod --dir=.
```

---

## `// structure`

```
myprofile/
├── index.html          ← start here. everything is here.
├── styles.css          ← ~84KB of custom CSS. no frameworks.
├── data.js             ← all content lives here. edit this.
├── app.jsx             ← root component
├── nav.jsx             ← navigation
├── scenes-1..4.jsx     ← page sections (Systems, About, Work, Contact)
├── assets/             ← portrait + cover
├── resume.html         ← standalone resume page
└── netlify.toml        ← one file. no build.
```

---

<div align="center">
<sub><code>security · forensics · autonomous systems · 2019 → now</code></sub>
</div>
