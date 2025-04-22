"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

// Skill categories with proficiency levels
const skillCategories = [
  {
    name: "Generative Models",
    skills: [
      { name: "GPT-3/4", level: 95 },
      { name: "GPT Neo", level: 90 },
      { name: "T5", level: 85 },
      { name: "BART", level: 88 },
      { name: "Vision & Audio Diffusion", level: 92 },
    ],
    icon: "🧠",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Deep Learning Frameworks",
    skills: [
      { name: "PyTorch", level: 98 },
      { name: "Hugging Face Transformers", level: 95 },
    ],
    icon: "🔥",
    color: "from-indigo-600 to-purple-600",
  },
  {
    name: "Scalable Training",
    skills: [
      { name: "DDP", level: 92 },
      { name: "ZeRO-Offload", level: 88 },
      { name: "FlashAttention", level: 90 },
      { name: "Multihead Latent Attention", level: 86 },
      { name: "CUDA", level: 85 },
      { name: "Mixed Precision (AMP)", level: 94 },
    ],
    icon: "⚡",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Reinforcement Learning",
    skills: [
      { name: "PPO", level: 88 },
      { name: "GRPO", level: 85 },
      { name: "RLHF", level: 92 },
      { name: "Multi-agent Systems", level: 86 },
    ],
    icon: "🤖",
    color: "from-indigo-600 to-purple-600",
  },
  {
    name: "Data Engineering",
    skills: [
      { name: "Tiktoken Tokenization", level: 90 },
      { name: "Uint16 Sharding", level: 88 },
      { name: "Streaming Pipelines", level: 92 },
    ],
    icon: "📊",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS SageMaker", level: 86 },
      { name: "GCP AI Platform", level: 84 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 88 },
      { name: "GitOps", level: 85 },
    ],
    icon: "☁️",
    color: "from-indigo-600 to-purple-600",
  },
  {
    name: "Full Stack Dev",
    skills: [
      { name: "Next.js", level: 94 },
      { name: "React", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Prisma", level: 85 },
      { name: "REST APIs", level: 92 },
    ],
    icon: "💻",
    color: "from-blue-600 to-indigo-600",
  },
];

// Research experience data
const researchExperience = [
  {
    title: "Graduate Research Assistant",
    organization: "University of Nevada, Reno (Park Lab)",
    details: [
      "Developing a generative AI model that could generate reactive force field that is essential for molecular dynamic simulations",
      "Developed a deep learning model to find optimized parameters that could facilitate the CVD process for material growth",
      "Developing 2D nano materials using chemical vapor deposition (CVD) method and building sensors for IoT and biomedical applications",
    ],
  },
  {
    title: "Research and Teaching",
    organization: "Khulna University of Engineering and Technology (KUET), Bangladesh",
    duration: "12 years",
    details: [
      "Led research initiatives in AI applications and deep learning",
      "Supervised student research projects and thesis work",
      "Taught courses related to AI, machine learning, and computer engineering",
    ],
  },
  {
    title: "Industry Consultant",
    organization: "Various Industries, Bangladesh",
    duration: "11 years",
    details: [
      "Provided technical consultancy on AI integration in industrial applications",
      "Helped businesses implement machine learning solutions for process optimization",
      "Advised on technology adoption and digital transformation strategies",
    ],
  },
];

// Technical achievements
const technicalAchievements = [
  {
    title: "Multi-GPU Training Pipeline",
    description: "Led design of multi GPU GPT 2/3 training pipeline using PyTorch DDP + ZeRO, cut GPU memory usage by 40% and halved epoch times on 8× A100 nodes",
    icon: "⚡",
  },
  {
    title: "Tokenization & Sharding System",
    description: "Architected uint16-based tokenization & sharding system processing 10 billion+ tokens, driving 20% throughput gains in data loading",
    icon: "🔄",
  },
  {
    title: "LLM Fine-tuning",
    description: "Fine-tuned domain specific LLMs with LoRA and RLHF, achieving a 15% reduction in perplexity and a 20% lift in human evaluated coherence scores",
    icon: "📈",
  },
  {
    title: "Flash Attention Integration",
    description: "Integrated Flash Attention into production inference stack, improving throughput by 25% and reducing 95th percentile latency by 30 ms",
    icon: "⚡",
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundOpacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.5], [0, 0.15]);
  
  // Neural network background effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Create nodes and connections for the background
    const nodeCount = Math.min(Math.floor(width * height / 15000), 50);
    
    // Just keeping the calculation for future implementation
    console.log(`Could render ${nodeCount} nodes in the background`);
    
    return () => {
      // Cleanup function
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden w-full"
      id="skills"
    >
      {/* Neural network background */}
      <motion.div 
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        {/* Nodes would be rendered here in a full implementation */}
      </motion.div>
      
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-screen-lg mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-purple">
              Research & Technical Skills
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Specialized in designing, training, and evaluating transformer-based generative language and vision models
            with extensive research and teaching experience.
          </p>
        </motion.div>
        
        {/* Technical achievements */}
        <div className="mb-20 max-w-screen-xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold mb-8 text-center text-slate-100"
          >
            Key Technical Achievements
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:shadow-lg transition-all hover:bg-slate-800/70"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-2xl">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-100">{achievement.title}</h4>
                    <p className="text-slate-300">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Core competencies section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 max-w-screen-xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-slate-100">Core Competencies</h3>
          
          {/* Skill category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === index 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
          
          {/* Skills display */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h4 className="text-xl font-semibold mb-4 flex items-center text-slate-100">
              <span className="mr-2 text-2xl">{skillCategories[activeCategory].icon}</span>
              {skillCategories[activeCategory].name}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className="text-sm text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Research experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-screen-xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-slate-100">Research Experience</h3>
          
          <div className="space-y-8">
            {researchExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.7 }}
                className="relative pl-6 border-l-2 border-slate-600/50 pb-6"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all">
                  <h4 className="text-xl font-semibold mb-1 text-slate-100">{exp.title}</h4>
                  <p className="text-slate-300 mb-4">
                    {exp.organization}
                    {exp.duration && <span className="ml-2 text-sm text-slate-400">({exp.duration})</span>}
                  </p>
                  
                  <ul className="space-y-2">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span className="text-slate-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Professional skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-screen-xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-slate-100">Professional Skills</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Communication", icon: "💬", level: 90 },
              { title: "Leadership", icon: "👥", level: 88 },
              { title: "Project Management", icon: "📋", level: 92 },
              { title: "Problem Solving", icon: "🔍", level: 95 },
              { title: "Technical Support", icon: "🛠️", level: 87 },
              { title: "Business Development", icon: "📈", level: 85 },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 * index + 0.9 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 flex flex-col items-center text-center hover:bg-slate-800/70 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-slate-100">{skill.title}</h4>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.1 * index + 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  />
                </div>
                <span className="text-sm text-slate-400 mt-1">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 