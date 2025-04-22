"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Education data
const educationData = [
  {
    degree: "Ph.D. in AI Engineering",
    institution: "University of Nevada, Reno",
    location: "Reno, NV, USA",
    period: "2019 - Present",
    description: "Focused on generative AI models and deep learning for materials science and engineering applications."
  },
  {
    degree: "M.Sc. in Computer Science and Engineering",
    institution: "Khulna University of Engineering & Technology (KUET)",
    location: "Khulna, Bangladesh",
    period: "2012 - 2014",
    description: "Specialized in artificial intelligence and machine learning algorithms."
  },
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Khulna University of Engineering & Technology (KUET)",
    location: "Khulna, Bangladesh",
    period: "2008 - 2012",
    description: "Graduated with honors, focusing on computer science fundamentals and software engineering."
  }
];

// Relevant courses
const relevantCourses = [
  {
    category: "Statistics & Mathematics",
    courses: [
      "Bayesian Statistics",
      "Multivariate Analysis",
      "Time Series Analysis",
      "Probability Theory",
      "Random Signal and Estimation Theory"
    ],
    icon: "📊",
    color: "from-purple-600 to-indigo-600"
  },
  {
    category: "Artificial Intelligence",
    courses: [
      "Deep Learning",
      "Machine Learning Algorithms",
      "Neural Networks",
      "Computer Vision",
      "Natural Language Processing"
    ],
    icon: "🧠",
    color: "from-blue-600 to-cyan-600"
  },
  {
    category: "Computing & Engineering",
    courses: [
      "Elements of Research Computing",
      "Distributed Systems",
      "High-Performance Computing",
      "Advanced Algorithms",
      "Software Engineering"
    ],
    icon: "💻",
    color: "from-emerald-600 to-green-600"
  }
];

// Certifications
const certifications = [
  {
    name: "Deep Learning Specialization",
    organization: "Coursera (deeplearning.ai)",
    date: "2020",
    credential: "ABCD-1234-EFGH"
  },
  {
    name: "TensorFlow Developer Certificate",
    organization: "Google",
    date: "2019",
    credential: "TF-DEV-2021"
  },
  {
    name: "Machine Learning Engineering",
    organization: "Stanford Online",
    date: "2018",
    credential: "ML-E-2018-STF"
  }
];

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState('education');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden w-full"
      id="education"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-screen-lg mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-purple">
              Academic Background
            </span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            Educational qualifications, relevant coursework, and professional certifications
            that have shaped my expertise in AI engineering and research.
          </p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md bg-slate-800/50 p-1 overflow-x-auto whitespace-nowrap">
            {['education', 'courses', 'certifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium text-sm transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' 
                    : 'hover:bg-slate-700/50 text-slate-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab content - wrapping all content in a max-width container while parent is full-width */}
        <div className="max-w-screen-xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {educationData.map((education, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 md:pl-0"
                  >
                    <div className="md:grid md:grid-cols-7 md:gap-8">
                      {/* Timeline dot for mobile */}
                      <div className="absolute left-0 top-2 md:hidden">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                      </div>
                      
                      {/* Year */}
                      <div className="md:col-span-2">
                        <div className="flex items-center mb-1 md:mb-0">
                          <div className="hidden md:block w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mr-4"></div>
                          <span className="text-slate-400 font-medium">{education.period}</span>
                        </div>
                      </div>
                      
                      {/* Education details */}
                      <div className="md:col-span-5">
                        <div className="dark-card p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all">
                          <h3 className="text-xl font-bold mb-1 text-slate-100">{education.degree}</h3>
                          <p className="text-slate-200 font-medium">{education.institution}</p>
                          <p className="text-slate-400 text-sm mb-3">{education.location}</p>
                          <p className="text-slate-300">{education.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {relevantCourses.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center text-slate-100">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      {category.category}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.courses.map((course, courseIndex) => (
                        <motion.div
                          key={courseIndex}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-10 border border-slate-700/50 hover:shadow-md transition-all dark-card`}
                        >
                          <h4 className="font-medium text-slate-200">{course}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="dark-card p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center text-xl">
                      🎓
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1 text-slate-100">{cert.name}</h3>
                    <p className="text-slate-300 mb-3">{cert.organization}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">{cert.date}</span>
                      <span className="text-xs bg-slate-700/50 px-2 py-1 rounded-full text-slate-400">
                        {cert.credential}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 