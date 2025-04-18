"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Project data
const recentProjects = [
  {
    title: "Full-Spectrum GPT‑2 (124M) Reimplementation",
    description: "From-scratch PyTorch nn.Module, seamless loading of OpenAI/Hugging Face weights, uint16-based tokenization, and a robust, device‑agnostic sampling loop for next‑token generation.",
    icon: "🤖",
    color: "from-indigo-600 to-blue-600",
    tags: ["PyTorch", "LLM", "Tokenization", "Transformer"],
    featured: true,
    link: "#",
    category: "ai"
  },
  {
    title: "Ultra‑Low‑Latency Inference Stack",
    description: "Systematic Tensor Core benchmarking (FP32→TF32→FP16/BF16), torch.compile kernel fusion, and FlashAttention integration — driving end‑to‑end inference down from ~1000 ms to ~93 ms.",
    icon: "⚡",
    color: "from-amber-600 to-orange-600",
    tags: ["FlashAttention", "CUDA", "Optimization", "Inference"],
    featured: true,
    link: "#",
    category: "ai"
  },
  {
    title: "Production‑Ready Training & Scale‑Out",
    description: "Modular (B,T)→(B,T,C) data pipelines, AdamW with warmup+cosine decay, gradient clipping/accumulation, and DDP across multi‑GPU clusters; validated on FineWeb (EDU) corpora and HellaSwag benchmarks.",
    icon: "🚀",
    color: "from-purple-600 to-pink-600",
    tags: ["DDP", "AdamW", "Training", "Distributed"],
    featured: true,
    link: "#",
    category: "ai"
  },
  {
    title: "DeepSeek R1–inspired GRPO Agent",
    description: "Designed and implemented a model leveraging Group Relative Policy Optimization (GRPO) to enhance policy stability and sample efficiency with smoother training dynamics and faster policy refinement.",
    icon: "🧠",
    color: "from-emerald-600 to-green-600",
    tags: ["GRPO", "Reinforcement Learning", "Agent", "Policy Optimization"],
    link: "#",
    category: "ai"
  },
  {
    title: "Diffusion Model Image Synthesis",
    description: "Designed an image synthesis model based on diffusion techniques that generates images based on the training dataset's characteristics with progressive denoising and controlled generation.",
    icon: "🖼️",
    color: "from-cyan-600 to-blue-600",
    tags: ["PyTorch", "Diffusion Models", "Computer Vision", "Generative AI"],
    link: "#",
    category: "ai"
  },
  {
    title: "Transformer for Translation",
    description: "Designed and implemented a transformer architecture in PyTorch specifically for translation tasks, with attention mechanisms and cross-lingual embedding alignment.",
    icon: "🌐",
    color: "from-rose-600 to-pink-600",
    tags: ["PyTorch", "NLP", "Transformer", "Translation"],
    link: "#",
    category: "ai"
  }
];

const pastProjects = [
  {
    title: "Low-cost ECG Machine",
    description: "Designed and implemented a low-cost ECG machine accessible to anyone for heart rate monitoring, recognized with a national award for innovation and affordability.",
    icon: "❤️",
    color: "from-red-600 to-rose-600",
    tags: ["Hardware", "Medical", "Embedded Systems"],
    featured: true,
    link: "#",
    category: "hardware"
  },
  {
    title: "Blood Pressure Monitoring System",
    description: "Digital blood pressure monitor with threshold alerts for patients with hypertension and hypotension, featuring wireless connectivity and data logging.",
    icon: "📊",
    color: "from-blue-600 to-indigo-600",
    tags: ["Medical", "IoT", "Monitoring"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Intelligent Home Security System",
    description: "Security system that wirelessly alerts homeowners of security breaches, with motion detection, camera integration, and mobile notifications.",
    icon: "🔒",
    color: "from-purple-600 to-violet-600",
    tags: ["IoT", "Security", "Wireless"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Smart Home Appliance Control",
    description: "System to control home appliances (TV, refrigerator, fans, lights) using an Android smartphone from a distance via Bluetooth and WiFi connectivity.",
    icon: "🏠",
    color: "from-green-600 to-emerald-600",
    tags: ["IoT", "Android", "Smart Home"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Smart Solar Sun Tracker",
    description: "Motor driver system that tracks the sun even in cloudy environments using light sensors and predictive algorithms, controllable via Android smartphone.",
    icon: "☀️",
    color: "from-amber-600 to-yellow-600",
    tags: ["Renewable Energy", "IoT", "Android"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Underwater Obstacle Detection Robot",
    description: "Robot capable of underwater navigation with obstacle detection using laser sensors, designed for exploration and underwater mapping.",
    icon: "🤿",
    color: "from-cyan-600 to-blue-600",
    tags: ["Robotics", "Sensors", "Navigation"],
    featured: true,
    link: "#",
    category: "hardware"
  },
  {
    title: "Line Follower Robot",
    description: "Autonomous robot that follows line paths using optical sensors with PID control for smooth navigation and obstacle avoidance capabilities.",
    icon: "🔄",
    color: "from-slate-600 to-gray-600",
    tags: ["Robotics", "Sensors", "Control Systems"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Wireless Motor Drives System",
    description: "Motor drive system with wireless speed control from any distance using Android smartphone, featuring variable frequency drive and power optimization.",
    icon: "📱",
    color: "from-orange-600 to-red-600",
    tags: ["Motor Control", "Wireless", "Android"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Smart Water Level Indicator",
    description: "System designed to sense water levels in tanks and automatically control pumps based on predefined thresholds with wireless monitoring.",
    icon: "💧",
    color: "from-blue-600 to-sky-600",
    tags: ["IoT", "Automation", "Sensors"],
    link: "#",
    category: "hardware"
  },
  {
    title: "Wireless Power Transmission",
    description: "System for transferring power wirelessly using resonance, designed for short-range applications with efficiency optimization.",
    icon: "⚡",
    color: "from-yellow-600 to-amber-600",
    tags: ["Power Electronics", "Wireless", "Energy"],
    link: "#",
    category: "hardware"
  },
  {
    title: "High Quality FM Transmitter and Receiver",
    description: "Custom-designed FM radio transmitter and receiver with enhanced audio quality and range, featuring digital signal processing.",
    icon: "📻",
    color: "from-indigo-600 to-purple-600",
    tags: ["Communications", "Electronics", "DSP"],
    link: "#",
    category: "hardware"
  }
];

// Thesis supervision data
const thesisSupervision = [
  {
    title: "Drowsiness detection in real time by using CNN and eye landmarks' distance",
    student: "Abdullah Arafat Miah",
    year: "2018",
    tags: ["CNN", "Computer Vision", "Safety"],
    color: "from-blue-600 to-cyan-600",
    category: "supervision",
    icon: "👁️"
  },
  {
    title: "Effect of vocal tract dynamics on isolated Bangla vowel and word recognition by neural network",
    student: "Md Rakibul Hasan",
    year: "2018",
    tags: ["Neural Networks", "Speech Recognition", "NLP"],
    color: "from-purple-600 to-indigo-600",
    category: "supervision",
    icon: "🗣️"
  },
  {
    title: "Wireless Power transmission system analysis in real time mode",
    student: "Md Fahim Khan",
    year: "2017",
    tags: ["Wireless", "Power Electronics", "Real-time Systems"],
    color: "from-amber-600 to-orange-600",
    category: "supervision",
    icon: "⚡"
  },
  {
    title: "Design and implementation of Low-Cost 3D printer for industry purpose in the context of Bangladesh",
    student: "Md Fardeen",
    year: "2019",
    tags: ["3D Printing", "Manufacturing", "Low-cost Design"],
    color: "from-green-600 to-emerald-600",
    category: "supervision",
    icon: "🖨️"
  }
];

// Filter categories
const categories = [
  { id: "all", name: "All Projects" },
  { id: "ai", name: "AI & ML Projects" },
  { id: "hardware", name: "Hardware & IoT" },
  { id: "supervision", name: "Thesis Supervision" }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<'recent' | 'past'>('recent');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Filter projects based on selected category
  const getFilteredProjects = () => {
    const allProjects = [
      ...recentProjects.map(project => ({ ...project, tab: 'recent' })),
      ...pastProjects.map(project => ({ ...project, tab: 'past' })),
      ...thesisSupervision.map(thesis => ({ ...thesis, tab: 'supervision' }))
    ];
    
    if (activeCategory === 'all') {
      return allProjects.filter(project => {
        if (activeTab === 'recent') return project.tab === 'recent';
        if (activeTab === 'past') return project.tab === 'past' || project.tab === 'supervision';
        return true;
      });
    }
    
    return allProjects.filter(project => project.category === activeCategory && 
      (activeTab === 'recent' ? project.tab === 'recent' : true));
  };
  
  const filteredProjects = getFilteredProjects();
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden bg-background"
      id="projects"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.3)_0%,rgba(0,0,0,0)_35%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3)_0%,rgba(0,0,0,0)_35%)]" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Projects Portfolio
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            A showcase of AI, machine learning, and hardware engineering projects spanning from 
            cutting-edge transformer architectures to innovative embedded systems solutions.
          </p>
        </motion.div>
        
        {/* Tab selector for Recent/Past */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-foreground/5 rounded-full">
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeTab === 'recent' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Recent Key Projects
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeTab === 'past' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Past Projects & Supervision
            </button>
          </div>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'bg-foreground/5 hover:bg-foreground/10'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Project cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${activeCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className={`bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10 p-6 transition-all h-full flex flex-col ${
                  'featured' in project && project.featured ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${
                    project.color
                  } text-white text-2xl`}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    {'student' in project && (
                      <p className="text-foreground/60 text-sm mb-1">
                        Supervised: {project.student} ({project.year})
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-foreground/70 mb-4 flex-grow">
                  {'description' in project ? project.description : ''}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {'tags' in project && project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {'link' in project && (
                  <Link 
                    href={project.link} 
                    className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm hover:underline inline-flex items-center"
                  >
                    View details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Featured projects callout */}
        {activeTab === 'recent' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-8 bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10 text-center"
          >
            <div className="mb-4 text-2xl">🚀</div>
            <h3 className="text-xl font-semibold mb-2">AI Research & Engineering Focus</h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              My recent work focuses on transformer architectures, large language models, and performance optimization
              techniques that push the boundaries of what&apos;s possible with modern AI systems.
            </p>
          </motion.div>
        )}
        
        {activeTab === 'past' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-8 bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10 text-center"
          >
            <div className="mb-4 text-2xl">💡</div>
            <h3 className="text-xl font-semibold mb-2">Interdisciplinary Engineering Background</h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              With a foundation in hardware design, embedded systems, and IoT solutions, I bring a unique
              interdisciplinary perspective to my AI and machine learning work.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
} 