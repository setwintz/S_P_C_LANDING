import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '../pages/Landing/Section';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Section2 from '../pages/Landing/Section2';
import { Activity } from 'lucide-react';
import { useSelector } from 'react-redux';
import { setFalseForShow, setTrueForShow } from '../store/reducer/layout/showTabSlice';
import { useDispatch } from 'react-redux';
import images from '../constant/images';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'


const Home = () => {

  const location = useLocation();

  const pathname = location?.pathname;
  console.log("pathname", pathname?.split("/")[2]);





  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Education');

  const store = useSelector((state) => state.showTabSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const containerRef = useRef(null);
  const [showFirstNav, setShowFirstNav] = useState(true);
  const [makeNavBlur, setMakeNavBlur] = useState(false);
  const lastScrollY = useRef(0);

  // Improved scroll handling (standard real-world pattern)
  // - Hide first nav on scroll down
  // - Show first nav on scroll up
  // - Always show near the top to prevent unwanted hiding at page start
  // - Small threshold to reduce flicker on minor scroll changes
  const handleScroll = () => {
    const currentScrollY = containerRef.current.scrollTop;

    // Blur effect after small scroll
    if (currentScrollY > 12) {
      setMakeNavBlur(true);
    } else {
      setMakeNavBlur(false);
    }

    // Always show first nav near the very top
    if (currentScrollY <= 50) {
      setShowFirstNav(true);
      dispatch(setTrueForShow());
      lastScrollY.current = currentScrollY;
      return;
    }

    // Detect direction with small threshold to avoid flicker
    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down → hide first nav
      setShowFirstNav(false);
      dispatch(setFalseForShow());
    } else if (currentScrollY < lastScrollY.current - 10) {
      // Scrolling up → show first nav
      setShowFirstNav(true);
      dispatch(setTrueForShow());
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const categories = ['Education', 'Business(Retail)', 'Business(Distributor)', 'Business(Enterprise)', 'Medical'];

  const products = {
    'Education': [
      {
        name: 'School ERP',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
        ),
        desc: 'Comprehensive management system for schools and educational institutions.',
        to: "schoolerp"
      },
      {
        name: 'Coaching ERP',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        ),
        desc: 'Streamlined tools for coaching centers and tutoring services.'
      },
      {
        name: 'College ERP',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        ),
        desc: 'Integrated solutions for college administration and student management.'
      },
      {
        name: 'University ERP',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        ),
        desc: 'Enterprise-level ERP for universities with advanced features.'
      },
    ],
    'Business(Retail)': [
      {
        name: 'Pharmacy software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        ),
        desc: 'Efficient inventory and sales management for pharmacies.'
      },
      {
        name: 'Kirana software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        ),
        desc: 'Tailored POS and stock control for grocery stores.'
      },
      {
        name: 'Restaurant software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M11 4H4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4h-7"></path>
            <rect x="6" y="2" width="12" height="4" rx="1" ry="1"></rect>
          </svg>
        ),
        desc: 'Order management and billing for restaurants and cafes.'
      },
      {
        name: 'Garment software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        ),
        desc: 'Inventory tracking and sales for clothing and garment shops.'
      },
    ],
    'Business(Distributor)': [
      {
        name: 'Pharmacy software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        ),
        desc: 'Efficient inventory and sales management for pharmacies.'
      },
      {
        name: 'Kirana software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        ),
        desc: 'Tailored POS and stock control for grocery stores.'
      },
      {
        name: 'Restaurant software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M11 4H4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4h-7"></path>
            <rect x="6" y="2" width="12" height="4" rx="1" ry="1"></rect>
          </svg>
        ),
        desc: 'Order management and billing for restaurants and cafes.'
      },
      {
        name: 'Garment software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        ),
        desc: 'Inventory tracking and sales for clothing and garment shops.'
      },
    ],
    'Business(Enterprise)': [
      {
        name: 'Pharmacy software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        ),
        desc: 'Efficient inventory and sales management for pharmacies.'
      },
      {
        name: 'Kirana software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
        ),
        desc: 'Tailored POS and stock control for grocery stores.'
      },
      {
        name: 'Restaurant software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M11 4H4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4h-7"></path>
            <rect x="6" y="2" width="12" height="4" rx="1" ry="1"></rect>
          </svg>
        ),
        desc: 'Order management and billing for restaurants and cafes.'
      },
      {
        name: 'Garment software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        ),
        desc: 'Inventory tracking and sales for clothing and garment shops.'
      },
    ],
    'Medical': [
      {
        name: 'Hospital ERP',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 2v4M12 10v4M12 18v4M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
            <path d="M8 12h8"></path>
          </svg>
        ),
        desc: 'Complete management for hospitals and healthcare facilities.'
      },
      {
        name: 'Clinic Software',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM7 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path>
          </svg>
        ),
        desc: 'Patient records and appointment scheduling for clinics.'
      },
    ],
  };





  return (
    <div ref={containerRef} className=" overflow-y-auto overflow-x-hidden w-[100%] bg-gray-50 text-slate-600 antialiased ">
      {/* 1. Navigation */}
      {/* <nav className={`sticky relative ${showFirstNav ? "" : ""} top-0 w-[100%] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60`}> */}
      {/* <nav className={`sticky relative top-0 w-[100%] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 overflow-hidden transition-all duration-300 ease-in-out ${showFirstNav ? 'h-16 opacity-100' : 'h-0 opacity-0'} ${!showFirstNav ? 'pointer-events-none' : ''}`}> */}
      <nav className={`sticky relative top-0 w-[100%] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 ${!isProductsOpen ? 'overflow-hidden' : ''} transition-all duration-300 ease-in-out ${showFirstNav ? 'h-16 opacity-100' : 'h-0 opacity-0'} `}>


        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            <div className="flex items-center gap-4 cursor-pointer">
              <div className='flex-shrink-0 flex items-center gap-2 cursor-pointer'>

                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-900">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M10 12h4m-4-4h4m0 13v-3a2 2 0 0 0-4 0v3"></path>
                    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                  </g>
                </svg>
                <span className="font-semibold text-gray-800 tracking-tight text-lg">Setwintz</span>

              </div>

            </div>


            <div className="hidden md:flex space-x-8 items-center">

              <button onClick={() => setIsProductsOpen(!isProductsOpen)} className="text-sm flex items-center gap-1 font-medium text-slate-600 hover:text-indigo-600 transition-colors">Products <span className={`${isProductsOpen ? "rotate-180" : ""}`}><MdOutlineKeyboardArrowDown size={20} /></span></button>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Partner</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">we are</a>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isProductsOpen && (
              <>
                {/* Backdrop */}
                {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                onClick={() => setIsProductsOpen(false)}
              /> */}

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="max-w-7xl  top-full  bg-white border-b border-slate-400 shadow-xl z-40"
                >
                  <div className=" mx-auto  relative">


                    <div className='bg-primary/5 border-b-2 px-6 py-4 lg:px-8 flex justify-between items-center'>

                      <h3 className="text-base text-gray-800 font-semibold tracking-wide text-slate-500 uppercase">
                        Our Soulutions
                      </h3>

                      <button
                        onClick={() => setIsProductsOpen(false)}
                        className=" top-6 right-6 rounded-full p-2 text-slate-500 hover:text-gray-800 hover:bg-slate-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>

                    </div>






                    <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-8 py-10">





                      <aside className="w-[100%] lg:w-1/4 border-r border-r-gray-300 pr-2">
                        <h3 className="text-sm font-semibold tracking-wide text-gray-800 uppercase mb-5">
                          Categories
                        </h3>

                        <ul className="space-y-1">
                          {categories.map((cat) => (
                            <li key={cat}>
                              <button
                                onClick={() => setActiveCategory(cat)}
                                className={`w-[100%] flex items-center px-4 py-2.5 rounded-lg text-base font-medium transition text-gray-700
                        ${activeCategory === cat
                                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-gray-800'
                                  }
                      `}
                              >
                                {cat}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </aside>


                      <section className="w-[100%] lg:w-3/4">
                        <h3 className="text-lg font-semibold mb-6 text-gray-800">
                          {activeCategory}
                        </h3>

                        {products[activeCategory]?.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products[activeCategory].map((prod) => (
                              <motion.div
                                key={prod.name}
                                whileHover={{ y: -4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="group cursor-pointer bg-primary/5 border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                                onClick={() => {
                                  navigate(`${prod.to}`);
                                  setIsProductsOpen(false)
                                }
                                }
                              >
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600  mb-4 group-hover:bg-indigo-600/20  group-hover:text-white transition">
                                  {prod.icon}
                                </div>

                                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                                  {prod.name}
                                </h4>

                                <p className="text-sm text-slate-500 leading-relaxed">
                                  {prod.desc}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">
                            No products available in this category yet.
                          </p>
                        )}
                      </section>
                    </div>
                  </div>
                </motion.div>

              </>
            )}
          </AnimatePresence>



        </div>



      </nav>



      {/* <nav className="flex  sticky top-10  items-center justify-between border-b border-slate-100 px-6 py-5"> */}


      {
        pathname?.split("/")[2] == "schoolerp" ?

          <nav className={`sticky ${showFirstNav ? 'top-20' : 'top-0'} ${!showFirstNav ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''} z-10  transition-all duration-300 ease-in-out  `}>

            <div className={`max-w-7xl bg-white/80 backdrop-blur-md shadow-sm py-4   mx-auto px-4 sm:px-6 lg:px-8 ${showFirstNav ? 'border border-primary/50' : ''}   rounded-2xl`}>
              <div className="flex justify-between  items-center">

                <div className="flex cursor-pointer items-center gap-2 group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm transition-colors group-hover:bg-blue-600">
                    <Activity className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-gray-800">School ERP</span>
                </div>

                <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
                  <Link to={'/landing/schoolerp/solution'} className="transition-colors hover:text-gray-800">Solutions</Link>
                  <a href="#" className="transition-colors hover:text-gray-800">Pricing</a>
                  <a href="#" className="transition-colors hover:text-gray-800">Resources</a>
                  <a href="#" className="transition-colors hover:text-gray-800">Company</a>
                </div>

                <div className="flex items-center gap-4">
                  <a href="#" className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-gray-800 sm:block">
                    Log in
                  </a>
                  <a
                    href="#"
                    className="twoD-style-button-three"
                  >
                    Sign up
                  </a>
                </div>

              </div>



            </div>

          </nav>


          : ""
      }


      <Outlet />


      {/* 14. Footer */}
      <footer
        className="
    relative
    border-t border-slate-200
    pt-16 pb-8
    bg-cover bg-center bg-no-repeat
  "
        style={{
          backgroundImage: `url(${images?.footerBg2})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" className="text-indigo-400">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M10 12h4m-4-4h4m0 13v-3a2 2 0 0 0-4 0v3"></path>
                    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
                  </g>
                </svg>
                <span className="font-semibold text-white tracking-tight text-lg">Setwintz</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs mb-6">Real estate is about more than just four walls. It's about finding your place in the community. Let us guide you home.</p>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                    </g>
                  </svg>
                </a>
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-indigo-400 hover:text-indigo-600 transition-colors">
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
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">About Us</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Careers</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Press</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Blog</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Guides</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Mortgage Calculator</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Agent Directory</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Terms of Service</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Privacy Policy</a></li>
                <li><a href="#" className=" text-gray-400 hover:text-indigo-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 Setwintz. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className='text-gray-400'>Designed with care</span>
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


