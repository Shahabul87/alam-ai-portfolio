import HeroSection from './components/HeroSection';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      
      {/* Skills teaser section */}
      <section className="py-16 w-full dark-card">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 glow-purple">
                Expert in AI Engineering
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Specialized in designing, training, and evaluating transformer-based 
              generative language and vision models with extensive research experience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['GPT-3/4', 'PyTorch', 'RLHF', 'DDP', 'Fine-tuning', 'Flash Attention'].map((skill) => (
                <div 
                  key={skill}
                  className="px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 text-slate-200"
                >
                  {skill}
                </div>
              ))}
            </div>
            
            <Link href="/skills">
              <button
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-lg"
              >
                View My Full Skillset
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Projects teaser section */}
      <section className="py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 glow-blue">
                Key Projects & Implementations
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              From cutting-edge AI research to practical hardware solutions, bridging theory and application.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto mb-10">
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-2xl">
                  🤖
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">GPT-2 Reimplementation</h3>
                <p className="text-sm text-slate-300">From-scratch PyTorch nn.Module with device-agnostic sampling</p>
              </div>
              
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-2xl">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Low-Latency Inference</h3>
                <p className="text-sm text-slate-300">Optimized stack with FlashAttention and mixed precision</p>
              </div>
              
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 text-2xl">
                  ❤️
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Low-cost ECG Machine</h3>
                <p className="text-sm text-slate-300">Nationally awarded medical device design</p>
              </div>
            </div>
            
            <Link href="/projects">
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium shadow-lg"
              >
                Explore All Projects
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experience teaser section */}
      <section className="py-16 w-full dark-card">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-purple">
                Research & Professional Experience
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Over 12 years of academic and industry experience in AI research, teaching, and consultancy.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto mb-10">
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-2xl">
                  🔬
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Research Assistant</h3>
                <p className="text-sm text-slate-300">University of Nevada, Reno (Park Lab)</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl">
                  🎓
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Assistant Professor</h3>
                <p className="text-sm text-slate-300">KUET, Bangladesh (8 Years)</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-2xl">
                  💼
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Industry Consultant</h3>
                <p className="text-sm text-slate-300">CRTS (11 Years)</p>
              </div>
            </div>
            
            <Link href="/research">
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg"
              >
                View My Experience
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Education teaser section */}
      <section className="py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 glow-blue">
                Academic Background
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Advanced coursework in statistics, mathematics, and computing with specialized AI training.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto mb-10">
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-2xl">
                  📊
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Statistical Methods</h3>
                <p className="text-sm text-slate-300">Bayesian Statistics, Multivariate Analysis, Time Series Analysis</p>
              </div>
              
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl">
                  🧠
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">AI Specialization</h3>
                <p className="text-sm text-slate-300">Deep Learning, Probability Theory, Random Signal Estimation</p>
              </div>
              
              <div className="p-6 dark-card rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 text-2xl">
                  💻
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">Research Computing</h3>
                <p className="text-sm text-slate-300">Advanced Algorithms, High Performance Computing, Research Methods</p>
              </div>
            </div>
            
            <Link href="/education">
              <button
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-medium shadow-lg"
              >
                View Academic Background
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Awards & Publications teaser */}
      <section className="py-16 w-full dark-card">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 text-center">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 glow-blue">
                Awards & Publications
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              Recognized with national honors and published in prestigious journals and conferences.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-6 mb-10 max-w-screen-xl mx-auto">
              <div className="lg:w-1/2 p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-2xl">
                  🏅
                </div>
                <h3 className="text-lg font-semibold mb-3 text-slate-100">Prestigious Awards</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>President Gold Medal 2010</li>
                  <li>Prime Minister Gold Medal 2010</li>
                  <li>Dean List Award (2007-2010)</li>
                </ul>
              </div>
              
              <div className="lg:w-1/2 p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 text-2xl">
                  📄
                </div>
                <h3 className="text-lg font-semibold mb-3 text-slate-100">Research Publications</h3>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>3 Journal Articles</p>
                  <p>3 Conference Papers</p>
                  <p>Across 5 Research Fields</p>
                </div>
              </div>
            </div>
            
            <Link href="/publications">
              <button
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-medium shadow-lg"
              >
                View Awards & Publications
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
