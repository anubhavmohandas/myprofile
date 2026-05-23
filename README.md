# anubhavmohandas.netlify.app

> *I build autonomous systems. Security agents, OSINT pipelines, and local AI that investigate, decide, and act — without supervision.*

---

## What's this?

Personal portfolio of **Anubhav Mohandas** — Cybersecurity Researcher, Digital Forensics Specialist, and tool developer based in India.

Not a template. Not a theme. Built from scratch — custom animations, scroll-driven scenes, and a dark UI that actually matches the work it showcases.

Live at → **[anubhavmohandas.netlify.app](https://anubhavmohandas.netlify.app)**

---

## The Systems

These aren't side projects. They're ongoing.

| Codename | Full Name | What it does |
|----------|-----------|--------------|
| **SAGE** | Security Analysis & Graph Engine | Autonomous pipeline — monitors CVEs, maps blast radius via code graphs, generates patches, opens PRs. Zero human intervention. |
| **NYX** | Personal AI Assistant | Voice-activated, fully local. Multi-model fallback. No cloud dependency. Speaks Hindi, English, Hinglish, Malayalam. |
| **MIDAS** | Market Intelligence, Discovery & Autonomous SaaS-builder | Mines pain points overnight, validates demand, scaffolds and ships a full SaaS to Vercel — by morning. |
| **CyberTrace** | OSINT Intelligence Platform | Give it any identifier — email, BTC address, phone, IP, GSTIN. Queries 30+ surface, deep, and dark web sources in parallel. |
| **HERMES** | Hybrid Engine for Research, Memory, Execution & Synthesis | 54 open-source patterns distilled into 20 modules across 5 layers. One install, full capability stack for Claude. |

---

## More Tools

- **GHOST** — Chrome extension. AES-256-GCM encrypted autofill across 80+ field types. Includes a reverse-engineered Tatkal booking module for IRCTC.
- **Nyxine** — Privacy-first resume builder. Scores your experience against a JD in-browser. Zero data leaves the device.
- **WhoisUser** — OSINT username enumeration across 100+ platforms.
- **Secure Gen** — Payload generation framework. 15+ payload types, WAF bypass, DB-specific attack vectors.
- **SIEM Kernel Exploit Detection** — Real-time detection of kernel-level exploits and APTs.
- **Enhanced CVSS Calculator** — Extended vulnerability scoring for real triage workflows.
- **Ultimate Digital Forensics Toolkit** — Multi-tool investigation suite for cyber crime cases.

---

## Stack

No bundler. No CLI. No build step.

```
React 18 (UMD)  +  Babel Standalone  →  JSX compiled in the browser
GSAP + ScrollTrigger                  →  scroll-driven animations
Lenis                                 →  smooth scroll
Geist + Instrument Serif              →  typography
```

Everything ships as a single `index.html` with inlined components. Fast to iterate, zero toolchain friction.

---

## Run Locally

```bash
git clone https://github.com/anubhavmohandas/myprofile.git
cd myprofile
python3 -m http.server 3000
# → http://localhost:3000
```

No `npm install`. No `.env`. No setup.

---

## Deploy

Auto-deploys to Netlify on every push to `main`.

```toml
# netlify.toml
[build]
  publish = "."
  command = "echo 'No build needed'"
```

To force a manual deploy:

```bash
netlify deploy --prod --dir=. --site=3ed0285a-2104-4461-a6d0-dc8ae031b0c8
```

---

## File Structure

```
myprofile/
├── index.html        # Everything starts here
├── styles.css        # All styles (~84KB, fully custom)
├── data.js           # Projects, tools, experience — edit here
├── app.jsx           # Root component + routing logic
├── nav.jsx           # Navigation bar
├── scenes-1..4.jsx   # Page sections
├── assets/           # Portrait + cover image
├── resume.html       # Standalone resume
└── netlify.toml      # Netlify config
```

---

<div align="center">
  <sub>Security 2019 → Now &nbsp;·&nbsp; @anubhavmohandas</sub>
</div>
