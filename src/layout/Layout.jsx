import { useEffect, useRef, useState } from "react";
import useWidth from "../Hooks/useWidth";
import useDarkmode from "../Hooks/useDarkMode";
import { Sidebar } from "../components/SideBar/Sidebar";
import BottomTab from "../components/BottomTab/BottomTab";
import Header from "../components/Header/Header";
import MainContent from "../components/MainContent/MainContent";
import { FiX } from "react-icons/fi";
import NavType from "../components/NavType/NavType";
import NavbarStyleType from "../components/NavType/NavbarStyleType";
import { useDispatch, useSelector } from "react-redux";
import NavColorType from "../components/NavType/NavColorType";
import { IoMdSettings } from "react-icons/io";
import Footer from "../components/Footer/Footer";
import { IoMdReturnLeft } from "react-icons/io";
import { BsQuestionLg } from "react-icons/bs";
import { GrAnnounce } from "react-icons/gr";
import { PiTelevisionDuotone } from "react-icons/pi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoMdReturnRight } from "react-icons/io";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setFalseForShow, setTrueForShow } from "../store/reducer/layout/showTabSlice";
import { useLocation } from "react-router-dom";

const removeBottomTabOn = [
  "/create/admin",
  "/create/unit"
]

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { width, breakpoints } = useWidth();
  const [isDark, setDarkMode] = useDarkmode();
  const [showBottom, setShowBottom] = useState(true);
  const containerRef = useRef(null);
  const [showBottomTab, setShowBottomTab] = useState(true);
  const [makeNavBlur, setMakeNavBlur] = useState(false);
  const lastScrollY = useRef(0);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  const [isOnCreatePage, setIsOnCreatePage] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isOffcanvas2Open, setIsOffcanvas2Open] = useState(false);
  const offcanvasRef = useRef(null);
  const offcanvasRef2 = useRef(null);

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Handle scroll for bottom tab visibility
  const handleScroll = () => {
    const currentScrollY = containerRef.current.scrollTop;
    if (currentScrollY > 12) {
      setMakeNavBlur(true)
    } else {
      setMakeNavBlur(false)
    }
    if (currentScrollY < lastScrollY.current) {
      setShowBottomTab(true);
      dispatch(setTrueForShow());
    } else {
      setShowBottomTab(false);
      dispatch(setFalseForShow());
    }
    lastScrollY.current = currentScrollY;
  };

  // Scroll event listener
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

  // Handle outside click to close offcanvas
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
        setIsOffcanvasOpen(false);
      }
    };
    if (isOffcanvasOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOffcanvasOpen]);

  useEffect(() => {
    const handleOutsideClick2 = (event) => {
      if (offcanvasRef2.current && !offcanvasRef2.current.contains(event.target)) {
        setIsOffcanvas2Open(false);
      }
    };
    if (isOffcanvas2Open) {
      document.addEventListener("mousedown", handleOutsideClick2);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick2);
    };
  }, [isOffcanvas2Open]);

  // Toggle offcanvas
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen((prev) => !prev);
  };

  const toggleOffcanvas2 = () => {
    setIsOffcanvas2Open((prev) => !prev);
  };

  // Set theme to light or dark
  const handleThemeChange = (theme) => {
    setDarkMode(theme === "dark");
  };

  useEffect(() => {
    if (removeBottomTabOn.includes(location?.pathname)) {
      setShowBottom(false)
    } else {
      setShowBottom(true)
    }
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [location])

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="relative">
      {/* sidebar */}
      <Sidebar makeNavBlur={makeNavBlur}  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} toggleSidebar={toggleSidebar} />

      {/* middlebar */}
      <div
        className={`flex-col overflow-y-auto relative transition-all duration-300 h-full ${ width <= breakpoints.sm ? "ml-[0rem]" : isCollapsed ? 'ml-[3.8rem]' : 'ml-[14rem]'}`}
        ref={containerRef}
      >
        {/* header */}
        <div className={`w-[100%]`}>
          <Header show={showBottomTab} makeNavBlur={makeNavBlur} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} toggleSidebar={toggleSidebar} toggleOffcanvas1={toggleOffcanvas} toggleOffcanvas2={toggleOffcanvas2} />
          <div className="flex relative">
            {/* main content */}
            <MainContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} toggleSidebar={toggleSidebar} />
          </div>
          {/* Footer */}
          {/* <Footer isCollapsed={isCollapsed} isOnCreatePage={isOnCreatePage} setIsCollapsed={setIsCollapsed} toggleSidebar={toggleSidebar} /> */}
        </div>

        {/* floats */}
        {
          width < breakpoints.sm ? "" :
            <div className="fixed bottom-[1%] right-2">
              <div className="fixed top-[60%] right-4">
                <button
                  onClick={toggleOffcanvas}
                  className="p-2 flex flex-col justify-center items-center rounded-md bg-white dark:bg-upperCardBgDark border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                  aria-label="Open settings"
                >
                  <IoMdSettings className="h-6 w-6 text-gray-600 dark:text-white animate-spin" />
                  <span className="text-sm">Theme</span>
                </button>
              </div>
            </div>
        }
        {
          width < breakpoints.sm ? "" : <div className="fixed bottom-[1%] right-2">
            <button
              onClick={toggleOffcanvas2}
              className="p-2 rounded-md   transition-colors"
              aria-label="Open settings"
            >
              <IoMdReturnLeft className=" rounded-tl-2xl rounded-bl-2xl px-2 text-[2.5rem] bg-white dark:bg-upperCardBgDark border dark:border-gray-600 focus:outline-none focus:ring-2 text-gray-600 dark:text-white animate-bounce" />
            </button>
          </div>
        }

        {/* bottom tab */}
        {width < breakpoints.sm && showBottom ? <BottomTab show={showBottomTab} /> : ""}
      </div>

      {/* Offcanvas */}
      <div
        className={`fixed inset-y-0 right-0 lg:w-[30vw] md:w-[40vw] w-[70vw] h-full overflow-auto bg-cardBgLight dark:bg-cardBgDark shadow-custom-light transform transition-transform duration-300 ease-in-out z-[9999] ${isOffcanvasOpen ? "translate-x-0" : "translate-x-full"}`}
        ref={offcanvasRef}
        aria-hidden={!isOffcanvasOpen}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="md:text-lg text-sm font-semibold text-gray-800 dark:text-gray-400">Layout & Theme Settings</h2>
          <button
            onClick={toggleOffcanvas}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close settings"
          >
            <FiX className="md:h-6 md:w-6 h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-500">Theme</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleThemeChange("light")}
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 transition-colors ${!isDark ? "border-blue-500 bg-gray-100" : "border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700"}`}
                aria-label="Select light theme"
              >
                <div className="w-12 h-12 bg-white border border-gray-300 rounded-md"></div>
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 transition-colors ${isDark ? "border-blue-500 bg-gray-800" : "border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700"}`}
                aria-label="Select dark theme"
              >
                <div className="w-12 h-12 bg-gray-900 border border-gray-600 rounded-md"></div>
              </button>
            </div>
            <div className="my-10">
              <NavColorType />
            </div>
            <div className="my-10">
              <NavbarStyleType />
            </div>
            <div className="my-10">
              <NavType />
            </div>
          </div>
        </div>
      </div>

      {/* offcanvas 2 */}
      <div
        className={`fixed inset-y-0 right-0 xl:w-[4vw] lg:w-[5vw] md:w-[12vw] w-[15vw] h-full overflow-auto bg-cardBgLight dark:bg-cardBgDark shadow-custom-light transform transition-transform duration-300 ease-in-out z-[1002] ${isOffcanvas2Open ? "translate-x-0" : "translate-x-full"}`}
        ref={offcanvasRef2}
        aria-hidden={!isOffcanvas2Open}
      >
        <div className="flex flex-col h-full">
          <header className="flex justify-center items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleOffcanvas2}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Close sidebar"
            >
              <IoMdReturnRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </header>
          <nav className="flex flex-col p-4 space-y-4" aria-label="Sidebar navigation">
            <Tippy content="Help & FAQ" placement="left" arrow={true} animation="fade">
              <button
                className="flex items-center justify-center w-[100%] p-1 bg-orange-700 rounded-md hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                aria-label="Help & FAQ"
              >
                <BsQuestionLg className="text-white text-[1.5rem]" />
              </button>
            </Tippy>
            <Tippy className="" content="Announcements" placement="left" arrow={true} animation="fade">
              <button
                className="flex items-center justify-center w-[100%] p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-label="Announcements"
              >
                <GrAnnounce className="text-gray-600 dark:text-gray-300 text-[1.8rem]" />
              </button>
            </Tippy>
            <Tippy content="Live Streams" placement="left" arrow={true} animation="fade">
              <button
                className="flex items-center justify-center w-[100%] p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-label="Live Streams"
              >
                <PiTelevisionDuotone className="text-gray-600 dark:text-gray-300 text-[1.8rem]" />
              </button>
            </Tippy>
            <Tippy content="Chat & Messages" placement="left" arrow={true} animation="fade">
              <button
                className="flex items-center justify-center w-[100%] p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-label="Chat & Messages"
              >
                <IoChatboxEllipsesOutline className="text-gray-600 dark:text-gray-300 text-[1.8rem]" />
              </button>
            </Tippy>
          </nav>
        </div>
      </div>

      {/* Overlay when offcanvas is open */}
      {isOffcanvasOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1001]"
          onClick={toggleOffcanvas}
          aria-hidden="true"
        ></div>
      )}

      {isOffcanvas2Open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1001]"
          onClick={toggleOffcanvas2}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Layout;

