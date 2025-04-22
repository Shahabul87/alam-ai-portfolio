"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SimpleAIVisualization from './SimpleAIVisualization';

const technologies = [
  "Machine Learning", "Neural Networks", "Computer Vision", 
  "NLP", "Deep Learning", "Transformers", "LLMs", 
  "GPT", "TensorFlow", "PyTorch", "Data Science"
];

export default function HeroSection() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Floating particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.9;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      opacityChange: number;
    }[] = [];
    
    const colors = ['#4F46E5', '#7C3AED', '#EC4899', '#3B82F6', '#8B5CF6'];
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 5 + 1;
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
        opacityChange: Math.random() * 0.01 * (Math.random() > 0.5 ? 1 : -1)
      });
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle) => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update opacity
        particle.opacity += particle.opacityChange;
        
        // Reverse opacity change if needed
        if (particle.opacity > 0.6 || particle.opacity < 0.1) {
          particle.opacityChange = -particle.opacityChange;
        }
        
        // Handle boundaries
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Technology text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center w-full bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-40 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute top-[30%] -left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[10%] right-[20%] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
      
      {/* Background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
      
      {/* Content container - Full width with responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 z-20 pt-8 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-screen-2xl mx-auto">
          {/* Text content */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="block text-slate-100">Transforming Ideas</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 glow-purple">
                  With Artificial Intelligence
                </span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-6 text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                AI Engineer specializing in{" "}
                <span key={currentTechIndex} className="relative inline-block">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-semibold glow-blue"
                  >
                    {technologies[currentTechIndex]}
                  </motion.span>
                  <span className="opacity-0">
                    {technologies[currentTechIndex]}
                  </span>
                </span>
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  <Link href="/projects" className="w-full h-full flex items-center justify-center">
                    View Projects
                  </Link>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-slate-500/30 rounded-full font-medium transition-all hover:bg-slate-700/30 text-slate-300"
                >
                  <Link href="/contact" className="w-full h-full flex items-center justify-center">
                    Contact Me
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* 3D Neural Network Visualization */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full h-[350px] md:h-[500px] max-w-[550px] animate-tensor-float">
              {/* Neural Network Visualization */}
              <div className="absolute inset-0 w-full h-full tensor-container">
                <SimpleAIVisualization />
              </div>
              
              {/* Floating badges/labels */}
              <div className="absolute top-4 left-4 z-10 bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-indigo-500/30 animate-tensor-pulse">
                Neural Networks
              </div>
              
              <div className="absolute bottom-4 right-4 z-10 bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-purple-500/30 animate-tensor-pulse" style={{ animationDelay: '1s' }}>
                Deep Learning
              </div>
              
              {/* Additional floating badge */}
              <div className="absolute top-4 right-4 z-10 bg-slate-900/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-pink-500/30 animate-tensor-pulse" style={{ animationDelay: '0.5s' }}>
                AI Models
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tech stack icons */}
        <motion.div
          className="flex justify-center md:justify-start gap-4 md:gap-6 mt-12 flex-wrap max-w-screen-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {['tensorflow', 'pytorch', 'python', 'react', 'aws'].map((tech) => (
            <div key={tech} className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/70 transition-colors border border-slate-700/50">
                <span className="text-xl">{getTechIcon(tech)}</span>
              </div>
              <span className="text-xs text-slate-400 mt-2 capitalize">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get tech stack icons
function getTechIcon(tech: string) {
  switch (tech) {
    case 'tensorflow':
      return '🧠';
    case 'pytorch':
      return '🔥';
    case 'python':
      return '🐍';
    case 'react':
      return '⚛️';
    case 'aws':
      return '☁️';
    default:
      return '🔧';
  }
} 