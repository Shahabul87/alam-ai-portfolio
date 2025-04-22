"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Social media links data
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
    color: "from-slate-700 to-slate-900"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin",
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter",
    color: "from-blue-400 to-blue-600"
  },
  {
    name: "Scholar",
    url: "https://scholar.google.com/citations?user=youruserid",
    icon: "scholar",
    color: "from-blue-700 to-indigo-800"
  }
];

// EmailJS configuration
// You'll need to create an account on EmailJS and replace these with your actual service, template, and user IDs
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);
  
  // Trigger animation when in view
  useEffect(() => {
    // No animation timing needed here
  }, [isInView]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (error) {
      setError(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Basic validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    try {
      // Prepare template parameters with recipient email
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject || "Contact Form Submission",
        message: formState.message,
        to_email: "sham251087@gmail.com" // Your email address
      };
      
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Icon component for social media
  const SocialIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        );
      case 'scholar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            <path strokeLinecap="round" d="M12 14v7.5"></path>
            <path strokeLinecap="round" d="M4.5 9.5l3.5 2"></path>
            <path strokeLinecap="round" d="M19.5 9.5l-3.5 2"></path>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Generate coordinate points for abstract map
  const generateMapPoints = () => {
    const points = [];
    const center = { x: 50, y: 50 };
    
    // Create a cluster of points around the center
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 35;
      points.push({
        x: center.x + Math.cos(angle) * distance,
        y: center.y + Math.sin(angle) * distance,
        size: Math.random() * 3 + 2,
        delay: i * 0.1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    return points;
  };
  
  const mapPoints = generateMapPoints();
  
  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-20 relative overflow-hidden"
      id="contact"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(120,119,198,0.3)_0%,rgba(0,0,0,0)_35%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.3)_0%,rgba(0,0,0,0)_35%)]" />
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-blue">
                Get In Touch
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Feel free to reach out for collaborations, inquiries, or just to say hello.
              I&apos;m always open to discussing new projects and opportunities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2 text-white">Message Sent Successfully!</h4>
                      <p className="text-slate-300 text-center">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {error && (
                        <div className="p-3 bg-red-900/30 text-red-300 rounded-lg mb-4">
                          {error}
                        </div>
                      )}
                      
                      <div>
                        <motion.div
                          className="relative"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            required
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500 text-white"
                            placeholder="Your Name"
                          />
                          <AnimatePresence>
                            {activeField === 'name' && (
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                exit={{ width: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <div>
                        <motion.div
                          className="relative"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField('email')}
                            onBlur={() => setActiveField(null)}
                            required
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500 text-white"
                            placeholder="Your Email"
                          />
                          <AnimatePresence>
                            {activeField === 'email' && (
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                exit={{ width: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <div>
                        <motion.div
                          className="relative"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField('subject')}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500 text-white"
                            placeholder="Subject (Optional)"
                          />
                          <AnimatePresence>
                            {activeField === 'subject' && (
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                exit={{ width: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <div>
                        <motion.div
                          className="relative"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <textarea
                            name="message"
                            id="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            onFocus={() => setActiveField('message')}
                            onBlur={() => setActiveField(null)}
                            required
                            rows={5}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder-slate-500 text-white resize-none"
                            placeholder="Your Message"
                          />
                          <AnimatePresence>
                            {activeField === 'message' && (
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                exit={{ width: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg transition-all hover:shadow-xl hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full md:w-auto relative ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-indigo-500/30'}`}
                        >
                          {isLoading ? (
                            <>
                              <span className="opacity-0">Send Message</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                              </div>
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Contact Details */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-900/30 text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <a href="mailto:contact@alamcse.com" className="text-indigo-400 hover:underline">contact@alamcse.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-900/30 text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Location</h4>
                      <p className="text-slate-300">Reno, NV</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-8">
                  <h4 className="font-medium mb-3 text-white">Connect With Me</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-colors"
                      >
                        <SocialIcon icon={link.icon} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Abstract Map */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 h-72 relative overflow-hidden">
                <h3 className="text-lg font-bold mb-2 text-white">Currently Based In</h3>
                <p className="text-slate-300 mb-4">Reno, Nevada, USA</p>
                
                <div className="absolute inset-0 pt-16">
                  {/* Abstract Map Background */}
                  <div className="absolute inset-0 bg-slate-900/30"></div>
                  
                  {/* Map Grid Lines */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={`h-${i}`} 
                        className="absolute left-0 right-0 h-px bg-slate-700/30" 
                        style={{ top: `${(i + 1) * 14}%` }}
                      />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={`v-${i}`} 
                        className="absolute top-0 bottom-0 w-px bg-slate-700/30" 
                        style={{ left: `${(i + 1) * 14}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Map Points */}
                  {mapPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.02,
                        type: 'spring',
                        stiffness: 200,
                        damping: 10
                      }}
                      className="absolute rounded-full bg-indigo-500/80"
                      style={{
                        width: point.size,
                        height: point.size,
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        opacity: point.opacity,
                      }}
                    />
                  ))}
                  
                  {/* Location Ping Animation */}
                  <div className="absolute" style={{ left: '39%', top: '42%' }}>
                    <div className="w-4 h-4 bg-indigo-600 rounded-full relative z-10">
                      <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 