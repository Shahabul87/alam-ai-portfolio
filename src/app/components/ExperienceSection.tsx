"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Professional experience data
const professionalExperiences = [
  {
    title: "Assistant Professor",
    organization: "Khulna University of Engineering & Technology (KUET), Bangladesh",
    department: "Department of Electrical & Electronic Engineering",
    duration: "March 2014 - January 2023",
    years: "8 Years",
    icon: "🎓",
    color: "from-indigo-600 to-blue-600",
    responsibilities: [
      "Led research initiatives in AI applications and deep learning",
      "Taught advanced courses in machine learning, signal processing, and electrical engineering",
      "Supervised undergraduate and graduate student research projects",
      "Published research work in international conferences and journals",
    ]
  },
  {
    title: "Lecturer",
    organization: "Khulna University of Engineering & Technology (KUET), Bangladesh",
    department: "Department of Electrical & Electronic Engineering",
    duration: "June 2010 - March 2014",
    years: "4 Years",
    icon: "📚",
    color: "from-blue-600 to-cyan-600",
    responsibilities: [
      "Taught fundamental engineering courses and laboratories",
      "Conducted research in signal processing and early applications of machine learning",
      "Mentored student projects and thesis work",
      "Participated in curriculum development and academic committee work",
    ]
  },
  {
    title: "Industry Consultant",
    organization: "Consultancy Research & Testing Services (CRTS)",
    department: "Khulna University of Engineering & Technology (KUET), Bangladesh",
    duration: "January 2011 - January 2022",
    years: "11 Years",
    icon: "💼",
    color: "from-purple-600 to-indigo-600",
    responsibilities: [
      "Provided technical consultancy to various industries in Bangladesh",
      "Designed and implemented machine learning solutions for industrial applications",
      "Conducted technical audits and performance optimizations",
      "Advised on technology adoption and digital transformation strategies",
    ]
  },
  {
    title: "Associate Sub Project Manager",
    organization: "Teaching-Learning and Research in EEE (TLREEE)",
    department: "A Sub Project of the Ministry of Education, Bangladesh",
    duration: "January 2012 - January 2014",
    years: "2 Years",
    icon: "📋",
    color: "from-emerald-600 to-green-600",
    responsibilities: [
      "Managed research and educational development initiatives",
      "Coordinated academic and research activities between faculty and government",
      "Supervised budget allocation and resource management for the project",
      "Facilitated training and workshops for teachers and researchers",
    ]
  },
  {
    title: "Cultural and Sports Secretary",
    organization: "Teachers Association",
    department: "Khulna University of Engineering & Technology (KUET), Bangladesh",
    duration: "January 2012 - January 2013",
    years: "1 Year",
    icon: "🏆",
    color: "from-amber-600 to-orange-600",
    responsibilities: [
      "Organized cultural events and sports competitions for faculty members",
      "Coordinated inter-university faculty sports tournaments",
      "Managed cultural exchange programs and community engagement activities",
      "Promoted work-life balance and wellness activities among faculty",
    ]
  },
];

// Research experience data
const researchExperiences = [
  {
    title: "Graduate Research Assistant",
    organization: "University of Nevada, Reno (Park Lab)",
    current: true,
    color: "from-rose-600 to-pink-600",
    icon: "🔬",
    details: [
      "Developing a generative AI model that could generate reactive force field that is essential for molecular dynamic simulations",
      "Developed a deep learning model to find optimized parameters that could facilitate the CVD process for material growth",
      "Developing 2D nano materials using chemical vapor deposition (CVD) method and building sensors for IoT and biomedical applications",
    ],
    technologies: ["Generative AI", "Molecular Dynamics", "Deep Learning", "CVD", "Sensor Development"]
  },
  {
    title: "AI Research Lead",
    organization: "Khulna University of Engineering & Technology",
    duration: "2018 - 2023",
    color: "from-violet-600 to-purple-600",
    icon: "🧠",
    details: [
      "Led a research group focused on applications of AI in engineering problems",
      "Developed novel deep learning architectures for signal and image processing tasks",
      "Applied reinforcement learning techniques to solve control and optimization problems",
      "Mentored graduate students in AI research methodologies and best practices",
    ],
    technologies: ["Deep Learning", "Reinforcement Learning", "Signal Processing", "Control Systems"]
  },
  {
    title: "Industry-Academia Collaborative Research",
    organization: "Various Industry Partners",
    duration: "2015 - 2022",
    color: "from-blue-600 to-indigo-600",
    icon: "🔗",
    details: [
      "Conducted joint research with industry partners to solve real-world problems",
      "Adapted academic AI models for practical industrial applications",
      "Developed scalable machine learning solutions for manufacturing optimization",
      "Created AI-driven quality control and predictive maintenance systems",
    ],
    technologies: ["Applied AI", "Industrial IoT", "Process Optimization", "Quality Control"]
  },
];

// Core competencies data (for reference in the research section)
const coreCompetencies = {
  "Generative Models": ["GPT-3/4", "GPT Neo", "T5", "BART", "Vision & Audio Diffusion"],
  "Deep Learning Frameworks": ["PyTorch", "Hugging Face Transformers"],
  "Scalable Training": ["DDP", "ZeRO-Offload", "FlashAttention", "Multihead Latent Attention", "CUDA", "Mixed Precision (AMP)"],
  "Reinforcement Learning": ["PPO", "GRPO", "RLHF", "Multi-agent Systems"],
  "Data Engineering": ["Tiktoken Tokenization", "Uint16 Sharding", "Streaming Pipelines"],
  "Cloud & DevOps": ["AWS SageMaker", "GCP AI Platform", "Docker", "Kubernetes", "GitOps"],
  "Full Stack Dev": ["Next.js", "React", "TypeScript", "Prisma", "REST APIs"],
};

export default function ExperienceSection() {
  const [selectedTab, setSelectedTab] = useState<'research' | 'professional'>('research');
  const [expandedItem, setExpandedItem] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const handleTabChange = (tab: 'research' | 'professional') => {
    setSelectedTab(tab);
    setExpandedItem(0); // Reset expanded item when changing tabs
  };
  
  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-background"
      id="experience"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Research & Professional Experience
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            A journey through academic research and industry applications in artificial intelligence
            and engineering innovation.
          </p>
        </motion.div>
        
        {/* Tab selector */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-foreground/5 rounded-full">
            <button
              onClick={() => handleTabChange('research')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                selectedTab === 'research' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Research
            </button>
            <button
              onClick={() => handleTabChange('professional')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                selectedTab === 'professional' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Professional
            </button>
          </div>
        </div>
        
        {/* Research Experience */}
        {selectedTab === 'research' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {researchExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden transition-all hover:bg-foreground/10"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${experience.color} text-white text-2xl`}>
                      {experience.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {experience.title}
                            {experience.current && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-foreground/70">
                            {experience.organization}
                            {experience.duration && <span className="ml-2 text-sm">({experience.duration})</span>}
                          </p>
                        </div>
                        <button className="text-foreground/50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${expandedItem === index ? 'transform rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedItem === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 ml-16 border-t border-foreground/10">
                      <h4 className="font-medium mb-2">Research Focus:</h4>
                      <ul className="space-y-2 mb-6">
                        {experience.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${experience.color} mt-1`}>•</span>
                            <span className="text-foreground/80">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${experience.color} bg-opacity-10 text-foreground/90`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            {/* Research keywords cloud */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 p-6 bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Research Keywords</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(coreCompetencies).flatMap(([category, skills]) => 
                  skills.map((skill, i) => (
                    <motion.div
                      key={`${category}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.02 + 0.7 }}
                      className="px-3 py-1 rounded-full text-sm bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all"
                    >
                      {skill}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Professional Experience */}
        {selectedTab === 'professional' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Timeline stem */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600/70 via-purple-600/70 to-pink-600/70 transform md:translate-x-[-0.5px]" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {professionalExperiences.map((experience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[7px] md:left-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border-2 border-background transform md:translate-x-[-50%] z-10" />
                  
                  {/* Date on mobile */}
                  <div className="md:hidden ml-12 mb-2 text-sm font-medium text-foreground/60">
                    {experience.duration} <span className="text-foreground/40">({experience.years})</span>
                  </div>
                  
                  {/* Content */}
                  <div 
                    className={`md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}
                  >
                    <div 
                      className="bg-foreground/5 backdrop-blur-sm p-6 rounded-xl border border-foreground/10 transition-all hover:bg-foreground/10"
                      onClick={() => toggleExpand(index)}
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${experience.color} text-white text-xl ${index % 2 === 0 ? 'md:order-last' : ''}`}>
                          {experience.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{experience.title}</h3>
                          <p className="text-foreground/70 text-sm">{experience.organization}</p>
                          <p className="text-foreground/60 text-xs">{experience.department}</p>
                        </div>
                      </div>
                      
                      {/* Date on desktop */}
                      <div className="hidden md:block text-sm font-medium text-foreground/60">
                        {experience.duration} <span className="text-foreground/40">({experience.years})</span>
                      </div>
                      
                      {expandedItem === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mt-4 pt-4 border-t border-foreground/10 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <h4 className="font-medium mb-2">Responsibilities:</h4>
                          <ul className={`space-y-2 ${index % 2 === 0 ? 'md:list-position-inside' : ''}`}>
                            {experience.responsibilities.map((responsibility, i) => (
                              <li key={i} className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${experience.color} mt-1 ${index % 2 === 0 ? 'md:order-last' : ''}`}>•</span>
                                <span className="text-foreground/80">{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      
                      <div className="mt-4 text-center">
                        <button 
                          onClick={() => toggleExpand(index)}
                          className="text-foreground/50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 inline transition-transform ${expandedItem === index ? 'transform rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty div for alignment on mobile */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
            
            {/* Career achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 p-6 bg-foreground/5 backdrop-blur-sm rounded-xl border border-foreground/10"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">Career Highlights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg hover:bg-foreground/5 transition-all">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-3xl mb-4">
                    🎓
                  </div>
                  <h4 className="text-lg font-medium mb-2">12+ Years</h4>
                  <p className="text-foreground/70">Academic Experience</p>
                </div>
                
                <div className="text-center p-4 rounded-lg hover:bg-foreground/5 transition-all">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl mb-4">
                    🔬
                  </div>
                  <h4 className="text-lg font-medium mb-2">10+ Years</h4>
                  <p className="text-foreground/70">Research Leadership</p>
                </div>
                
                <div className="text-center p-4 rounded-lg hover:bg-foreground/5 transition-all">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-3xl mb-4">
                    💼
                  </div>
                  <h4 className="text-lg font-medium mb-2">11+ Years</h4>
                  <p className="text-foreground/70">Industry Consultancy</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
} 