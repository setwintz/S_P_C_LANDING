
import React from 'react';

const Home = () => {
  return (
    <div className="relative overflow-y-auto w-[100%] bg-gray-50 text-slate-600 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. Navigation */}
      <nav className="sticky top-0 w-[100%] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-900">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M10 12h4m-4-4h4m0 13v-3a2 2 0 0 0-4 0v3"></path>
                  <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                  <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                </g>
              </svg>
              <span className="font-semibold text-slate-900 tracking-tight text-lg">Skyline Dwellings</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Buy</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Rent</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Sell</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Agents</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Resources</a>
            </div>
            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="text-sm font-medium text-slate-900 hover:text-indigo-600">Log in</a>
              <a href="#" className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-all shadow-sm ring-1 ring-slate-900/5 hover:ring-indigo-600">
                List Property
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                {/* <span className="animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span> */}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              #1 Real Estate Agency 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Find a home that fits <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">your lifestyle.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto font-light">
              Explore our curated collection of premium properties. From urban lofts to countryside estates, we help you find your place in the world.
            </p>
          </div>
          {/* Search Interface */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-2">
            <form className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="flex-1 p-4 group">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24" className="text-indigo-500">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </g>
                  </svg>
                  <input type="text" placeholder="New York, NY" className="w-[100%] text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent" />
                </div>
              </div>
              <div className="flex-1 p-4 group">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
                <div className="flex items-center gap-2 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24" className="text-indigo-500">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </g>
                  </svg>
                  <select className="w-[100%] text-sm font-medium text-slate-900 outline-none bg-transparent appearance-none cursor-pointer">
                    <option>All Properties</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="absolute right-0 text-slate-400 pointer-events-none">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1 p-4 group">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Price Range</label>
                <div className="flex items-center gap-2 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24" className="text-indigo-500">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m5-17H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <select className="w-[100%] text-sm font-medium text-slate-900 outline-none bg-transparent appearance-none cursor-pointer">
                    <option>$100k - $500k</option>
                    <option>$500k - $1M</option>
                    <option>$1M+</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="absolute right-0 text-slate-400 pointer-events-none">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="p-2 flex items-center">
                <button className="w-[100%] md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="m21 21l-4.34-4.34"></path>
                      <circle cx="11" cy="11" r="8"></circle>
                    </g>
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-[100%] h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </section>

      {/* 3. Trusted By */}
      <section className="py-12 border-b border-slate-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-60">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"></path>
              </svg> HEXA
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              </svg> VORTEX
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
              </svg> ORBIT
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7l8.7 5l8.7-5M12 22V12"></path>
                </g>
              </svg> CUBE
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                </g>
              </svg> STACK
            </div>
          </div>
        </div>
      </section>

      {/* 4. Value Proposition */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-6">Redefining the standard of living spaces.</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">We don't just sell houses; we curate experiences. Our data-driven approach ensures you get the best value, whether you are buying your first home or investing in commercial real estate.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        <path d="m9 12l2 2l4-4"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Verified Listings</h4>
                    <p className="text-sm text-slate-500 mt-1">Every property is physically inspected by our agents.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M16 7h6v6"></path>
                        <path d="m22 7l-8.5 8.5l-5-5L2 17"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Market Insights</h4>
                    <p className="text-sm text-slate-500 mt-1">Real-time data to help you make informed decisions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200/50">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Interior" className="w-[100%] h-full object-cover" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-xs hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Total Clients</p>
                    <p className="text-lg font-bold text-slate-900">12,450+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Properties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Featured Properties</h2>
              <p className="text-slate-500 mt-2">Handpicked selection of luxury properties.</p>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all listings <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1703677144437-f69bbd90673b?w=1600&q=80" className="group-hover:scale-105 transition-transform duration-500 w-[100%] h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">FOR SALE</div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">Modern Villa</h3>
                    <p className="text-sm text-slate-500">Beverly Hills, CA</p>
                  </div>
                  <p className="text-lg font-semibold text-indigo-600">$2.4M</p>
                </div>
                <div className="flex items-center gap-4 py-4 border-t border-slate-100 text-slate-500 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
                    </svg> 4 Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4L8 6m9 13v2M2 12h20M7 19v2M9 5L7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                    </svg> 3 Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Zm-6.8-2.8l2-2m-5-1l2-2m-5-1l2-2m7 11l2-2"></path>
                    </svg> 2,500 sqft
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-[100%] h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">FOR RENT</div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">Skyline Apartment</h3>
                    <p className="text-sm text-slate-500">New York, NY</p>
                  </div>
                  <p className="text-lg font-semibold text-indigo-600">$4,500<span className="text-xs text-slate-400 font-normal">/mo</span></p>
                </div>
                <div className="flex items-center gap-4 py-4 border-t border-slate-100 text-slate-500 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
                    </svg> 2 Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4L8 6m9 13v2M2 12h20M7 19v2M9 5L7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                    </svg> 2 Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Zm-6.8-2.8l2-2m-5-1l2-2m-5-1l2-2m7 11l2-2"></path>
                    </svg> 1,200 sqft
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" className="w-[100%] h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-emerald-600">NEW</div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">Seaside Retreat</h3>
                    <p className="text-sm text-slate-500">Miami, FL</p>
                  </div>
                  <p className="text-lg font-semibold text-indigo-600">$1.8M</p>
                </div>
                <div className="flex items-center gap-4 py-4 border-t border-slate-100 text-slate-500 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
                    </svg> 3 Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4L8 6m9 13v2M2 12h20M7 19v2M9 5L7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                    </svg> 3 Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Zm-6.8-2.8l2-2m-5-1l2-2m-5-1l2-2m7 11l2-2"></path>
                    </svg> 2,100 sqft
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. New Developments (Spotlight) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <span className="text-indigo-400 font-semibold tracking-wider text-xs uppercase mb-4 block">Coming Soon</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">The Pinnacle Residences</h2>
            <p className="text-slate-300 text-lg mb-8 font-light">Experience the height of luxury in our newest downtown development. Featuring panoramic views, smart home integration, and world-class amenities.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors">
                Schedule Viewing
              </button>
              <button className="px-6 py-3 border border-slate-600 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Neighborhood Guide */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Explore Neighborhoods</h2>
            <p className="text-slate-500 mt-4">Discover the perfect location for your lifestyle.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="group relative aspect-square rounded-xl overflow-hidden">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" className="w-[100%] h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Manhattan</span>
              </div>
            </a>
            <a href="#" className="group relative aspect-square rounded-xl overflow-hidden">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg" className="w-[100%] h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Brooklyn</span>
              </div>
            </a>
            <a href="#" className="group relative aspect-square rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-[100%] h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Queens</span>
              </div>
            </a>
            <a href="#" className="group relative aspect-square rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-[100%] h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Jersey City</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Stats / Numbers */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">150+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">12</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Years Active</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">98%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">$500M</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Sales Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Meet the Agents */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-12">Meet the Experts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Agent 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-24 h-24 rounded-full mx-auto object-cover mb-4" />
              <h3 className="font-semibold text-slate-900">Michael Ross</h3>
              <p className="text-sm text-indigo-600 mb-4">Senior Broker</p>
              <div className="flex justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                      <circle cx="4" cy="4" r="2"></circle>
                    </g>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            {/* Agent 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp" className="w-24 h-24 rounded-full mx-auto object-cover mb-4" />
              <h3 className="font-semibold text-slate-900">Sarah Chen</h3>
              <p className="text-sm text-indigo-600 mb-4">Luxury Specialist</p>
              <div className="flex justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                      <circle cx="4" cy="4" r="2"></circle>
                    </g>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            {/* Agent 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-24 h-24 rounded-full mx-auto object-cover mb-4" />
              <h3 className="font-semibold text-slate-900">David Miller</h3>
              <p className="text-sm text-indigo-600 mb-4">Commercial Lead</p>
              <div className="flex justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                      <circle cx="4" cy="4" r="2"></circle>
                    </g>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-16 text-center">What our clients say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                </svg>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">"Skyline Dwellings made finding our dream home incredibly easy. Their attention to detail and market knowledge is unmatched."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">JP</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">James Peterson</p>
                  <p className="text-xs text-slate-500">Bought in Brooklyn</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                </svg>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">"Professional, courteous, and efficient. Sold my property in less than 2 weeks above asking price."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">AL</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Anna Lawrence</p>
                  <p className="text-xs text-slate-500">Sold in Manhattan</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 md:hidden lg:block">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                </svg>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">"The rental team found me an amazing loft that wasn't even listed on the major sites yet."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">MR</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Mark Roberts</p>
                  <p className="text-xs text-slate-500">Rented in Queens</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Our Services */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pr-6 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24" className="text-indigo-400 mb-4">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6"></path>
                  <circle cx="7.5" cy="15.5" r="5.5"></circle>
                </g>
              </svg>
              <h3 className="text-lg font-semibold mb-2">Buy a Home</h3>
              <p className="text-sm text-slate-400">Find your place with an immersive photo experience and the most listings.</p>
            </div>
            <div className="px-6 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24" className="text-indigo-400 mb-4">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <h3 className="text-lg font-semibold mb-2">Sell a Home</h3>
              <p className="text-sm text-slate-400">We provide premium marketing to sell your home fast and for top dollar.</p>
            </div>
            <div className="px-6 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24" className="text-indigo-400 mb-4">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M12 10h.01M12 14h.01M12 6h.01M16 10h.01M16 14h.01M16 6h.01M8 10h.01M8 14h.01M8 6h.01M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                  <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                </g>
              </svg>
              <h3 className="text-lg font-semibold mb-2">Rent a Home</h3>
              <p className="text-sm text-slate-400">We’re creating a seamless online experience from shopping to signing.</p>
            </div>
            <div className="pl-6 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" viewBox="0 0 24 24" className="text-indigo-400 mb-4">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </g>
              </svg>
              <h3 className="text-lg font-semibold mb-2">Management</h3>
              <p className="text-sm text-slate-400">Property management services for investors and landlords.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Blog / News */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-12">Market Insights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="#" className="group block">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1591208854190-d08149f6ecd7?w=1600&q=80" className="group-hover:scale-105 transition-transform duration-500 w-[100%] h-full object-cover" />
              </div>
              <p className="text-xs text-indigo-600 font-semibold mb-2">Trends</p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Housing Market Forecast 2024</h3>
              <p className="text-sm text-slate-500">What experts are predicting for interest rates and inventory.</p>
            </a>
            <a href="#" className="group block">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1718071101959-34de414a0e0f?w=1600&q=80" className="group-hover:scale-105 transition-transform duration-500 w-[100%] h-full object-cover bg-center" />
              </div>
              <p className="text-xs text-indigo-600 font-semibold mb-2">Design</p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Top Interior Styles for Resale</h3>
              <p className="text-sm text-slate-500">How to stage your home to attract high-value buyers.</p>
            </a>
            <a href="#" className="group block">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-[100%] h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-xs text-indigo-600 font-semibold mb-2">Finance</p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">First Time Buyer Guide</h3>
              <p className="text-sm text-slate-500">Everything you need to know about mortgages and down payments.</p>
            </a>
          </div>
        </div>
      </section>

      {/* 13. Newsletter / Final CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">Join our exclusive network</h2>
          <p className="text-slate-500 mb-8">Get the latest listings and market news delivered straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm" />
            <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors text-sm">Subscribe</button>
          </form>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-900">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M10 12h4m-4-4h4m0 13v-3a2 2 0 0 0-4 0v3"></path>
                    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                  </g>
                </svg>
                <span className="font-semibold text-slate-900 tracking-tight text-lg">Skyline Dwellings</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs mb-6">Real estate is about more than just four walls. It's about finding your place in the community. Let us guide you home.</p>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                    </g>
                  </svg>
                </a>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                      <circle cx="4" cy="4" r="2"></circle>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Press</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Guides</a></li>
                <li><a href="#" className="hover:text-indigo-600">Mortgage Calculator</a></li>
                <li><a href="#" className="hover:text-indigo-600">Agent Directory</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2024 Skyline Dwellings. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Designed with care</span>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="12" height="12" viewBox="0 0 24 24" className="text-red-400">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;