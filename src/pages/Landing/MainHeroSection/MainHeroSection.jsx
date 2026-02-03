import React from 'react';

const MainHeroSection = () => {
    return (
        <>
            <style>{`
       
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .fade-in-up-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-in-up-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-in-up-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-in-up-delay-4 { animation-delay: 0.4s; opacity: 0; }
        .fade-in-up-delay-5 { animation-delay: 0.5s; opacity: 0; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .glass-card-dark {
          background: rgba(30, 41, 59, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #1e293b 0%, #6366f1 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .category-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .category-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.8) !important;
        }
        
        .mesh-gradient {
          background:
            radial-gradient(at 40% 20%, hsla(228, 100%, 74%, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355, 85%, 63%, 0.08) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(269, 100%, 77%, 0.1) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 0.1) 0px, transparent 50%);
        }
        
        @view-transition { navigation: auto; }
      `}</style>
            <div id="hero-wrapper" className=" w-[100%] ">
                {/* Background */}
                <div className="min-h-full w-[100%] relative overflow-hidden" id="hero-bg" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
                    {/* Animated mesh gradient overlay */}
                    <div className="absolute inset-0 mesh-gradient animate-gradient"></div>
                    {/* Floating orbs - lighter tones */}
                    <div className="absolute top-20 left-10 w-72 h-72 rounded-full animate-float animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)' }}></div>
                    <div className="absolute top-40 right-20 w-96 h-96 rounded-full animate-float-delayed animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }}></div>
                    <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)' }}></div>
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(15,15,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,22,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                    {/* Main content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-18">
                        {/* Top badge */}
                        <div className="flex justify-center mb-8 fade-in-up fade-in-up-delay-1">
                            <div className="glass-card-dark rounded-full px-5 py-2.5 flex items-center gap-3">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-[100%] rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-medium" id="badge-text" style={{ color: '#475569' }}>Trusted by 10,000+ businesses worldwide</span>
                            </div>
                        </div>
                        {/* Headline */}
                        <div className="text-center max-w-5xl mx-auto mb-8 fade-in-up fade-in-up-delay-2">
                            <h1 className="font-display font-extrabold text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight">
                                <span className="gradient-text" id="headline">One Platform to Power</span> <br />
                                <span className="gradient-text">Every Business</span>
                            </h1>
                        </div>
                        {/* Subheadline */}
                        <div className="text-center max-w-3xl mx-auto mb-12 fade-in-up fade-in-up-delay-3">
                            <p className="text-lg md:text-xl leading-relaxed" id="subheadline" style={{ color: '#64748b' }}>From education to enterprise, retailers to distributors — our comprehensive suite of intelligent software solutions helps you streamline operations, boost productivity, and accelerate growth.</p>
                        </div>
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 fade-in-up fade-in-up-delay-4">
                            <button className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-3" id="cta-primary">
                                <span>Start Free Trial</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </button>
                            <button className="glass-card-dark font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-slate-100/40 transition-all duration-300 flex items-center gap-3" id="cta-secondary" style={{ color: '#1e293b' }}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                </svg>
                                <span>Watch Demo</span>
                            </button>
                        </div>
                        {/* Category Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 fade-in-up fade-in-up-delay-5">
                            {/* Education */}
                            <div className="category-card glass-card-dark rounded-3xl p-6 text-center cursor-pointer group">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))' }}>
                                    <svg className="w-7 h-7" style={{ color: '#6366f1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1e293b' }}>Education</h3>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>Schools & Institutes</p>
                            </div>
                            {/* Retail */}
                            <div className="category-card glass-card-dark rounded-3xl p-6 text-center cursor-pointer group">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(244, 114, 182, 0.15))' }}>
                                    <svg className="w-7 h-7" style={{ color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1e293b' }}>Retail</h3>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>Shops & Stores</p>
                            </div>
                            {/* Wholesale */}
                            <div className="category-card glass-card-dark rounded-3xl p-6 text-center cursor-pointer group">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(56, 189, 248, 0.15))' }}>
                                    <svg className="w-7 h-7" style={{ color: '#38bdf8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1e293b' }}>Wholesale</h3>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>Bulk Trading</p>
                            </div>
                            {/* Distribution */}
                            <div className="category-card glass-card-dark rounded-3xl p-6 text-center cursor-pointer group">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(251, 191, 36, 0.15))' }}>
                                    <svg className="w-7 h-7" style={{ color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1e293b' }}>Distribution</h3>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>Supply Chain</p>
                            </div>
                            {/* Enterprise */}
                            <div className="category-card glass-card-dark rounded-3xl p-6 text-center cursor-pointer group col-span-2 md:col-span-1">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.15))' }}>
                                    <svg className="w-7 h-7" style={{ color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display font-semibold text-lg mb-1" style={{ color: '#1e293b' }}>Enterprise</h3>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>Large Scale Ops</p>
                            </div>
                        </div>
                        {/* Stats row */}
                        <div className="glass-card-dark rounded-3xl p-8 max-w-4xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                                        50+
                                    </div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>
                                        Software Solutions
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                                        10K+
                                    </div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>
                                        Active Businesses
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                                        99.9%
                                    </div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>
                                        Uptime Guarantee
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                                        24/7
                                    </div>
                                    <div className="text-sm" style={{ color: '#64748b' }}>
                                        Expert Support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainHeroSection;