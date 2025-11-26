import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [konamiActive, setKonamiActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const konamiCode = useRef([]);
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  const trailPositions = useRef(Array(8).fill({ x: 0, y: 0 }));

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setShowCharacter(window.innerWidth > 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Konami Code Detection
  useEffect(() => {
    const handleKeyPress = (e) => {
      konamiCode.current.push(e.key);
      if (konamiCode.current.length > 10) {
        konamiCode.current.shift();
      }
      
      const currentSequence = konamiCode.current.join(',');
      const targetSequence = konamiSequence.join(',');
      
      if (currentSequence === targetSequence) {
        setKonamiActive(true);
        setBubbleMessage("🌈 Rainbow Mode Activated! You found the secret!");
        setShowBubble(true);
        
        setTimeout(() => {
          setKonamiActive(false);
          setShowBubble(false);
          konamiCode.current = [];
        }, 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Mouse tracking for custom cursor
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        trailPositions.current = [
          { x: e.clientX, y: e.clientY },
          ...trailPositions.current.slice(0, 7)
        ];
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Animated particles
  const particles = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6
    }))
  , []);

  // Character guide messages
  const handleCharacterClick = () => {
    setBubbleMessage("Hi! Explore my cybersecurity research & tool development portfolio!");
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 5000);
  };

  const navItems = [
    { href: 'home', icon: 'house', label: 'Home' },
    { href: 'about', icon: 'user', label: 'About' },
    { href: 'tools', icon: 'wrench', label: 'Tools' },
    { href: 'experience', icon: 'briefcase', label: 'Experience' },
    { href: 'projects', icon: 'code', label: 'Projects' },
    { href: 'blog', icon: 'blog', label: 'Blog' },
    { href: 'contact', icon: 'envelope', label: 'Contact' }
  ];

  const blogPosts = [
    {
      title: 'Essential Kali Linux Commands for Beginners',
      date: 'February 2024',
      description: 'Comprehensive guide to essential Kali Linux commands every cybersecurity professional should know.',
      link: 'https://www.techtonichive.in/2024/02/unveiling-power-essential-kali-linux.html',
      icon: 'terminal'
    },
    {
      title: 'Why OSINT Matters: Exploring Cyber Intelligence',
      date: 'April 2023',
      description: 'Deep dive into Open Source Intelligence (OSINT) and its critical role in modern cybersecurity investigations.',
      link: 'https://www.techtonichive.in/2023/04/why-osint-matters-exploring-cyber.html',
      icon: 'magnifying-glass-chart'
    }
  ];

  const tools = [
    {
      category: 'Operating Systems',
      icon: 'terminal',
      items: [
        { name: 'Kali Linux', desc: 'Primary investigation OS', icon: 'linux' },
        { name: 'Windows', desc: 'Windows forensics & analysis', icon: 'windows' },
        { name: 'Red Hat Linux', desc: 'Enterprise security testing', icon: 'redhat' }
      ]
    },
    {
      category: 'Digital Forensics',
      icon: 'magnifying-glass',
      items: [
        { name: 'Autopsy', desc: 'Digital forensics platform', icon: 'microscope' },
        { name: 'FTK', desc: 'Forensic toolkit suite', icon: 'hammer' },
        { name: 'Wireshark', desc: 'Network protocol analyzer', icon: 'fish' }
      ]
    },
    {
      category: 'Penetration Testing',
      icon: 'bug',
      items: [
        { name: 'Burp Suite', desc: 'Web security testing', icon: 'crosshairs' },
        { name: 'Metasploit', desc: 'Exploitation framework', icon: 'bomb' },
        { name: 'Nmap', desc: 'Network scanning & discovery', icon: 'network-wired' }
      ]
    },
    {
      category: 'Password & Brute Force',
      icon: 'key',
      items: [
        { name: 'Hydra', desc: 'Network login cracker', icon: 'lock-open' },
        { name: 'John the Ripper', desc: 'Password cracking tool', icon: 'unlock' },
        { name: 'SQLMap', desc: 'SQL injection automation', icon: 'database' }
      ]
    },
    {
      category: 'OSINT & Reconnaissance',
      icon: 'eye',
      items: [
        { name: 'Amass', desc: 'Network mapping & enumeration', icon: 'map' },
        { name: 'TheHarvester', desc: 'Email & subdomain discovery', icon: 'envelope-open-text' },
        { name: 'AssetFinder', desc: 'Domain & subdomain enumeration', icon: 'sitemap' }
      ]
    },
    {
      category: 'SIEM & Monitoring',
      icon: 'chart-line',
      items: [
        { name: 'Wazuh', desc: 'Security monitoring platform', icon: 'shield-halved' },
        { name: 'Sysmon', desc: 'System activity monitoring', icon: 'desktop' },
        { name: 'Splunk', desc: 'Log analysis & SIEM', icon: 'chart-bar' }
      ]
    },
    {
      category: 'Malware Analysis',
      icon: 'virus',
      items: [
        { name: 'PEStudio', desc: 'Malware initial assessment', icon: 'file-code' },
        { name: 'CFF Explorer', desc: 'PE file structure analysis', icon: 'microscope' },
        { name: 'YARA', desc: 'Malware identification', icon: 'fingerprint' }
      ]
    },
    {
      category: 'Scripting & Automation',
      icon: 'code',
      items: [
        { name: 'Python', desc: 'Security automation & scripting', icon: 'python' },
        { name: 'Bash', desc: 'Linux automation & scripting', icon: 'terminal' },
        { name: 'PowerShell', desc: 'Windows automation', icon: 'file-code' }
      ]
    },
    {
      category: 'Web Application Security',
      icon: 'globe',
      items: [
        { name: 'OWASP ZAP', desc: 'Web security scanner', icon: 'spider' },
        { name: 'Nikto', desc: 'Web server scanner', icon: 'server' },
        { name: 'DirBuster', desc: 'Directory & file bruteforcer', icon: 'folder-tree' }
      ]
    }
  ];

  const projects = [
    {
      icon: 'toolbox',
      title: 'Ultimate Digital Forensics Toolkit',
      description: 'Comprehensive all-in-one digital forensics toolkit featuring multiple investigation tools, evidence collection utilities, and analysis capabilities for cyber crime investigation.',
      tags: ['Digital Forensics', 'Investigation', 'Evidence Analysis', 'All-in-One'],
      link: 'https://github.com/anubhavmohandas/Ultimate-Digital-Forensics-Toolkit'
    },
    {
      icon: 'user-secret',
      title: 'WhoisUser - OSINT Framework',
      description: 'Professional username enumeration and OSINT investigation framework. Automated username discovery across 100+ platforms with intelligent result merging and forensic tools.',
      tags: ['OSINT', 'Username Enumeration', 'Investigation', 'Multi-Platform'],
      link: 'https://github.com/anubhavmohandas/whoisuser'
    },
    {
      icon: 'chart-line',
      title: 'Log Analyzer - Threat Detection',
      description: 'Security log analysis tool with automated threat detection, IP intelligence with geolocation, and support for multiple log formats including firewalls, systems, and web servers.',
      tags: ['Log Analysis', 'Threat Detection', 'IP Intelligence', 'Security'],
      link: 'https://github.com/anubhavmohandas/log-analyzer'
    },
    {
      icon: 'bomb',
      title: 'Secure Gen - Payload Framework',
      description: 'Advanced security payload generation framework for ethical hacking. Features 15+ payload types, intelligent mutation techniques, and database-specific attack vectors.',
      tags: ['Payload Generation', 'Ethical Hacking', 'Security Testing', 'WAF Bypass'],
      link: 'https://github.com/anubhavmohandas/secure_gen'
    },
    {
      icon: 'magnifying-glass',
      title: 'Recon Scanner',
      description: 'Advanced reconnaissance tool designed for cybersecurity researchers to perform comprehensive security assessments and network reconnaissance.',
      tags: ['Python', 'Network Security', 'Reconnaissance', 'OSINT'],
      link: 'https://github.com/anubhavmohandas/recon_scanner'
    },
    {
      icon: 'shield-virus',
      title: 'SIEM Kernel Exploit Detection',
      description: 'Security Information and Event Management system specialized in detecting kernel-level exploits and advanced persistent threats in real-time.',
      tags: ['SIEM', 'Exploit Detection', 'Kernel Security', 'APT'],
      link: 'https://github.com/anubhavmohandas/siem-kernel-exploit-detection'
    },
    {
      icon: 'calculator',
      title: 'Enhanced CVSS Calculator',
      description: 'Advanced Common Vulnerability Scoring System calculator with enhanced features for accurate vulnerability assessment and risk management.',
      tags: ['CVSS', 'Vulnerability Assessment', 'Risk Management'],
      link: 'https://github.com/anubhavmohandas/Enhanced-CVSS-Calculator'
    },
    {
      icon: 'user-shield',
      title: 'AuthGuard',
      description: 'Robust authentication and authorization security system designed to protect applications from unauthorized access with multi-layer security.',
      tags: ['Authentication', 'Authorization', 'Access Control'],
      link: 'https://github.com/anubhavmohandas/AuthGuard'
    },
    {
      icon: 'robot',
      title: 'Jerry - Personalized Virtual AI',
      description: 'Advanced personalized virtual AI assistant designed to provide intelligent automation, personalized interactions, and smart task management.',
      tags: ['AI Assistant', 'Machine Learning', 'Automation'],
      link: 'https://github.com/anubhavmohandas/Jerry'
    },
    {
      icon: 'file-alt',
      title: 'Nyxine - AI Resume Maker',
      description: 'Smart, AI-powered resume builder with privacy focus. Features ATS optimization, job description matching, and authentic experience highlighting without fluff.',
      tags: ['AI', 'Resume Builder', 'ATS Optimization', 'Privacy-First'],
      link: 'https://github.com/anubhavmohandas/Nyxine-Resume-Maker'
    },
    {
      icon: 'globe',
      title: 'Web Detection System',
      description: 'Advanced web-based detection system for identifying security threats, malicious activities, and anomalous behavior in real-time web traffic.',
      tags: ['Web Security', 'Threat Detection', 'Anomaly Detection'],
      link: 'https://github.com/anubhavmohandas/web_detection'
    }
  ];

  return (
    <div className="portfolio">
      {/* Konami Rainbow Overlay */}
      {konamiActive && (
        <div className="konami-overlay" />
      )}

      {/* Custom Cursor - Desktop Only */}
      {typeof window !== 'undefined' && window.innerWidth > 768 && (
        <>
          <div 
            className="custom-cursor"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`
            }}
          />
          {trailPositions.current.map((pos, i) => (
            <div
              key={i}
              className="cursor-trail"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                opacity: (1 - i / 8) * 0.8,
                transform: `translate(-50%, -50%) scale(${1 - i / 8})`
              }}
            />
          ))}
        </>
      )}

      {/* Animated Background Particles */}
      <div className="animated-bg">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>

      {/* Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Character Guide */}
      {showCharacter && (
        <div className="character-guide" onClick={handleCharacterClick} role="button" tabIndex={0}>
          <div className="character">
            <div className="character-head">
              <div className="character-eyes">
                <div className="character-eye"></div>
                <div className="character-eye"></div>
              </div>
              <div className="character-smile"></div>
            </div>
            <div className="character-body"></div>
            <div className="character-arm character-arm-left"></div>
            <div className="character-arm character-arm-right"></div>
            <div className="character-leg character-leg-left"></div>
            <div className="character-leg character-leg-right"></div>
          </div>
          {showBubble && (
            <div className="speech-bubble">
              {bubbleMessage}
              <div className="bubble-arrow"></div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
            <i className="fa-solid fa-user-secret"></i>
            <span className="logo-text">Anubhav Mohandas</span>
            <span className="logo-text-mobile">AM</span>
          </div>

          {/* Desktop Nav */}
          <ul className="nav-menu">
            {navItems.map(({ href, icon, label }) => (
              <li key={href}>
                <a
                  href={`#${href}`}
                  className={currentSection === href ? 'active' : ''}
                  aria-current={currentSection === href ? 'page' : undefined}
                >
                  <i className={`fa-solid fa-${icon}`}></i> {label}
                </a>
              </li>
            ))}
            <li>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                <i className={`fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
              </button>
            </li>
          </ul>

          {/* Mobile Menu */}
          <div className="mobile-controls">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              <i className={`fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
            </button>
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map(({ href, icon, label }) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={`fa-solid fa-${icon}`}></i>{label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-icons">
            <i className="fa-solid fa-user-secret"></i>
            <i className="fa-solid fa-shield-halved"></i>
            <i className="fa-solid fa-earth-americas"></i>
          </div>
          <h1 className="gradient-text">Anubhav Mohandas</h1>
          <p className="hero-subtitle">
            <i className="fa-solid fa-shield-virus"></i>
            Cybersecurity Researcher & Tool Developer
          </p>
          <p className="hero-role">
            <i className="fa-solid fa-location-dot"></i>
            Digital Forensics & Cyber Crime Investigation Specialist
          </p>
          <p className="hero-description">
            Passionate cybersecurity researcher and tool developer specializing in cyber crime investigation and digital forensics. 
            I love solving complex cases using advanced investigative techniques, developing security tools, and exploring innovative methodologies.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <i className="fa-solid fa-laptop-code"></i>
              View My Research
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fa-solid fa-handshake"></i>
              Get In Touch
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-user-graduate"></i>
            About Me
          </h2>
          <div className="about-content">
            <div className="about-image">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="about-text">
              <p>
                I'm a passionate cybersecurity researcher and tool developer specializing in cyber crime investigation and digital forensics. 
                My research focuses on developing innovative investigative methodologies, security tools, and techniques to solve complex 
                cyber crime cases and enhance digital evidence analysis.
              </p>
              <p>
                I love diving deep into challenging cases, building powerful security tools, and using cutting-edge techniques to uncover 
                digital evidence. When I'm not investigating cases or developing tools, I enjoy traveling and exploring new places.
              </p>
              <div className="stats">
                <div className="stat">
                  <i className="fa-solid fa-clock"></i>
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Research</div>
                </div>
                <div className="stat">
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Tools Developed</div>
                </div>
                <div className="stat">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Cases Investigated</div>
                </div>
                <div className="stat">
                  <i className="fa-solid fa-shield-virus"></i>
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Learning Mode</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="tools">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-toolbox"></i>
            Tools & Technologies
          </h2>
          <div className="tools-grid">
            {tools.map((category, i) => (
              <div key={i} className="tool-category">
                <h3>
                  <i className={`fa-solid fa-${category.icon}`}></i>
                  {category.category}
                </h3>
                <ul>
                  {category.items.map((item, j) => (
                    <li key={j}>
                      <i className={`fa-solid fa-${item.icon}`}></i>
                      <div>
                        <div className="tool-name">{item.name}</div>
                        <div className="tool-desc">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-timeline"></i>
            Research & Focus Areas
          </h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Current Focus</div>
              <h3>Cyber Crime Investigation & Tool Development</h3>
              <p className="timeline-company">Digital Forensics Research</p>
              <p>Specializing in cyber crime investigation techniques, analyzing complex digital crime cases, and developing innovative security tools and methodologies.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Active Development</div>
              <h3>Security Tool Development</h3>
              <p className="timeline-company">Open Source Projects</p>
              <p>Developing advanced forensic investigation tools including WhoisUser, Log Analyzer, Secure Gen, and Ultimate Digital Forensics Toolkit.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Specialization</div>
              <h3>Digital Evidence Analysis</h3>
              <p className="timeline-company">Cybersecurity Research</p>
              <p>Deep focus on digital evidence analysis, threat intelligence, and building tools to assist cyber crime investigators worldwide.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-rocket"></i>
            Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div 
                key={i} 
                className="project-card"
                onClick={() => window.open(project.link, '_blank')}
                role="button"
                tabIndex={0}
              >
                <div className="project-icon">
                  <i className={`fa-solid fa-${project.icon}`}></i>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, j) => (
                    <span key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            <div 
              className="project-card view-more"
              onClick={() => window.open('https://github.com/anubhavmohandas', '_blank')}
              role="button"
              tabIndex={0}
            >
              <i className="fa-brands fa-github"></i>
              <h3>View More Projects</h3>
              <p>Explore my complete collection on GitHub</p>
              <span className="arrow">→</span>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="blog">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-blog"></i>
            Latest Research & Articles
          </h2>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <div 
                key={i}
                className="blog-card"
                onClick={() => window.open(post.link, '_blank')}
                role="button"
                tabIndex={0}
              >
                <div className="blog-icon">
                  <i className={`fa-solid fa-${post.icon}`}></i>
                </div>
                <div className="blog-date">
                  <i className="fa-solid fa-calendar"></i>
                  {post.date}
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="blog-link">
                  Read Article <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            ))}
            <div 
              className="blog-card view-all"
              onClick={() => window.open('https://www.techtonichive.in/', '_blank')}
              role="button"
              tabIndex={0}
            >
              <i className="fa-solid fa-newspaper"></i>
              <h3>View All Articles</h3>
              <p>Visit Techtonic Hive for more cybersecurity research</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h2 className="section-title gradient-text">
            <i className="fa-solid fa-handshake"></i>
            Let's Connect
          </h2>
          <p className="contact-text">
            Open for collaboration on cybersecurity research and cyber crime investigation projects. Let's secure the digital world together!
          </p>
          <div className="contact-links">
            <a href="https://github.com/anubhavmohandas" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/anubhavmohandas/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/anubhavmohandas" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
              <span>Twitter</span>
            </a>
            <a href="mailto:anubhav.manav147@gmail.com">
              <i className="fa-solid fa-envelope"></i>
              <span>Email</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2025 Anubhav Mohandas. All rights reserved.</p>
        <p>Cybersecurity researcher & tool developer - Making the digital world safer, one investigation at a time.</p>
      </footer>
    </div>
  );
};

export default App;