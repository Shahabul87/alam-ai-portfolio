"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Research', href: '/research' },
  { name: 'Publications', href: '/publications' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Neural network particle effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: { x: number; y: number; size: number; vx: number; vy: number }[] = [];
    let animationFrameId: number;
    
    const resizeCanvas = () => {
      if (!canvas || !headerRef.current) return;
      canvas.width = headerRef.current.offsetWidth;
      canvas.height = headerRef.current.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width / 15);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set color based on theme
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      ctx.fillStyle = isDarkMode ? 'rgba(237, 237, 237, 0.5)' : 'rgba(23, 23, 23, 0.5)';
      ctx.strokeStyle = isDarkMode ? 'rgba(237, 237, 237, 0.2)' : 'rgba(23, 23, 23, 0.2)';
      
      // Draw particles
      particles.forEach((particle, i) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      ref={headerRef}
      className={`relative w-full transition-all duration-300 ${
        scrollY > 50 ? 'py-3 bg-opacity-90 backdrop-blur-md' : 'py-5'
      }`}
      style={{
        backgroundColor: `var(--background)`,
        boxShadow: scrollY > 50 ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="container mx-auto px-4 flex justify-between items-center z-10 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg transform rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
              AI
            </div>
          </div>
          <span className="text-xl font-semibold tracking-tight font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Alam
            </span>
            <span className="text-foreground">.dev</span>
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-semibold' 
                    : 'text-foreground hover:text-blue-500'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
              isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
              isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute left-0 right-0 z-20 transition-all duration-300 ease-in-out backdrop-blur-md ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 visible py-4'
            : 'max-h-0 opacity-0 invisible py-0 overflow-hidden'
        }`}
        style={{
          backgroundColor: `var(--background)`,
          boxShadow: isMenuOpen ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          top: scrollY > 50 ? '61px' : '77px'
        }}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`py-2 text-sm font-medium ${
                  isActive 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-semibold' 
                    : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
} 