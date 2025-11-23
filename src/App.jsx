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
  const [konamiActive, setKonamiActive] = useState(false);
  
  const trailPositions = useRef(Array(8).fill({ x: 0, y: 0 }));
  const konamiCode = useRef([]);
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const messages = useMemo(() => ({
    home: "Welcome! I'm your cyber guide! Ready to explore?",
    about: "Discover Anubhav's cybersecurity research & tool development!",
    tools: "Check out these powerful security tools!",
    experience: "Look at this impressive research & development journey!",
    projects: "Amazing security tools and research projects ahead!",
    contact: "Ready to connect? Let's secure the world together!"
  }), []);

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
        setCharacterMood('excited');
        
        setTimeout(() => {
          setKonamiActive(false);
          setShowBubble(false);
          setCharacterMood('idle');
          konamiCode.current = [];
        }, 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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
    setBubbleMessage("Hi there! Scroll to explore Anubhav's cybersecurity research & tool development portfolio!");
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
      {/* Konami Rainbow Overlay */}
      {konamiActive && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999]"
          style={{
            animation: 'rainbowGlow 2s ease-in-out infinite',
            mixBlendMode: 'screen'
          }}
        />
      )}
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
        @keyframes rainbowGlow {
          0% { box-shadow: 0 0 50px #ff0000, 0 0 100px #ff0000, inset 0 0 50px rgba(255, 0, 0, 0.2); }
          14% { box-shadow: 0 0 50px #ff7f00, 0 0 100px #ff7f00, inset 0 0 50px rgba(255, 127, 0, 0.2); }
          28% { box-shadow: 0 0 50px #ffff00, 0 0 100px #ffff00, inset 0 0 50px rgba(255, 255, 0, 0.2); }
          42% { box-shadow: 0 0 50px #00ff00, 0 0 100px #00ff00, inset 0 0 50px rgba(0, 255, 0, 0.2); }
          56% { box-shadow: 0 0 50px #0000ff, 0 0 100px #0000ff, inset 0 0 50px rgba(0, 0, 255, 0.2); }
          70% { box-shadow: 0 0 50px #4b0082, 0 0 100px #4b0082, inset 0 0 50px rgba(75, 0, 130, 0.2); }
          84% { box-shadow: 0 0 50px #9400d3, 0 0 100px #9400d3, inset 0 0 50px rgba(148, 0, 211, 0.2); }
          100% { box-shadow: 0 0 50px #ff0000, 0 0 100px #ff0000, inset 0 0 50px rgba(255, 0, 0, 0.2); }
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
        
        /* Konami Code Rainbow Effect */
        .konami-active {
          animation: rainbowGlow 2s ease-in-out infinite !important;
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
        
        /* Mobile Improvements */
        @media (max-width: 768px) {
          .mobile-padding { padding: 1rem !important; }
          .mobile-text-sm { font-size: 0.875rem !important; }
          .mobile-text-base { font-size: 1rem !important; }
          .mobile-text-lg { font-size: 1.25rem !important; }
          .mobile-text-xl { font-size: 1.5rem !important; }
          .mobile-text-2xl { font-size: 1.75rem !important; }
          .mobile-text-3xl { font-size: 2rem !important; }
          .mobile-gap-4 { gap: 1rem !important; }
          .mobile-mb-8 { margin-bottom: 2rem !important; }
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div 
            className="text-xl md:text-2xl font-bold gradient-text cursor-pointer flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className="fas fa-user-secret text-2xl md:text-3xl" style={{ color: '#00d4ff' }}></i>
            <span className="hidden sm:inline">Anubhav Mohandas</span>
            <span className="sm:hidden">AM</span>
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
                  className={`px-3 lg:px-4 py-2 rounded-xl font-medium transition-all hover:text-cyan-400 hover:bg-cyan-400/10 flex items-center gap-2 text-sm lg:text-base ${
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
            className="md:hidden text-2xl md:text-3xl"
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
      <section id="home" className="min-h-screen flex items-center justify-center text-center px-4 md:px-6 pt-20">
        <div className="max-w-4xl">
          <div className="flex justify-center gap-4 md:gap-8 mb-6 md:mb-8">
            {[
              { icon: 'fa-user-secret', delay: '0s' },
              { icon: 'fa-shield-halved', delay: '0.5s' },
              { icon: 'fa-earth-americas', delay: '1s' }
            ].map((item, i) => (
              <i 
                key={i} 
                className={`fas ${item.icon} text-4xl md:text-6xl text-cyan-400 hover:scale-125 hover:text-white transition-transform cursor-pointer`}
                style={{ 
                  animation: 'iconFloat 4s ease-in-out infinite',
                  animationDelay: item.delay,
                  textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                }}
              />
            ))}
          </div>
          
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-4 md:mb-6"
            style={{ 
              animation: 'titleGlow 4s ease-in-out infinite alternate, iconFloat 6s ease-in-out infinite',
              willChange: 'filter, text-shadow'
            }}
          >
            Anubhav Mohandas
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-400 mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3 flex-wrap px-4" style={{ textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}>
            <i className="fas fa-shield-virus"></i>
            <span className="text-center">Cybersecurity Researcher & Tool Developer</span>
          </p>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-2 md:mb-3 flex items-center justify-center gap-2">
            <i className="fas fa-location-dot"></i>
            Digital Forensics & Cyber Crime Investigation Specialist
          </p>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
            Passionate cybersecurity researcher and tool developer specializing in cyber crime investigation and digital forensics. 
            I love solving complex cases using advanced investigative techniques, developing security tools, and exploring 
            innovative methodologies. Always learning and pushing the boundaries of what's possible in cybersecurity.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 px-4">
            <a 
              href="#projects" 
              className="relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full font-bold text-base md:text-lg shadow-[0_6px_20px_rgba(0,212,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,212,255,0.6)] hover:-translate-y-2 transition-all overflow-hidden"
              onClick={createRipple}
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <i className="fas fa-laptop-code"></i>
                View My Research
              </span>
            </a>
            <a 
              href="#contact" 
              className="relative px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-base md:text-lg hover:bg-cyan-400/10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,212,255,0.6)] transition-all"
              onClick={createRipple}
            >
              <span className="flex items-center gap-2 justify-center">
                <i className="fas fa-handshake"></i>
                Get In Touch
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text text-center mb-12 md:mb-16 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <i className="fas fa-user-graduate"></i>
            <span>About Me</span>
          </h2>
          
          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-8 md:gap-12 items-center">
            <div 
              className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-all cursor-pointer relative"
              style={{
                animation: 'imageFloat 4s ease-in-out infinite',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.6)',
                willChange: 'transform, box-shadow'
              }}
            >
              <i className="fas fa-shield-halved text-7xl md:text-8xl lg:text-9xl text-white"></i>
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
              <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                I'm a passionate cybersecurity researcher and tool developer specializing in cyber crime investigation and digital forensics. 
                My research focuses on developing innovative investigative methodologies, security tools, and techniques to solve complex 
                cyber crime cases and enhance digital evidence analysis.
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                I love diving deep into challenging cases, building powerful security tools, and using cutting-edge techniques to uncover 
                digital evidence. Always learning and exploring new approaches in cyber forensics, threat analysis, and security research. 
                When I'm not investigating cases, developing tools, or researching, I enjoy traveling and exploring new places.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: 'fa-clock', number: '5+', label: 'Years Research' },
                  { icon: 'fa-screwdriver-wrench', number: '15+', label: 'Tools Developed' },
                  { icon: 'fa-magnifying-glass-plus', number: '10+', label: 'Cases Investigated' },
                  { icon: 'fa-shield-virus', number: '24/7', label: 'Learning Mode' }
                ].map((stat, i) => (
                  <div key={i} className="glass p-4 md:p-6 rounded-2xl text-center hover-lift cursor-pointer">
                    <i className={`fas ${stat.icon} text-3xl md:text-4xl text-cyan-400 mb-2 block`}></i>
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text text-center mb-12 md:mb-16 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <i className="fas fa-toolbox"></i>
            <span>Tools & Technologies</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                category: 'Operating Systems',
                icon: 'fa-terminal',
                tools: [
                  { name: 'Kali Linux', desc: 'Primary investigation OS', icon: 'fa-linux' },
                  { name: 'Windows', desc: 'Windows forensics & analysis', icon: 'fa-windows' },
                  { name: 'Red Hat Linux', desc: 'Enterprise security testing', icon: 'fa-redhat' }
                ]
              },
              {
                category: 'Digital Forensics',
                icon: 'fa-magnifying-glass',
                tools: [
                  { name: 'Autopsy', desc: 'Digital forensics platform', icon: 'fa-microscope' },
                  { name: 'FTK', desc: 'Forensic toolkit suite', icon: 'fa-hammer' },
                  { name: 'Wireshark', desc: 'Network protocol analyzer', icon: 'fa-fish' }
                ]
              },
              {
                category: 'Penetration Testing',
                icon: 'fa-bug',
                tools: [
                  { name: 'Burp Suite', desc: 'Web security testing', icon: 'fa-crosshairs' },
                  { name: 'Metasploit', desc: 'Exploitation framework', icon: 'fa-bomb' },
                  { name: 'Nmap', desc: 'Network scanning & discovery', icon: 'fa-network-wired' }
                ]
              },
              {
                category: 'Password & Brute Force',
                icon: 'fa-key',
                tools: [
                  { name: 'Hydra', desc: 'Network login cracker', icon: 'fa-lock-open' },
                  { name: 'John the Ripper', desc: 'Password cracking tool', icon: 'fa-unlock' },
                  { name: 'SQLMap', desc: 'SQL injection automation', icon: 'fa-database' }
                ]
              },
              {
                category: 'OSINT & Reconnaissance',
                icon: 'fa-eye',
                tools: [
                  { name: 'Amass', desc: 'Network mapping & enumeration', icon: 'fa-map' },
                  { name: 'TheHarvester', desc: 'Email & subdomain discovery', icon: 'fa-envelope-open-text' },
                  { name: 'AssetFinder', desc: 'Domain & subdomain enumeration', icon: 'fa-sitemap' }
                ]
              },
              {
                category: 'SIEM & Monitoring',
                icon: 'fa-chart-line',
                tools: [
                  { name: 'Wazuh', desc: 'Security monitoring platform', icon: 'fa-shield-halved' },
                  { name: 'Sysmon', desc: 'System activity monitoring', icon: 'fa-desktop' },
                  { name: 'Splunk', desc: 'Log analysis & SIEM', icon: 'fa-chart-bar' }
                ]
              },
              {
                category: 'Malware Analysis',
                icon: 'fa-virus',
                tools: [
                  { name: 'PEStudio', desc: 'Malware initial assessment', icon: 'fa-file-code' },
                  { name: 'CFF Explorer', desc: 'PE file structure analysis', icon: 'fa-microscope' },
                  { name: 'YARA', desc: 'Malware identification', icon: 'fa-fingerprint' }
                ]
              },
              {
                category: 'Scripting & Automation',
                icon: 'fa-code',
                tools: [
                  { name: 'Python', desc: 'Security automation & scripting', icon: 'fa-python' },
                  { name: 'Bash', desc: 'Linux automation & scripting', icon: 'fa-terminal' },
                  { name: 'PowerShell', desc: 'Windows automation', icon: 'fa-file-code' }
                ]
              },
              {
                category: 'Web Application Security',
                icon: 'fa-globe',
                tools: [
                  { name: 'OWASP ZAP', desc: 'Web security scanner', icon: 'fa-spider' },
                  { name: 'Nikto', desc: 'Web server scanner', icon: 'fa-server' },
                  { name: 'DirBuster', desc: 'Directory & file bruteforcer', icon: 'fa-folder-tree' }
                ]
              }
            ].map((category, i) => (
              <div key={i} className="glass p-6 md:p-8 rounded-3xl hover-lift">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <i className={`fas ${category.icon}`}></i>
                  <span className="text-base md:text-2xl">{category.category}</span>
                </h3>
                {category.tools.map((tool, j) => (
                  <div key={j} className="bg-cyan-400/10 p-3 md:p-4 rounded-xl mb-3 md:mb-4 hover:bg-cyan-400/20 hover:translate-x-2 transition-all cursor-pointer border border-cyan-400/30 flex gap-2 md:gap-3">
                    <i className={`fas ${tool.icon} text-xl md:text-2xl text-cyan-400`}></i>
                    <div>
                      <div className="font-semibold text-white text-sm md:text-base">{tool.name}</div>
                      <div className="text-xs md:text-sm text-gray-400">{tool.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text text-center mb-12 md:mb-16 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <i className="fas fa-timeline"></i>
            <span>Research & Focus Areas</span>
          </h2>
          
          <div className="relative">
            {/* Timeline line - visible on desktop */}
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
                title: 'Cyber Crime Investigation & Tool Development',
                company: 'Digital Forensics Research',
                description: 'Specializing in cyber crime investigation techniques, analyzing complex digital crime cases, and developing innovative security tools and methodologies for evidence collection and analysis.'
              },
              {
                date: 'Active Development',
                title: 'Security Tool Development',
                company: 'Open Source Projects',
                description: 'Developing advanced forensic investigation tools including WhoisUser (OSINT framework), Log Analyzer (threat detection), Secure Gen (payload framework), and Ultimate Digital Forensics Toolkit.'
              },
              {
                date: 'Specialization',
                title: 'Digital Evidence Analysis',
                company: 'Cybersecurity Research',
                description: 'Deep focus on digital evidence analysis, threat intelligence, investigative techniques, and building tools to assist cyber crime investigators and security researchers worldwide.'
              },
              {
                date: 'Continuous Learning',
                title: 'Research & Innovation',
                company: 'Professional Growth',
                description: 'Always exploring new investigation techniques, developing cutting-edge security tools, learning advanced forensic methodologies, and staying updated with emerging cyber threats.'
              }
            ].map((item, i) => (
              <div key={i} className={`relative mb-8 md:mb-12 md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <div className="glass p-6 md:p-8 rounded-3xl hover-lift cursor-pointer relative">
                  <div className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                    <i className="fas fa-calendar-days"></i>
                    {item.date}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                    <i className="fas fa-magnifying-glass"></i>
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-blue-400 font-medium mb-3 md:mb-4 text-sm md:text-base">{item.company}</p>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text text-center mb-12 md:mb-16 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <i className="fas fa-rocket"></i>
            <span>Featured Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: 'fa-toolbox',
                title: 'Ultimate Digital Forensics Toolkit',
                description: 'Comprehensive all-in-one digital forensics toolkit featuring multiple investigation tools, evidence collection utilities, and analysis capabilities for cyber crime investigation.',
                tags: ['Digital Forensics', 'Investigation', 'Evidence Analysis', 'All-in-One'],
                link: 'https://github.com/anubhavmohandas/Ultimate-Digital-Forensics-Toolkit'
              },
              {
                icon: 'fa-user-secret',
                title: 'WhoisUser - OSINT Framework',
                description: 'Professional username enumeration and OSINT investigation framework. Automated username discovery across 100+ platforms with intelligent result merging and forensic tools.',
                tags: ['OSINT', 'Username Enumeration', 'Investigation', 'Multi-Platform'],
                link: 'https://github.com/anubhavmohandas/whoisuser'
              },
              {
                icon: 'fa-chart-line',
                title: 'Log Analyzer - Threat Detection',
                description: 'Security log analysis tool with automated threat detection, IP intelligence with geolocation, and support for multiple log formats including firewalls, systems, and web servers.',
                tags: ['Log Analysis', 'Threat Detection', 'IP Intelligence', 'Security'],
                link: 'https://github.com/anubhavmohandas/log-analyzer'
              },
              {
                icon: 'fa-bomb',
                title: 'Secure Gen - Payload Framework',
                description: 'Advanced security payload generation framework for ethical hacking. Features 15+ payload types, intelligent mutation techniques, and database-specific attack vectors.',
                tags: ['Payload Generation', 'Ethical Hacking', 'Security Testing', 'WAF Bypass'],
                link: 'https://github.com/anubhavmohandas/secure_gen'
              },
              {
                icon: 'fa-search',
                title: 'Recon Scanner',
                description: 'Advanced reconnaissance tool designed for cybersecurity researchers to perform comprehensive security assessments and network reconnaissance.',
                tags: ['Python', 'Network Security', 'Reconnaissance', 'OSINT'],
                link: 'https://github.com/anubhavmohandas/recon_scanner'
              },

              {
                icon: 'fa-shield-virus',
                title: 'SIEM Kernel Exploit Detection',
                description: 'Security Information and Event Management system specialized in detecting kernel-level exploits and advanced persistent threats in real-time.',
                tags: ['SIEM', 'Exploit Detection', 'Kernel Security', 'APT'],
                link: 'https://github.com/anubhavmohandas/siem-kernel-exploit-detection'
              },
              {
                icon: 'fa-calculator',
                title: 'Enhanced CVSS Calculator',
                description: 'Advanced Common Vulnerability Scoring System calculator with enhanced features for accurate vulnerability assessment and risk management.',
                tags: ['CVSS', 'Vulnerability Assessment', 'Risk Management'],
                link: 'https://github.com/anubhavmohandas/Enhanced-CVSS-Calculator'
              },
              {
                icon: 'fa-user-shield',
                title: 'AuthGuard',
                description: 'Robust authentication and authorization security system designed to protect applications from unauthorized access with multi-layer security.',
                tags: ['Authentication', 'Authorization', 'Access Control'],
                link: 'https://github.com/anubhavmohandas/AuthGuard'
              },
              {
                icon: 'fa-robot',
                title: 'Jerry - Personalized Virtual AI',
                description: 'Advanced personalized virtual AI assistant designed to provide intelligent automation, personalized interactions, and smart task management.',
                tags: ['AI Assistant', 'Machine Learning', 'Automation'],
                link: 'https://github.com/anubhavmohandas/Jerry'
              },
              {
                icon: 'fa-file-alt',
                title: 'Nyxine - AI Resume Maker',
                description: 'Smart, AI-powered resume builder with privacy focus. Features ATS optimization, job description matching, and authentic experience highlighting without fluff.',
                tags: ['AI', 'Resume Builder', 'ATS Optimization', 'Privacy-First'],
                link: 'https://github.com/anubhavmohandas/Nyxine-Resume-Maker'
              },
              {
                icon: 'fa-earth-americas',
                title: 'Web Detection System',
                description: 'Advanced web-based detection system for identifying security threats, malicious activities, and anomalous behavior in real-time web traffic.',
                tags: ['Web Security', 'Threat Detection', 'Anomaly Detection'],
                link: 'https://github.com/anubhavmohandas/web_detection'
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer group relative"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="p-6 md:p-8 text-center bg-gradient-to-br from-cyan-400/10 to-purple-600/10 group-hover:scale-110 transition-transform">
                  <i className={`fas ${project.icon} text-5xl md:text-6xl text-cyan-400`}></i>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-kit-medical"></i>
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed group-hover:text-white transition-colors text-sm md:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span 
                        key={j} 
                        className="bg-cyan-400/20 text-cyan-400 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm border border-cyan-400/30 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer flex items-center gap-1"
                      >
                        <i className="fas fa-fingerprint"></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* View More Projects Box */}
            <div 
              className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer group relative flex items-center justify-center min-h-[400px]"
              onClick={() => window.open('https://github.com/anubhavmohandas', '_blank')}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="text-center p-8">
                <i className="fab fa-github text-8xl md:text-9xl text-cyan-400 mb-6 block group-hover:scale-110 transition-transform"></i>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                  View More Projects
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors text-lg">
                  Explore my complete collection of security tools, research projects, and open-source contributions
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-400 font-medium text-lg">
                  <span>Visit GitHub Profile</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold gradient-text mb-6 md:mb-8 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <i className="fas fa-handshake"></i>
            <span>Let's Connect</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed px-4">
            Open for collaboration on cybersecurity research and cyber crime investigation projects. Let's secure the digital world together!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                className="glass p-4 md:p-6 rounded-2xl hover-lift flex flex-col items-center gap-2 md:gap-3 group"
              >
                <i className={`fab ${contact.icon} text-3xl md:text-4xl text-cyan-400 group-hover:scale-125 transition-transform`}></i>
                <span className="font-medium group-hover:text-cyan-400 transition-colors text-sm md:text-base">{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 md:py-8 px-4 md:px-6 border-t border-cyan-400/20">
        <p className="text-gray-400 mb-2 text-sm md:text-base">© 2025 Anubhav Mohandas. All rights reserved.</p>
        <p className="text-gray-500 text-sm md:text-base">Cybersecurity researcher & tool developer - Making the digital world safer, one investigation at a time.</p>
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