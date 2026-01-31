

import React, { useEffect, useRef, useState } from "react";
// import { Logo } from "./Logo";
import Logo from "./Logo"
import SimpleBar from "simplebar-react";
import NavMenu from "./NavMenu";
import useWidth from "../../Hooks/useWidth";
import useDarkmode from "../../Hooks/useDarkMode";
import customLogo from "../../assets/logo/logo2.png";
import logo from "../../assets/logo/logo.png"
import images from "../../constant/images"
import "../../App.css"
import useNavbarStyleType from "../../Hooks/useNavbarStyleType";
import useNavbarType from "../../Hooks/useNavbarType";
import useNavbarColorType from "../../Hooks/useNavbarColorType";
import { FaCog } from "react-icons/fa";
import { SiFsecure } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ isCollapsed, setIsCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { width, breakpoints } = useWidth();
  const [navbarStyleType] = useNavbarStyleType();
  const [navbarType] = useNavbarType();
  const [navbarColorType] = useNavbarColorType();
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const [isDark] = useDarkmode();
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll to show/hide the shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current?.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const collapsed = window.localStorage.getItem("sidebarCollapsed");

  const getNavbarClasses = () => {
    switch (navbarType) {
      case "sticky":
        return "";
      case "static":
        return "";
      case "floating":
        return "my-3 md:mx-4 mx-0";
      default:
        return "";
    }
  };

  const getNavbarStyleClasses = () => {
    switch (navbarStyleType) {
      case "curverd":
        return "rounded-2xl    ";
      case "square":
        return "rounded-none";
      default:
        return "rounded-none";
    }
  };

  const getNavbarColorStyleClasses = () => {
    switch (navbarColorType) {
      case "white":
        return "bg-white dark:bg-upperCardBgDark shadow-custom-light   ";
      case "transparent":
        if (isHovered) {
          return "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg";
        }
      return " shadow-none  ";
      case "black":
        return "bg-[#1c212c]"
      default:
        return "rounded-none";
    }
  };

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getNavbarBottomColorStyleClasses = () => {
    switch (navbarColorType) {
      case "white":
        return "bg-upperCardBgLight dark:bg-upperCardBgLight/10    ";
      case "transparent":
        return "bg-upperCardBgLight dark:bg-upperCardBgDark  ";
      case "black":
        return "bg-black text-white dark:bg-upperCardBgDark "
      default:
        return "bg-upperCardBgLight dark:bg-upperCardBgDark ";
    }
  };

  // Effective state for rendering content (texts/icons)
  const effectiveCollapsed = isCollapsed && !isHovered;

  return (
    <>
      {width >= breakpoints.sm && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed left-0 top-0 bottom-0 z-[1000] overflow-x-hidden overflow-y-hidden transition-all duration-300 ease-in-out ${effectiveCollapsed ? 'w-[3.8rem]' : 'w-[14rem]'} ${isDark ? "" : ""} ${getNavbarStyleClasses()} ${getNavbarClasses()} ${getNavbarColorStyleClasses()}`}
        >
          {/* Logo Section */}
          <div className={`h-[6%] flex justify-center items-center px-2`}>
            <img
              src={isDark || navbarColorType == "black" ? effectiveCollapsed ? images?.setwintzShort : images.setwintzDark : effectiveCollapsed ? images?.setwintzShort : images.setwintzLight}
              alt="Company Logo"
              className={`object-contain ${width < breakpoints.md || effectiveCollapsed ? "w-[80%] h-[80%]" : "w-[200%] h-[100%]"}`}
            />
          </div>

          {/* Navigation Section */}
          <div className="h-[82%] custom-scrollbar overflow-y-auto">
            <div className="">
              <NavMenu isCollapsed={effectiveCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>
          </div>

          <div className={`h-[12%] ${getNavbarBottomColorStyleClasses()} flex flex-col justify-around py-1`}>
            <div>
              <button
                className={`flex w-[100%] items-center gap-1 font-medium rounded-lg text-sm px-3 text-center ${width < breakpoints.md || effectiveCollapsed ? "flex-col justify-center gap-0" : "gap-3"}`}
                onClick={() => navigate("/system/setting")}
              >
                <FaCog className='text-gray-600 text-[1rem] dark:text-white' />
                {!(width < breakpoints.md || effectiveCollapsed) && (
                  <span className="text-gray-600 dark:text-white">Setting</span>
                )}
              </button>
            </div>
            <div className="h-[.10rem] bg-gray-400"></div>
            <div>
              <button
                className={`flex w-[100%] items-center gap-1 font-medium rounded-lg text-sm px-3 text-center ${width < breakpoints.md || effectiveCollapsed ? "flex-col justify-center gap-0" : "gap-3"}`}
              >
                <FiLogOut className='text-gray-600 text-[1.2rem] dark:text-white' />
                {!(width < breakpoints.md || effectiveCollapsed) && (
                  <span className="text-gray-600 dark:text-white">logout</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};