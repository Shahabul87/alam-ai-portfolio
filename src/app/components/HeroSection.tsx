"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
    <section className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* Background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-80 pointer-events-none" />
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 pt-8 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="block">Transforming Ideas</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
                  With Artificial Intelligence
                </span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-6 text-foreground/80"
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
                    className="absolute text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 font-semibold"
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
                  className="px-8 py-3 border border-foreground/20 rounded-full font-medium transition-all hover:bg-foreground/5"
                >
                  <Link href="/contact" className="w-full h-full flex items-center justify-center">
                    Contact Me
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* 3D/Visual element */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Brain visualization */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center overflow-hidden">
                <div className="relative w-5/6 h-5/6 animate-pulse-slow">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-sm" />
                  
                  {/* Neural network nodes and connections */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white rounded-full"
                      style={{
                        width: 6 + Math.random() * 8,
                        height: 6 + Math.random() * 8,
                        top: `${10 + Math.random() * 80}%`,
                        left: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  
                  {/* Central brain core */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/80 to-purple-600/80 animate-pulse" />
                  </div>
                  
                  {/* Orbit rings */}
                  <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin-slow" />
                  <div className="absolute inset-2 rounded-full border border-purple-500/15 animate-spin-slow-reverse" />
                  <div className="absolute inset-4 rounded-full border border-pink-500/10 animate-spin-medium" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tech stack icons */}
        <motion.div
          className="flex justify-center md:justify-start gap-6 mt-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {['tensorflow', 'pytorch', 'python', 'react', 'aws'].map((tech) => (
            <div key={tech} className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
                {/* You can add actual tech icons here */}
                <span className="text-xs uppercase font-mono tracking-wider text-foreground/60">
                  {tech.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 