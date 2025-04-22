"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Awards data
const awards = [
  {
    title: "President Gold Medal 2010",
    description: "Highest National Honor in Bangladesh for Undergraduate",
    icon: "🏅",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Prime Minister Gold Medal 2010",
    description: "Highest National Honor in Bangladesh for Undergraduate",
    icon: "🏆",
    color: "from-indigo-600 to-purple-600",
  },
  {
    title: "Dean List Award",
    description: "Khulna University of Engineering & Technology, 2007-2010",
    icon: "🎓",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "University Technical Scholarship",
    description: "2006-2010",
    icon: "📚",
    color: "from-indigo-600 to-purple-600",
  },
  {
    title: "UGC Scholarship",
    description: "University Grants Commission of Bangladesh, 2010",
    icon: "💰",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "KUET Students Merit Scholarship",
    description: "Government of the People's Republic of Bangladesh",
    icon: "🎯",
    color: "from-indigo-600 to-purple-600",
  },
];

// Publications data
const publications = [
  {
    type: "journal",
    title: "Intriguing Type-II g-GeC/AlN Bilayer Heterostructure for Photocatalytic Water Decomposition and Hydrogen Production",
    authors: "Naim Ferdous, Md Sherajul Islam, Md Shahabul Alam, Md Yasir Zamil, Jeshurun Biney, Sareh Vatani, Jeongwon Park",
    journal: "Nature Scientific Reports",
    year: "2023",
    doi: "https://doi.org/10.21203/rs.3.rs-3235354/v1",
    field: "Materials Science",
  },
  {
    type: "journal",
    title: "Combined FIM-PHI Based Wearable Biosensor",
    authors: "Md. Asaduzzaman, Tahsin Solaiman, Rushdi Zahid Rusho, Md Shahabul Alam, Md Arafat Hossain",
    journal: "IEEE Sensors Journal (IF:3.073)",
    year: "2020",
    doi: "10.1109/JSEN.2020.3021056",
    field: "Biomedical Engineering",
  },
  {
    type: "journal",
    title: "Impact Analysis of PMD and GVD on the Performance of Optical Fiber Communication Employing OFDM-QAM Technique",
    authors: "Md Shahabul Alam, Md Abul Hossain",
    journal: "International Journal of Innovative Technology and Exploring Engineering (IJITEE)",
    year: "2013",
    volume: "vol. 3, issue 4, pp. 58-63",
    field: "Telecommunications",
  },
  {
    type: "conference",
    title: "Design and Implementation of Low-Cost ECG Monitoring System for the Patient Using Smartphone",
    authors: "Md. Asif Ahamed, Md. Kamrul Hasan, Md. Shahabul Alam",
    conference: "IEEE Conference on Electrical & Electronic Engineering (CEEE)",
    year: "2016",
    doi: "10.1109/CEEE.2015.7428272",
    field: "Biomedical Engineering",
  },
  {
    type: "conference",
    title: "Localization of FACTS Devices for Optimal Power Flow Using Genetic Algorithm",
    authors: "A.K.M. Rezwanur Rahman, Md. Shahabul Alam, Md. Zakir Hossain and Md.Shahjahan",
    conference: "IEEE International Conference on Electrical Information and Communication Technology (EICT)",
    year: "2014",
    doi: "10.1109/EICT.2014.6777889",
    field: "Power Systems",
  },
  {
    type: "conference",
    title: "A compact W-shaped 2.45 GHz RFID tag antenna design for UHF RFID applications",
    authors: "Mukit Sarkar, Md. Abul Hossain, Md. Reshad Ul Hoque and Md. Shahabul Alam",
    conference: "IEEE International Conference on Computer and Information Technology (ICCIT)",
    year: "2014",
    doi: "10.1109/ICCITechn.2014.6997331",
    field: "RF Engineering",
  },
];

export default function AwardsPublications() {
  const [activeSection, setActiveSection] = useState<'awards' | 'publications'>('awards');
  const [selectedPublication, setSelectedPublication] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'journal' | 'conference'>('all');
  const [sortBy, setSortBy] = useState<'year' | 'field'>('year');
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const handleSectionChange = (section: 'awards' | 'publications') => {
    setActiveSection(section);
    setSelectedPublication(null); // Reset selected publication when changing sections
  };
  
  const getFilteredAndSortedPublications = () => {
    let filtered = [...publications];
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(pub => pub.type === filterType);
    }
    
    // Apply sorting
    if (sortBy === 'year') {
      filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Descending order
    } else if (sortBy === 'field') {
      filtered.sort((a, b) => a.field.localeCompare(b.field));
    }
    
    return filtered;
  };
  
  const filteredPublications = getFilteredAndSortedPublications();
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden w-full"
      id="awards-publications"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl" />
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-screen-lg mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-purple">
              Awards & Publications
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Academic recognitions and research contributions in the field of artificial intelligence
            and engineering.
          </p>
        </motion.div>
        
        {/* Tab selector */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-slate-800/50 rounded-full">
            <button
              onClick={() => handleSectionChange('awards')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeSection === 'awards' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Awards & Honors
            </button>
            <button
              onClick={() => handleSectionChange('publications')}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeSection === 'publications' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Publications
            </button>
          </div>
        </div>
        
        <div className="max-w-screen-xl mx-auto">
          {/* Awards Section */}
          <AnimatePresence mode="wait">
            {activeSection === 'awards' && (
              <motion.div
                key="awards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awards.map((award, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 transition-all hover:bg-slate-800/70"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${award.color} text-white text-2xl`}>
                          {award.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-slate-100">{award.title}</h3>
                          <p className="text-slate-300">{award.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Certificate decoration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-12 p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 text-center"
                >
                  <div className="mb-4 text-2xl">🎖️</div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-100">Academic Excellence</h3>
                  <p className="text-slate-300 max-w-2xl mx-auto">
                    Recognized at national and institutional levels for academic and research excellence, 
                    including the highest national honors in Bangladesh for undergraduate achievement.
                  </p>
                </motion.div>
              </motion.div>
            )}
            
            {/* Publications Section */}
            {activeSection === 'publications' && (
              <motion.div
                key="publications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Filter and sort controls */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex p-1 bg-slate-800/50 rounded-full">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                        filterType === 'all' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      All Publications
                    </button>
                    <button
                      onClick={() => setFilterType('journal')}
                      className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                        filterType === 'journal' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Journal Papers
                    </button>
                    <button
                      onClick={() => setFilterType('conference')}
                      className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                        filterType === 'conference' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Conference Papers
                    </button>
                  </div>
                  
                  <div className="flex p-1 bg-slate-800/50 rounded-full">
                    <button
                      onClick={() => setSortBy('year')}
                      className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                        sortBy === 'year' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Sort by Year
                    </button>
                    <button
                      onClick={() => setSortBy('field')}
                      className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                        sortBy === 'field' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Sort by Field
                    </button>
                  </div>
                </div>
                
                {/* Publications list */}
                <div className="space-y-6">
                  {filteredPublications.map((publication, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden transition-all hover:bg-slate-800/70"
                    >
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setSelectedPublication(selectedPublication === index ? null : index)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${
                            publication.type === 'journal' 
                              ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
                              : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                          } text-white text-2xl`}>
                            {publication.type === 'journal' ? '📰' : '🎤'}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold mb-1 text-slate-100">
                                  {publication.title}
                                </h3>
                                <p className="text-slate-300 text-sm mb-2">
                                  {publication.authors.split(',')[0]} et al. ({publication.year})
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/70 text-slate-200">
                                    {publication.field}
                                  </span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    publication.type === 'journal' 
                                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  }`}>
                                    {publication.type === 'journal' ? 'Journal' : 'Conference'}
                                  </span>
                                </div>
                              </div>
                              <button className="text-slate-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-5 w-5 transition-transform ${selectedPublication === index ? 'transform rotate-180' : ''}`}
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
                      
                      {selectedPublication === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <div className="pt-4 ml-16 border-t border-slate-700/50">
                            <div className="mb-4">
                              <h4 className="font-medium mb-1 text-slate-200">Authors:</h4>
                              <p className="text-slate-300 text-sm">{publication.authors}</p>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-medium mb-1 text-slate-200">{publication.type === 'journal' ? 'Journal:' : 'Conference:'}</h4>
                              <p className="text-slate-300 text-sm">
                                {publication.type === 'journal' ? publication.journal : publication.conference}
                                {publication.volume && `, ${publication.volume}`}
                              </p>
                            </div>
                            
                            {publication.doi && (
                              <div>
                                <h4 className="font-medium mb-1 text-slate-200">DOI:</h4>
                                <a 
                                  href={publication.doi.startsWith('http') ? publication.doi : `https://doi.org/${publication.doi}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
                                >
                                  {publication.doi}
                                </a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Publication statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
                >
                  <h3 className="text-xl font-semibold mb-6 text-center text-slate-100">Publication Statistics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-3xl mb-4">
                        📰
                      </div>
                      <h4 className="text-lg font-medium mb-1 text-slate-100">{publications.filter(p => p.type === 'journal').length}</h4>
                      <p className="text-slate-300">Journal Articles</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-3xl mb-4">
                        🎤
                      </div>
                      <h4 className="text-lg font-medium mb-1 text-slate-100">{publications.filter(p => p.type === 'conference').length}</h4>
                      <p className="text-slate-300">Conference Papers</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl mb-4">
                        🔬
                      </div>
                      <h4 className="text-lg font-medium mb-1 text-slate-100">{new Set(publications.map(p => p.field)).size}</h4>
                      <p className="text-slate-300">Research Fields</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 