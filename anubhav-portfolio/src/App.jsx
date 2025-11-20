import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [characterMood, setCharacterMood] = useState('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCharacter, setShowCharacter] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const trailPositions = useRef(Array(8).fill({ x: 0, y: 0 }));

  const messages = useMemo(() => ({
    home: "Welcome! I'm your cyber guide! Ready to explore?",
    about: "Discover Anubhav's cybersecurity expertise!",
    tools: "Check out these amazing security tools!",
    experience: "Look at this impressive journey in security!",
    projects: "Amazing security projects and tools ahead!",
    contact: "Ready to connect? Let's secure the world together!"
  }), []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setShowCharacter(window.innerWidth > 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll detection
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking
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

  // Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setCurrentSection(entry.target.id);
          if (messages[entry.target.id]) {
            setBubbleMessage(messages[entry.target.id]);
            setShowBubble(true);
            setCharacterMood('excited');
            setTimeout(() => {
              setShowBubble(false);
              setCharacterMood('idle');
            }, 4000);
          }
        }
      });
    }, observerOptions);
    
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [messages]);

  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    Object.assign(circle.style, {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${event.clientX - rect.left - radius}px`,
      top: `${event.clientY - rect.top - radius}px`,
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(0, 212, 255, 0.3)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s ease-out',
      pointerEvents: 'none'
    });
    
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) existingRipple.remove();
    
    circle.className = 'ripple-effect';
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }, []);

  const handleCharacterClick = useCallback(() => {
    setBubbleMessage("Hi there! Scroll to explore Anubhav's amazing cybersecurity portfolio!");
    setShowBubble(true);
    setCharacterMood('excited');
    setTimeout(() => {
      setShowBubble(false);
      setCharacterMood('idle');
    }, 5000);
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      <style>{`
        /* Advanced Animations from Original CSS */
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-40px) translateX(20px) rotate(90deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) translateX(-15px) rotate(180deg);
            opacity: 1;
          }
          75% { 
            transform: translateY(-50px) translateX(10px) rotate(270deg);
            opacity: 0.6;
          }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes titleGlow {
          0% { 
            filter: brightness(1);
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
          }
          100% { 
            filter: brightness(1.2);
            text-shadow: 0 0 40px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.4);
          }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes backgroundShift {
          0%, 100% { 
            background: radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(102, 0, 255, 0.1) 0%, transparent 50%),
                        #0a0a0a;
          }
          25% {
            background: radial-gradient(circle at 80% 30%, rgba(255, 107, 107, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 30% 70%, rgba(0, 212, 255, 0.12) 0%, transparent 50%),
                        #0a0a0a;
          }
          50% {
            background: radial-gradient(circle at 40% 20%, rgba(102, 0, 255, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(0, 255, 127, 0.08) 0%, transparent 50%),
                        #0a0a0a;
          }
          75% {
            background: radial-gradient(circle at 10% 40%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 90% 60%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                        #0a0a0a;
          }
        }
        @keyframes characterIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes characterExcited {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        @keyframes bodyBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes headBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes eyeBlink {
          0%, 85%, 100% { transform: scaleY(1); }
          90%, 95% { transform: scaleY(0.1); }
        }
        @keyframes armWave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes legWalk {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes timelinePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
          50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.3); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #6600ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass {
          background: rgba(26, 26, 26, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 212, 255, 0.2);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .hover-lift:hover {
          transform: translateY(-15px) rotateX(8deg);
          box-shadow: 0 25px 60px rgba(0, 212, 255, 0.3);
        }
        
        body { cursor: none; }
        @media (max-width: 768px) { 
          body { cursor: auto; }
        }
        
        /* Character Guide Styles */
        .character-guide {
          animation: characterIdle 3s ease-in-out infinite;
        }
        .character-guide.excited {
          animation: characterExcited 0.6s ease-in-out 3;
        }
        .character-body {
          animation: bodyBreathe 3s ease-in-out infinite;
        }
        .character-head {
          animation: headBob 2.5s ease-in-out infinite;
        }
        .character-eye {
          animation: eyeBlink 5s infinite;
        }
        .character-arm-left {
          animation: armWave 3s ease-in-out infinite;
        }
        .character-arm-right {
          animation: armWave 3s ease-in-out infinite 0.5s;
        }
        .character-leg-left {
          animation: legWalk 1.2s ease-in-out infinite;
        }
        .character-leg-right {
          animation: legWalk 1.2s ease-in-out infinite 0.6s;
        }
      `}</style>

      {/* Custom Cursor - Desktop Only */}
      {typeof window !== 'undefined' && window.innerWidth > 768 && (
        <>
          <div 
            className="fixed w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-screen"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform'
            }}
          />
          {trailPositions.current.map((pos, i) => (
            <div
              key={i}
              className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                background: '#00d4ff',
                opacity: (1 - i / 8) * 0.8,
                transform: `translate(-50%, -50%) scale(${1 - i / 8})`,
                boxShadow: '0 0 15px #00d4ff',
                willChange: 'transform'
              }}
            />
          ))}
        </>
      )}

      {/* Animated Background */}
      <div className="fixed inset-0 z-[-1]" style={{ animation: 'backgroundShift 20s ease-in-out infinite' }}>
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[#00d4ff]"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: 'floatParticle 8s ease-in-out infinite',
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                opacity: 0.4,
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </div>
      </div>

      {/* Character Guide - Enhanced from Original HTML */}
      {showCharacter && (
        <div 
          className={`character-guide ${characterMood} fixed bottom-8 right-8 w-[90px] h-[110px] z-[1500] cursor-pointer`}
          onClick={handleCharacterClick}
        >
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Character Head */}
            <div 
              className="character-head absolute w-10 h-10 rounded-full top-1 left-[25px] shadow-lg border-2 border-cyan-400/30"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #f8f8f8, #e0e0e0)',
                boxShadow: '0 3px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Eyes */}
              <div className="absolute top-[14px] left-[10px] w-5 h-2.5">
                <div className="character-eye absolute w-[7px] h-[7px] bg-gray-800 rounded-full left-[2px]" />
                <div className="character-eye absolute w-[7px] h-[7px] bg-gray-800 rounded-full right-[2px]" />
              </div>
              {/* Smile */}
              <div 
                className="absolute top-[25px] left-[13px] w-[14px] h-[7px] border-2 border-gray-800 border-t-0 rounded-b-full"
              />
            </div>
            
            {/* Character Body */}
            <div 
              className="character-body absolute w-[45px] h-[55px] rounded-[25px_25px_18px_18px] top-7 left-[22px]"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0066ff, #6600ff)',
                boxShadow: '0 0 25px rgba(0, 212, 255, 0.4)'
              }}
            />
            
            {/* Arms */}
            <div 
              className="character-arm-left absolute w-[18px] h-[5px] rounded-xl top-10 left-[10px]"
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #0066ff)',
                transformOrigin: 'right center'
              }}
            />
            <div 
              className="character-arm-right absolute w-[18px] h-[5px] rounded-xl top-10 right-[10px]"
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #0066ff)',
                transformOrigin: 'left center'
              }}
            />
            
            {/* Legs */}
            <div 
              className="character-leg-left absolute w-2 h-6 rounded bottom-0.5 left-[30px]"
              style={{
                background: 'linear-gradient(180deg, #00d4ff, #0066ff)'
              }}
            />
            <div 
              className="character-leg-right absolute w-2 h-6 rounded bottom-0.5 right-[30px]"
              style={{
                background: 'linear-gradient(180deg, #00d4ff, #0066ff)'
              }}
            />
          </div>
          
          {/* Speech Bubble */}
          <div 
            className={`absolute bottom-32 -left-20 glass text-white px-5 py-4 rounded-3xl border-2 border-cyan-400 text-sm font-medium max-w-56 text-center z-[1600] shadow-[0_10px_30px_rgba(0,212,255,0.3)] transition-all duration-500 ${
              showBubble ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-80'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            {bubbleMessage}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-cyan-400" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-[0_4px_30px_rgba(0,212,255,0.25)] border-b border-cyan-400/40' 
          : 'bg-black/95 border-b border-cyan-400/15'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-2xl font-bold gradient-text cursor-pointer flex items-center gap-3 hover:scale-105 transition-transform"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className="fas fa-user-secret text-3xl" style={{ color: '#00d4ff' }}></i>
            Anubhav Mohandas
          </div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-2">
            {[
              { href: 'home', icon: 'fa-house', label: 'Home' },
              { href: 'about', icon: 'fa-user', label: 'About' },
              { href: 'tools', icon: 'fa-wrench', label: 'Tools' },
              { href: 'experience', icon: 'fa-briefcase', label: 'Experience' },
              { href: 'projects', icon: 'fa-code', label: 'Projects' },
              { href: 'contact', icon: 'fa-envelope', label: 'Contact' }
            ].map(({ href, icon, label }) => (
              <li key={href}>
                <a
                  href={`#${href}`}
                  className={`px-4 py-2 rounded-xl font-medium transition-all hover:text-cyan-400 hover:bg-cyan-400/10 flex items-center gap-2 ${
                    currentSection === href ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' : 'border border-transparent'
                  }`}
                >
                  <i className={`fas ${icon}`}></i> {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-cyan-400/20" style={{ animation: 'slideIn 0.3s ease' }}>
            {[
              { href: 'home', icon: 'fa-house', label: 'Home' },
              { href: 'about', icon: 'fa-user', label: 'About' },
              { href: 'tools', icon: 'fa-wrench', label: 'Tools' },
              { href: 'experience', icon: 'fa-briefcase', label: 'Experience' },
              { href: 'projects', icon: 'fa-code', label: 'Projects' },
              { href: 'contact', icon: 'fa-envelope', label: 'Contact' }
            ].map(({ href, icon, label }) => (
              <a
                key={href}
                href={`#${href}`}
                className="block px-6 py-3 hover:bg-cyan-400/10 transition-colors border-b border-cyan-400/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={`fas ${icon} mr-3`}></i>{label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-20">
        <div className="max-w-4xl">
          <div className="flex justify-center gap-8 mb-8">
            {[
              { icon: 'fa-user-secret', delay: '0s' },
              { icon: 'fa-shield-halved', delay: '0.5s' },
              { icon: 'fa-earth-americas', delay: '1s' }
            ].map((item, i) => (
              <i 
                key={i} 
                className={`fas ${item.icon} text-6xl text-cyan-400 hover:scale-125 hover:text-white transition-transform cursor-pointer`}
                style={{ 
                  animation: 'iconFloat 4s ease-in-out infinite',
                  animationDelay: item.delay,
                  textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                }}
              />
            ))}
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold gradient-text mb-6"
            style={{ 
              animation: 'titleGlow 4s ease-in-out infinite alternate, iconFloat 6s ease-in-out infinite',
              willChange: 'filter, text-shadow'
            }}
          >
            Anubhav Mohandas
          </h1>
          
          <p className="text-2xl md:text-3xl text-cyan-400 mb-4 flex items-center justify-center gap-3" style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>
            <i className="fas fa-shield-virus"></i>
            Cybersecurity Professional & Digital Forensics Specialist
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-3 flex items-center justify-center gap-2">
            <i className="fas fa-location-dot"></i>
            Making the Digital World Safer
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Passionate about making the digital world safer through cyber forensics research, 
            threat analysis, and innovative security solutions. Driven by curiosity and committed 
            to excellence in cybersecurity.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#projects" 
              className="relative px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-bold text-lg shadow-[0_6px_20px_rgba(0,212,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,212,255,0.6)] hover:-translate-y-2 transition-all overflow-hidden"
              onClick={createRipple}
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-laptop-code"></i>
                View My Work
              </span>
            </a>
            <a 
              href="#contact" 
              className="relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-lg hover:bg-cyan-400/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,212,255,0.6)] transition-all"
              onClick={createRipple}
            >
              <span className="flex items-center gap-2">
                <i className="fas fa-handshake"></i>
                Get In Touch
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16 flex items-center justify-center gap-4">
            <i className="fas fa-user-graduate"></i>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-[350px_1fr] gap-12 items-center">
            <div 
              className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all cursor-pointer relative"
              style={{
                animation: 'imageFloat 4s ease-in-out infinite',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.6)',
                willChange: 'transform, box-shadow'
              }}
            >
              <i className="fas fa-shield-halved text-9xl text-white"></i>
              <div 
                className="absolute -inset-4 rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff, #0066ff, #ff6b6b, #00d4ff)',
                  animation: 'spin 8s linear infinite',
                  zIndex: -1
                }}
              />
            </div>
            
            <div>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                I'm a passionate cybersecurity professional specializing in cyber forensics and digital investigations. 
                My journey in cybersecurity is driven by curiosity and a commitment to making the digital world safer. 
                I focus on cyber forensics research, investigative methodologies, and developing innovative security tools.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                When I'm not diving deep into code or analyzing security threats, I love traveling and exploring new places. 
                I'm always learning and staying updated with the latest cybersecurity trends and techniques.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: 'fa-clock', number: '5+', label: 'Years Experience' },
                  { icon: 'fa-screwdriver-wrench', number: '50+', label: 'Security Tools' },
                  { icon: 'fa-magnifying-glass-plus', number: '10+', label: 'Cases Analyzed' },
                  { icon: 'fa-shield-virus', number: '24/7', label: 'Security Focus' }
                ].map((stat, i) => (
                  <div key={i} className="glass p-6 rounded-2xl text-center hover-lift cursor-pointer">
                    <i className={`fas ${stat.icon} text-4xl text-cyan-400 mb-2 block`}></i>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16 flex items-center justify-center gap-4">
            <i className="fas fa-toolbox"></i>
            Tools & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'Operating Systems & Platforms',
                icon: 'fa-terminal',
                tools: [
                  { name: 'Kali Linux', desc: 'Primary penetration testing OS', icon: 'fa-linux' },
                  { name: 'Windows', desc: 'Windows security & forensics', icon: 'fa-windows' },
                  { name: 'Ubuntu Server', desc: 'Linux server administration', icon: 'fa-ubuntu' }
                ]
              },
              {
                category: 'Digital Forensics Tools',
                icon: 'fa-magnifying-glass',
                tools: [
                  { name: 'Autopsy', desc: 'Digital forensics investigation', icon: 'fa-microscope' },
                  { name: 'FTK', desc: 'Computer forensics software', icon: 'fa-hammer' },
                  { name: 'EnCase', desc: 'Digital investigation suite', icon: 'fa-hard-drive' }
                ]
              },
              {
                category: 'Penetration Testing',
                icon: 'fa-bug',
                tools: [
                  { name: 'Burp Suite', desc: 'Web application security', icon: 'fa-crosshairs' },
                  { name: 'Metasploit', desc: 'Exploitation framework', icon: 'fa-bomb' },
                  { name: 'Nmap', desc: 'Network discovery', icon: 'fa-network-wired' }
                ]
              },
              {
                category: 'Network Analysis',
                icon: 'fa-eye',
                tools: [
                  { name: 'Wireshark', desc: 'Network protocol analyzer', icon: 'fa-fish' },
                  { name: 'tcpdump', desc: 'Packet analyzer', icon: 'fa-ethernet' },
                  { name: 'NetworkMiner', desc: 'Network forensic tool', icon: 'fa-chart-line' }
                ]
              },
              {
                category: 'Development & Scripting',
                icon: 'fa-code',
                tools: [
                  { name: 'Python', desc: 'Security automation', icon: 'fa-python' },
                  { name: 'Bash', desc: 'Linux automation', icon: 'fa-terminal' },
                  { name: 'PowerShell', desc: 'Windows automation', icon: 'fa-file-code' }
                ]
              },
              {
                category: 'Security & Analysis',
                icon: 'fa-shield-virus',
                tools: [
                  { name: 'YARA', desc: 'Malware identification', icon: 'fa-virus' },
                  { name: 'OWASP ZAP', desc: 'Web security scanner', icon: 'fa-magnifying-glass' },
                  { name: 'Splunk', desc: 'SIEM platform', icon: 'fa-database' }
                ]
              }
            ].map((category, i) => (
              <div key={i} className="glass p-8 rounded-3xl hover-lift">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                  <i className={`fas ${category.icon}`}></i>
                  {category.category}
                </h3>
                {category.tools.map((tool, j) => (
                  <div key={j} className="bg-cyan-400/10 p-4 rounded-xl mb-4 hover:bg-cyan-400/20 hover:translate-x-2 transition-all cursor-pointer border border-cyan-400/30 flex gap-3">
                    <i className={`fas ${tool.icon} text-2xl text-cyan-400`}></i>
                    <div>
                      <div className="font-semibold text-white">{tool.name}</div>
                      <div className="text-sm text-gray-400">{tool.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16 flex items-center justify-center gap-4">
            <i className="fas fa-timeline"></i>
            Experience & Focus Areas
          </h2>
          
          <div className="relative">
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full hidden md:block"
              style={{ 
                animation: 'timelinePulse 3s ease-in-out infinite',
                transform: 'translateX(-50%)'
              }}
            />
            
            {[
              {
                date: 'Current Focus',
                title: 'Cyber Forensics Research',
                company: 'Digital Investigations & Security Research',
                description: 'Focusing on advanced cyber forensics research and developing innovative investigative methodologies to enhance digital crime detection and analysis.'
              },
              {
                date: 'Active Development',
                title: 'Security Tool Development',
                company: 'Open Source Projects',
                description: 'Created recon_scanner and other security utilities to assist cybersecurity professionals in reconnaissance and threat assessment activities.'
              },
              {
                date: 'Specialization',
                title: 'Digital Forensics & Threat Analysis',
                company: 'Cybersecurity Research',
                description: 'Specializing in comprehensive threat analysis, security reconnaissance, and investigative methodologies.'
              },
              {
                date: 'Personal Interest',
                title: 'Continuous Learning & Travel',
                company: 'Professional Development',
                description: 'Love traveling and exploring new places when not diving deep into code or analyzing security threats.'
              }
            ].map((item, i) => (
              <div key={i} className={`relative mb-12 md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <div className="glass p-8 rounded-3xl hover-lift cursor-pointer relative">
                  <div 
                    className="absolute top-1/2 w-6 h-6 rounded-full bg-cyan-400 border-4 border-[#0a0a0a] shadow-[0_0_20px_rgba(0,212,255,0.5)] hidden md:block"
                    style={{
                      [i % 2 === 0 ? 'right' : 'left']: '-65px',
                      transform: 'translateY(-50%)'
                    }}
                  />
                  <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                    <i className="fas fa-calendar-days"></i>
                    {item.date}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <i className="fas fa-magnifying-glass"></i>
                    {item.title}
                  </h3>
                  <p className="text-blue-400 font-medium mb-4">{item.company}</p>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16 flex items-center justify-center gap-4">
            <i className="fas fa-rocket"></i>
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-toolbox',
                title: 'Ultimate Digital Forensics Toolkit',
                description: 'Comprehensive all-in-one digital forensics toolkit featuring multiple investigation tools, evidence collection utilities, and analysis capabilities.',
                tags: ['Digital Forensics', 'Investigation', 'Evidence Analysis', 'All-in-One'],
                link: 'https://github.com/anubhavmohandas/Ultimate-Digital-Forensics-Toolkit'
              },
              {
                icon: 'fa-search',
                title: 'Recon Scanner',
                description: 'Advanced reconnaissance tool designed for cybersecurity professionals to perform comprehensive security assessments.',
                tags: ['Python', 'Network Security', 'Reconnaissance', 'OSINT'],
                link: 'https://github.com/anubhavmohandas/recon_scanner'
              },
              {
                icon: 'fa-shield-virus',
                title: 'SIEM Kernel Exploit Detection',
                description: 'Security Information and Event Management system specialized in detecting kernel-level exploits and advanced persistent threats.',
                tags: ['SIEM', 'Exploit Detection', 'Kernel Security', 'APT'],
                link: 'https://github.com/anubhavmohandas/siem-kernel-exploit-detection'
              },
              {
                icon: 'fa-calculator',
                title: 'Enhanced CVSS Calculator',
                description: 'Advanced Common Vulnerability Scoring System calculator with enhanced features for accurate vulnerability assessment.',
                tags: ['CVSS', 'Vulnerability Assessment', 'Risk Management'],
                link: 'https://github.com/anubhavmohandas/Enhanced-CVSS-Calculator'
              },
              {
                icon: 'fa-user-shield',
                title: 'AuthGuard',
                description: 'Robust authentication and authorization security system designed to protect applications from unauthorized access.',
                tags: ['Authentication', 'Authorization', 'Access Control'],
                link: 'https://github.com/anubhavmohandas/AuthGuard'
              },
              {
                icon: 'fa-robot',
                title: 'Jerry - Personalized Virtual AI',
                description: 'Advanced personalized virtual AI assistant designed to provide intelligent automation and personalized interactions.',
                tags: ['AI Assistant', 'Machine Learning', 'Automation'],
                link: 'https://github.com/anubhavmohandas/Jerry'
              },
              {
                icon: 'fa-earth-americas',
                title: 'Web Detection System',
                description: 'Advanced web-based detection system for identifying security threats, malicious activities, and anomalous behavior.',
                tags: ['Web Security', 'Threat Detection', 'Anomaly Detection'],
                link: 'https://github.com/anubhavmohandas/web_detection'
              },
              {
                icon: 'fa-key',
                title: 'Password Strength Checker',
                description: 'Comprehensive password strength evaluation tool that analyzes password security and provides recommendations.',
                tags: ['Password Security', 'Security Assessment'],
                link: 'https://github.com/anubhavmohandas/password_strength_checker'
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer group relative"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="p-8 text-center bg-gradient-to-br from-cyan-400/10 to-purple-600/10 group-hover:scale-110 transition-transform">
                  <i className={`fas ${project.icon} text-6xl text-cyan-400`}></i>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-kit-medical"></i>
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span 
                        key={j} 
                        className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-400/30 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer flex items-center gap-1"
                      >
                        <i className="fas fa-fingerprint"></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8 flex items-center justify-center gap-4">
            <i className="fas fa-handshake"></i>
            Let's Connect
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Open for collaboration on cybersecurity projects. Let's secure the digital world together!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'fa-github', label: 'GitHub', link: 'https://github.com/anubhavmohandas' },
              { icon: 'fa-linkedin', label: 'LinkedIn', link: 'https://www.linkedin.com/in/anubhavmohandas/' },
              { icon: 'fa-twitter', label: 'Twitter', link: 'https://x.com/anubhavmohandas' },
              { icon: 'fa-envelope', label: 'Email', link: 'mailto:anubhav.manav147@gmail.com' }
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-2xl hover-lift flex flex-col items-center gap-3 group"
              >
                <i className={`fab ${contact.icon} text-4xl text-cyan-400 group-hover:scale-125 transition-transform`}></i>
                <span className="font-medium group-hover:text-cyan-400 transition-colors">{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 px-6 border-t border-cyan-400/20">
        <p className="text-gray-400 mb-2">© 2025 Anubhav Mohandas. All rights reserved.</p>
        <p className="text-gray-500">Making the digital world safer, one line of code at a time.</p>
      </footer>
      
      {/* Spin animation for about image */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;