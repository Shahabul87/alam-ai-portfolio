import HeroSection from './components/HeroSection';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Skills teaser section */}
      <section className="py-16 bg-foreground/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Expert in AI Engineering
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Specialized in designing, training, and evaluating transformer-based 
            generative language and vision models with extensive research experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['GPT-3/4', 'PyTorch', 'RLHF', 'DDP', 'Fine-tuning', 'Flash Attention'].map((skill) => (
              <div 
                key={skill}
                className="px-4 py-2 bg-foreground/5 rounded-full border border-foreground/10"
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
      </section>
      
      {/* Projects teaser section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Key Projects & Implementations
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            From cutting-edge AI research to practical hardware solutions, bridging theory and application.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-2xl">
                🤖
              </div>
              <h3 className="text-lg font-semibold mb-2">GPT-2 Reimplementation</h3>
              <p className="text-sm text-foreground/70">From-scratch PyTorch nn.Module with device-agnostic sampling</p>
            </div>
            
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-2xl">
                ⚡
              </div>
              <h3 className="text-lg font-semibold mb-2">Low-Latency Inference</h3>
              <p className="text-sm text-foreground/70">Optimized stack with FlashAttention and mixed precision</p>
            </div>
            
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 text-2xl">
                ❤️
              </div>
              <h3 className="text-lg font-semibold mb-2">Low-cost ECG Machine</h3>
              <p className="text-sm text-foreground/70">Nationally awarded medical device design</p>
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
      </section>
      
      {/* Experience teaser section */}
      <section className="py-16 bg-foreground/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Research & Professional Experience
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Over 12 years of academic and industry experience in AI research, teaching, and consultancy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-2xl">
                🔬
              </div>
              <h3 className="text-lg font-semibold mb-2">Research Assistant</h3>
              <p className="text-sm text-foreground/70">University of Nevada, Reno (Park Lab)</p>
            </div>
            
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl">
                🎓
              </div>
              <h3 className="text-lg font-semibold mb-2">Assistant Professor</h3>
              <p className="text-sm text-foreground/70">KUET, Bangladesh (8 Years)</p>
            </div>
            
            <div className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-2xl">
                💼
              </div>
              <h3 className="text-lg font-semibold mb-2">Industry Consultant</h3>
              <p className="text-sm text-foreground/70">CRTS (11 Years)</p>
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
      </section>
      
      {/* Awards & Publications teaser */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Awards & Publications
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Recognized with national honors and published in prestigious journals and conferences.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 mb-10 max-w-4xl mx-auto">
            <div className="md:w-1/2 p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-2xl">
                🏅
              </div>
              <h3 className="text-lg font-semibold mb-3">Prestigious Awards</h3>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>President Gold Medal 2010</li>
                <li>Prime Minister Gold Medal 2010</li>
                <li>Dean List Award (2007-2010)</li>
              </ul>
            </div>
            
            <div className="md:w-1/2 p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 text-2xl">
                📄
              </div>
              <h3 className="text-lg font-semibold mb-3">Research Publications</h3>
              <div className="text-sm text-foreground/70 space-y-1">
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
      </section>
    </div>
  );
}
