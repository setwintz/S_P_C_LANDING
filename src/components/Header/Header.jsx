

import { useEffect, useRef, useState } from "react";
import { FaBell, FaCog, FaExpand, FaCompress, FaIdBadge } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import logo from "../../assets/logo/logo.png";
import logoWhite from "../../assets/logo/logo.png";
import images from "../../constant/images";
import useWidth from "../../Hooks/useWidth";
import useDarkmode from "../../Hooks/useDarkMode";
import useNavbarType from "../../Hooks/useNavbarType";
import useNavbarStyleType from "../../Hooks/useNavbarStyleType";
import { useDispatch, useSelector } from "react-redux";
import { FaLifeRing } from "react-icons/fa";
import { logOut } from "../../store/reducer/auth/authCustomerSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiCommand } from "react-icons/bi";
import useNavbarColorType from "../../Hooks/useNavbarColorType";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

import {
    FaUser,
    FaSignOutAlt,
    FaBook,
    FaQuestionCircle,
    FaComments,
    FaVideo,
    FaRocket,
    FaEnvelope,
    FaCalendarCheck,
    FaUserTie,
    FaStar,
    FaPhone,
    FaMobileAlt,
    FaLaptop,
    FaDownload,
    FaKeyboard,
    FaLightbulb,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { BiSolidWidget } from "react-icons/bi";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";






const notificationCount = 3;

const Header = ({ isCollapsed, setIsCollapsed, toggleSidebar, makeNavBlur, show, toggleOffcanvas1, toggleOffcanvas2 }) => {
    const [isDark, setDarkMode] = useDarkmode();
    const [navbarType] = useNavbarType();
    const [navbarStyleType] = useNavbarStyleType();
    const [navbarColorType] = useNavbarColorType();

    const { width, breakpoints } = useWidth();
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    // const { organization } = useSelector((state) => state?.organizationSlice);
    const { tenant: organization } = useSelector((state) => state?.tenantSlice);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const offcanvasRef = useRef(null);

    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    // console.log("clientUser", clientUser);



    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Toggle full-screen mode
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error enabling full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`Error exiting full-screen mode: ${err.message}`);
            });
        }
    };

    // Handle full-screen change and Escape key
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleKeydown = (event) => {
            if (event.key === "Escape" && isFullscreen) {
                document.exitFullscreen().catch((err) => {
                    console.error(`Error exiting full-screen mode: ${err.message}`);
                });
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isFullscreen]);

    // Handle dropdown click outside


    // Collapse sidebar on small screens
    useEffect(() => {
        if (width < breakpoints.lg) {
            setIsCollapsed(true);
        }
    }, [width, breakpoints.lg, setIsCollapsed]);



    const toggleOffcanvas = () => {
        setIsOffcanvasOpen((prev) => !prev);
    };


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

    const getNavbarClasses = () => {
        switch (navbarType) {
            case "sticky":
                return "sticky top-0 z-[999]  mx-0  rounded-none  border-b-[0.5px] border-slate-400 dark:border-blue-gray-800";
            case "static":
                return "relative z-[999]  mx-0  rounded-none  border-b-[0.5px] border-slate-400 dark:border-blue-gray-800";
            case "floating":
                return "sticky z-[999] md:top-3 top-0md:mx-4 mx-2 x  border-[1px] border-slate-400 dark:border-blue-gray-800 bg-opacity-90 backdrop-blur-sm ml-8";
            default:
                return "sticky top-0 z-[999] md:mx-2 mx-0  rounded-none  border-b-[0.5px] border-slate-400 dark:border-blue-gray-800";
        }
    };

    const getNavbarStyleClasses = () => {
        switch (navbarStyleType) {
            case "curverd":
                return "md:rounded-full";
            case "square":
                return "rounded-none";
            default:
                return "rounded-none";
        }
    };

    // Fallback profile image
    const profileImage = images?.user2 || "https://via.placeholder.com/32";



    function handleSignOut() {
        localStorage.removeItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN")
        localStorage.removeItem("SAAS_ERP1_SUPER_ADMIN_INFO")
        localStorage.removeItem("SAAS_ERP1_SUPER_ADMIN_EXPIRY_TIME");
        localStorage.clear();
        dispatch(logOut());
        navigate("/login");
    }


    {/* Overlay when offcanvas is open */ }
    {
        isOffcanvasOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
                onClick={toggleOffcanvas}
                aria-hidden="true"
            />
        )
    }

    const getNavbarColorStyleClasses = () => {
        switch (navbarColorType) {
            case "white":
                return "shadow-custom-light bg-white dark:bg-upperCardBgDark";

            case "transparent":
                if (makeNavBlur) {
                    return "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg";
                }
                return "bg-transparent shadow-none";

            case "black":
                return "shadow-custom-light bg-white dark:bg-upperCardBgDark"; // or your dark gradient

            default:
                return "rounded-none";
        }
    };


    const animateHeader = () => {
        if (width <= breakpoints.sm) {
            return `${show ? "translate-y-0" : "-translate-y-full"}`
        }
    }



    return (
        <>

            {
                isOffcanvasOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[9999999]"
                        onClick={toggleOffcanvas}
                        aria-hidden="true"
                    />
                )
            }


            <div
                className={`${getNavbarClasses()} ${getNavbarStyleClasses()} ${getNavbarColorStyleClasses()} ${animateHeader()} transition-transform duration-300 z-[999]  h-12 flex flex-row justify-between items-center flex-shrink-0 border-b-[0.5px] ${isDark ? "border-blue-gray-800" : "border-slate-400"
                    }`}
            >
                <div className="pl-1">
                    <div className="relative w-[100%]" ref={dropdownRef}>
                        <div
                            className={`flex flex-row items-center ${width <= breakpoints.sm ? "justify-center" : "justify-start"}`}
                        >
                            {width <= breakpoints.sm ? (
                                <button
                                    type="button"
                                    className="inline-flex w-[100%] justify-center items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900"
                                    id="menu-button"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
                                // onClick={toggleDropdown}
                                >
                                    <img
                                        className="md:w-35 md:h-10 object-contain w-20 h-20"
                                        src={isDark ? logoWhite : logo}
                                        alt="Logo"
                                    />
                                    <svg
                                        className="-mr-1 h-5 w-[30px] text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <div className="flex relative items-center gap-3">
                                    <button
                                        onClick={toggleSidebar}
                                        className="twoD-style-button-one dark:border-gray-600 "
                                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                    >
                                        {isCollapsed ? (
                                            <RiArrowRightDoubleFill size={24} className="text-lg text-gray-600 dark:text-white" />
                                        ) : (
                                            <RiArrowLeftDoubleFill size={24} className="text-lg text-gray-600 dark:text-white" />
                                        )}
                                    </button>
                                    {
                                        width < breakpoints.md ? null : (
                                            <div onClick={() => navigate('/organizations')} className="bg-gradient-to-r cursor-pointer  border-2 border-primary dark:border-primaryDark shadow-lg shadow-primary/20 dark:shadow-primaryDark/30 px-4 flex items-center gap-3  rounded-md mx-2">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-xl font-bold shrink-0">
                                                    {organization?.name?.[0]?.toUpperCase()}
                                                    {organization?.name?.[1]?.toUpperCase()}
                                                </div>
                                                <div className="flex flex-col justify-center truncate">
                                                    <p className="font-semibold text-gray-900 dark:text-white text-base truncate">
                                                        {organization?.name?.toUpperCase()}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                                        {organization?.email}
                                                    </p>
                                                </div>

                                                <span className="ml-3">
                                                    <MdKeyboardDoubleArrowDown/>
                                                </span>

                                            </div>
                                        )
                                    }
                                    {/* <h2 className="text-lg text-white">Dashboard</h2> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pr-1">

                    <div className="flex justify-end items-center gap-3">

                        {
                            width < breakpoints.md ? "" :
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className={` input-base pl-8 border ${width <= breakpoints.sm ? "w-32" : "w-[20rem]"
                                            }`}
                                    />
                                    <FiSearch
                                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"
                                            }`}
                                    />
                                    <BiCommand
                                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"
                                            }`}
                                    />


                                </div>
                        }
                        {/* Bell Icon with Notification Count */}
                        <div className="relative">
                            <button className="twoD-style-button-one dark:border-gray-600" aria-label="Notifications">
                                <FaBell className="text-lg text-gray-600 dark:text-white" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                        </div>



                        {/* Settings Icon */}
                        {width >= breakpoints.md && (
                            <>
                                {/* Fullscreen Toggle Button */}
                                <button
                                    onClick={toggleFullscreen}
                                    className="twoD-style-button-one dark:border-gray-600"
                                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                >
                                    {isFullscreen ? (
                                        <FaCompress className="text-lg text-gray-600 dark:text-white" />
                                    ) : (
                                        <FaExpand className="text-lg text-gray-600 dark:text-white" />
                                    )}
                                </button>
                            </>
                        )}

                        {/* Dark Mode Toggle */}
                        {/* <div className="flex items-center">
                            <button
                                onClick={() => setDarkMode(!isDark)}
                                className="twoD-style-button-one dark:border-gray-600"
                                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {isDark ? (
                                    <CiLight className="text-lg text-gray-600 dark:text-white w-5 h-5" />
                                ) : (
                                    <MdDarkMode className="text-lg text-gray-600 dark:text-white w-5 h-5" />
                                )}
                            </button>
                        </div> */}

                        {/* User Profile Image with Dropdown */}
                        <div className="relative flex items-center" >
                            <button
                                onClick={toggleOffcanvas}
                                className=" p-[0.10rem] twoD-style-button-one dark:border-gray-600 mr-1 "
                                aria-label="User profile menu"
                            >
                                <img
                                    src={profileImage}
                                    alt="User Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offcanvas Menu */}
            <div
                className={`fixed inset-y-0 right-0 lg:w-[20vw] md:w-[40vw] w-[70vw] h-full overflow-auto bg-cardBgLight dark:bg-cardBgDark shadow-custom-light transform transition-transform duration-300 ease-in-out z-[9999999] ${isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                ref={offcanvasRef}
                aria-hidden={!isOffcanvasOpen}
            >
                {/* Header - User Info */}
                <div className="sticky top-0 bg-white dark:bg-upperCardBgDark border-b border-gray-200 dark:border-gray-800 px-6 py-5 z-10">
                    {/* <div className="flex items-center justify-between mb-4">
                        <h2 className="md:text-xl text-base font-semibold text-gray-900 dark:text-white">
                            My Profile
                        </h2>
                        <button
                            onClick={toggleOffcanvas}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            aria-label="Close menu"
                        >
                            <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div> */}

                    <div className="relative flex  items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {clientUser?.firstName?.[0]}
                            {clientUser?.lastName?.[0]}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {clientUser?.firstName} {clientUser?.lastName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {clientUser?.email}
                            </p>
                        </div>

                        <button
                            onClick={toggleOffcanvas}
                            className=" absolute -right-4 top-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            aria-label="Close menu"
                        >
                            <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            User ID: 60058747265 • Org ID: 60058747553
                        </p>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="space-y-1">
                        <Link
                            to="/account"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                        >
                            <FaIdBadge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            My Account
                        </Link>

                        <Link
                            to="/system/setting"
                            onClick={() => setIsOffcanvasOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                        >
                            <FaCog className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            Settings
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-[100%] flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                        >
                            <FaSignOutAlt className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>

                    {
                        width < breakpoints.sm ?
                            <div className="border-y py-4 border-gray-200 dark:border-gray-800">
                                <button
                                    onClick={() => {
                                        setIsOffcanvasOpen(false);
                                        toggleOffcanvas1()
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                                >
                                    <IoColorPaletteSharp className="w-5 h-5" />
                                    Theme Setting
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOffcanvasOpen(false);
                                        toggleOffcanvas2()
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                                >
                                    <BiSolidWidget className="w-5 h-5" />
                                    Widgets Pane
                                </button>
                            </div>
                            : ""
                    }


                    {/* Trial Banner */}
                    <div className="mt-5 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <p className="text-sm text-orange-800 dark:text-orange-300">
                            <strong>Your premium trial ends in 7 days.</strong>
                        </p>
                        <div className="mt-2 flex gap-3 text-sm">
                            <Link to="/billing" className="font-medium text-orange-700 dark:text-orange-400 underline">
                                Change Plan
                            </Link>
                            <span className="text-gray-400">•</span>
                            <Link to="/subscribe" className="font-medium text-orange-700 dark:text-orange-400 underline">
                                Subscribe Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaLifeRing className="w-6 h-6 text-blue-600" />
                        Support
                    </h3>

                    <div className="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3">
                            <FaLifeRing className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    support@aestree.com
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    We're here to help
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1 text-sm">
                        {[
                            { icon: FaBook, label: "Help Documents" },
                            { icon: FaQuestionCircle, label: "FAQs" },
                            { icon: FaComments, label: "Community Forum" },
                            { icon: FaVideo, label: "Video Tutorials" },
                            { icon: FaRocket, label: "Explore Features" },
                            { icon: FaKeyboard, label: "Keyboard Shortcuts" },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <item.icon className="w-5 h-5 text-blue-600" />
                                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Need Assistance */}
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Need Assistance?
                    </h3>
                    <div className="space-y-1 text-sm">
                        {[
                            { icon: FaEnvelope, label: "Send us an email", color: "text-green-600" },
                            { icon: HiOutlineVideoCameraSlash, label: "Record screen & share", color: "text-purple-600" },
                            { icon: FaCalendarCheck, label: "Register for webinars", color: "text-indigo-600" },
                            { icon: FaUserTie, label: "Find an accountant", color: "text-teal-600" },
                            { icon: FaStar, label: "Early Access Features", color: "text-yellow-600" },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                            </a>
                        ))}
                    </div>

                    <div className="mt-5 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <FaPhone className="w-5 h-5 text-green-600" />
                            Talk to us
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Mon - Fri • 9:00 AM - 7:00 PM (IST)
                        </p>
                        <p className="text-base font-semibold text-green-700 dark:text-green-400 mt-1">
                            India: 1800 309 3036
                        </p>
                    </div>
                </div>

                {/* What's New & Mobile App */}
                <div className="px-6 py-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        <FaLightbulb className="inline w-5 h-5 text-yellow-500 mr-2" />
                        What's New?
                    </h3>

                    <div className="space-y-3 text-sm">
                        <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            View the latest features and enhancements
                        </a>
                        <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            Essential guides for your business
                        </a>
                    </div>

                    {/* Mobile App Promo */}
                    <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-4">
                            <FaMobileAlt className="w-10 h-10 text-purple-600" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Download the Mobile App
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Manage everything on the go
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center">
                                {/* Replace with real QR code */}
                                <FaDownload className="w-10 h-10 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Windows App & Refresh Note */}
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-2">
                        <p className="flex items-center gap-2">
                            <FaLaptop className="w-4 h-4" />
                            Secure Windows desktop app available
                        </p>
                        <p className="italic">
                            We've made improvements. Refresh the page when you can!
                        </p>
                    </div>
                </div>
            </div>

        </>



    )
};

export default Header;