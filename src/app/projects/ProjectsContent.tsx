"use client";

import { motion } from 'framer-motion';
import ProjectsSection from '../components/ProjectsSection';
import NeuralNetworkVisualization from '../components/NeuralNetworkVisualization';

export default function ProjectsContent() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Neural Network Architecture
            </span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            Explore this interactive 3D visualization of a neural network. This represents the fundamental 
            architecture behind many of my AI and machine learning projects.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <NeuralNetworkVisualization />
        </motion.div>
        
        <ProjectsSection />
      </div>
    </div>
  );
} 