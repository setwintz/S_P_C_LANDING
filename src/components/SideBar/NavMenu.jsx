
// import { useEffect, useState, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { TiHomeOutline } from "react-icons/ti";
// import { useSelector } from "react-redux";
// import { lowerCase } from "lodash";
// import useWidth from "../../Hooks/useWidth";
// import useDarkmode from "../../Hooks/useDarkMode";
// import useNavbarColorType from "../../Hooks/useNavbarColorType";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { RiAdminLine } from "react-icons/ri";

// // Additional active routes for menu items
// const additionalActiveRoutes = {
//     "/list/clients": ["/list/clients", "/create/clients"],
//     "/user": ["/user", "/edit/user", "/view/user"],
//     "/list/unit": ["/list/unit", "/create/unit"],
//     "/list/admin": ["/list/admin", "/create/admin"],
// };

// const NavMenu = ({ isCollapsed, setIsCollapsed }) => {
//     const { clientUser } = useSelector((state) => state.authCustomerSlice);
//     const [sideNavItems, setSideNavItems] = useState([]);
//     const [activeSubmenu, setActiveSubmenu] = useState(null);
//     const location = useLocation();
//     const [navbarColorType] = useNavbarColorType();
//     const { width, breakpoints } = useWidth();
//     const [isDark] = useDarkmode();
//     const skipSubmenuUpdate = useRef(false); // Flag to skip submenu update after child click

//     // Get active routes for a given link
//     const getActiveRoutes = (link) => additionalActiveRoutes[link] || [link];

//     // Check if the current location matches the target route
//     const isLocationMatch = (targetLocation) =>
//         targetLocation &&
//         getActiveRoutes(targetLocation).some((route) =>
//             location.pathname.startsWith(route)
//         );

//     // Update active submenu based on location
//     useEffect(() => {
//         if (skipSubmenuUpdate.current) {
//             skipSubmenuUpdate.current = false; // Reset flag after skipping once
//             return;
//         }

//         const submenuIndex = sideNavItems.findIndex((item) => {
//             if (item.child) {
//                 return item.child.some((childItem) =>
//                     isLocationMatch(childItem.childlink)
//                 );
//             }
//             return isLocationMatch(item.link);
//         });
//         setActiveSubmenu(submenuIndex >= 0 ? submenuIndex : null);
//     }, [location, sideNavItems]);

//     // Transform permissions into menu items
//     useEffect(() => {
//         const transformedList = transformPermissionsList(
//             clientUser?.tenant_role?.capability || []
//         );

//         console.log("transformedList", transformedList);

//         setSideNavItems([
//             {
//                 title: "Dashboard",
//                 link: "/dashboard",
//                 icon: <TiHomeOutline />,
//             },
//             ...transformedList,
//         ]);
//     }, [clientUser]);

//     // Transform permissions list into menu structure
//     const transformPermissionsList = (vendorPermissionsList) => {
//         const result = [];
//         const toLowerCaseFirstLetter = (str) =>
//             str.charAt(0).toLowerCase() + str.slice(1);

//         const accessedMenu = vendorPermissionsList.filter((module) => module.access);

//         accessedMenu.forEach((module) => {
//             if (module.name !== "Human resources") {
//                 result.push({
//                     isHeadr: true,
//                     title: module.name,
//                 });
//             }

//             module.menu
//                 .filter((menu) => menu.access)
//                 .forEach((menu) => {
//                     const normalizedMenuName = lowerCase(menu.name).replace(/\s+/g, "-");
//                     let childItems = [
//                         {
//                             childtitle: `${menu.name} List`,
//                             childlink: `/${toLowerCaseFirstLetter(`list/${normalizedMenuName}`)}`,
//                         },
//                         {
//                             childtitle: `Create ${menu.name}`,
//                             childlink: `/${toLowerCaseFirstLetter(`create/${normalizedMenuName}`)}`,
//                         },
//                     ];

//                     const singleChildMenus = [
//                         "Unit",
//                         "Admin",
//                         "Brand",
//                         "Manufacturer",
//                         "Attribute",
//                         "Pricing",
//                         "Financial Year",
//                         "Currency",
//                     ];
//                     if (singleChildMenus.includes(menu.name)) {
//                         childItems = childItems.slice(0, 1);
//                     }

//                     if (menu.name == "Unit") {
//                         result.push({
//                             title: menu.name,
//                             icon: <MdOutlineAdminPanelSettings />,
//                             child: childItems,
//                         });
//                     } else if (menu.name == "Admin") {
//                         result.push({
//                             title: menu.name,
//                             icon: <RiAdminLine />,
//                             child: childItems,
//                         });

//                     }
//                     else {
//                         result.push({
//                             title: menu.name,
//                             icon: <TiHomeOutline />,
//                             child: childItems,
//                         });
//                     }


//                 });
//         });
//         return result;
//     };

//     // Handle submenu toggle and ensure only one is open
//     const toggleSubmenu = (index) => {
//         setActiveSubmenu(activeSubmenu === index ? null : index);
//     };

//     // Handle child menu click to close submenu
//     const handleChildClick = () => {
//         skipSubmenuUpdate.current = true; // Prevent useEffect from reopening submenu
//         setActiveSubmenu(null); // Close parent submenu
//     };

//     // Check if the item or its children are active
//     const isItemActive = (item) =>
//         !item.child
//             ? isLocationMatch(item.link)
//             : item.child.some((childItem) => isLocationMatch(childItem.childlink));

//     // Dynamic class names for nav items
//     const getNavItemClass = (isActive) =>
//         `nav-item my-2 w-full rounded-md transition duration-300 ${isActive ? `${isDark ? "twoD-style-button-three" : "twoD-style-button-three"} shadow-md` : ""
//         } ${width < breakpoints.md || isCollapsed ? "flex justify-center" : "px-2"}`;

//     const getChildItemClass = (isActive) =>
//         `nav-item my-2 w-full rounded-md transition duration-300 ${isActive ? `${isDark ? "" : ""} text-formHeadingLight dark:text-activeNavItemDark ` : ""
//         } ${width < breakpoints.md || isCollapsed ? "flex justify-center" : "px-2"}`;

//     const getCircleClass = (isActive) =>
//         `h-3 w-3 rounded-full ${isActive ? `${isDark ? "bg-orangeBorder" : "bg-formHeadingLight"}  ` : "border border-2"}`;

//     // Dynamic class names for icons
//     const getIconClass = (isActive) =>
//         `menu-icon flex-grow-0 p-1 text-[1.5rem] rounded-md ${isActive
//             ? `${isDark ? "" : ""}`
//             : `${isDark ? "bg-upperCardBgDark" : ` ${navbarColorType == "black" ? "bg-gray-700" : navbarColorType == "transparent" ? "bg-gray-200" : "bg-upperCardBgLight"}`} shadow-sm`
//         } `;

//     // Dynamic navbar color styles
//     const getNavbarColorStyleClasses = () => {
//         switch (navbarColorType) {
//             case "white":
//             case "transparent":
//                 return "text-black dark:text-white";
//             case "black":
//                 return "text-white";
//             default:
//                 return "";
//         }
//     };

//     useEffect(() => {
//         if (isCollapsed) {
//             handleChildClick()
//         }
//     }, [isCollapsed])

//     return (
//         <ul
//             className={`pb-2 mx-2 h-[100%] overflow-hidden ${getNavbarColorStyleClasses()}`}
//         >
//             {sideNavItems.map((item, i) => {
//                 if (item.isHeadr) {
//                     return (
//                         <li
//                             key={i}
//                             className={`my-4 text-sm font-bold uppercase text-gray-500 dark:text-white`}
//                         >
//                             {isCollapsed ? item.title.slice(0, 3) + ".." : item.title}
//                         </li>
//                     );
//                 }
//                 const active = isItemActive(item);
//                 const hasChildren = !!item.child;

//                 return (
//                     <li key={i}>
//                         {hasChildren ? (
//                             <>
//                                 <div
//                                     onClick={() => toggleSubmenu(i)}
//                                     className={`${getNavItemClass(active)} menu-link flex items-center py-1 cursor-pointer ${width < breakpoints.md || isCollapsed
//                                         ? "flex-col justify-center gap-0"
//                                         : "gap-3"
//                                         }`}
//                                 >
//                                     <span className={getIconClass(active)}>{item.icon}</span>
//                                     {!(width < breakpoints.md || isCollapsed) && (
//                                         <span className="whitespace-nowrap text-sm">{item.title}</span>
//                                     )}
//                                     {!(width < breakpoints.md || isCollapsed) && (
//                                         <span
//                                             className={`ml-auto transition-transform duration-300 ${activeSubmenu === i ? "rotate-180" : ""
//                                                 }`}
//                                         >
//                                             <svg
//                                                 className="w-4 h-4"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M19 9l-7 7-7-7"
//                                                 />
//                                             </svg>
//                                         </span>
//                                     )}
//                                 </div>
//                                 <ul
//                                     className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${activeSubmenu === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                                         }`}
//                                 >
//                                     {item.child.map((child, j) => {
//                                         const childActive = isLocationMatch(child.childlink);
//                                         return (
//                                             <li className="flex  pl-6 items-center justify-center" key={j}>
//                                                 <span className={`${getCircleClass(childActive)}`}></span>
//                                                 <NavLink
//                                                     to={child.childlink}
//                                                     onClick={handleChildClick} // Close submenu on child click
//                                                     className={`${getChildItemClass(childActive)} menu-link flex items-center py-1  ${width < breakpoints.md || isCollapsed
//                                                         ? "flex-col justify-center gap-0"
//                                                         : "gap-3"
//                                                         }`}
//                                                 >
//                                                     {!(width < breakpoints.md || isCollapsed) && (
//                                                         <span className="whitespace-nowrap text-sm">
//                                                             {child.childtitle}
//                                                         </span>
//                                                     )}
//                                                 </NavLink>
//                                             </li>
//                                         );
//                                     })}
//                                 </ul>
//                             </>
//                         ) : (
//                             <NavLink
//                                 to={item.link}
//                                 className={`${getNavItemClass(active)} menu-link flex items-center py-1 ${width < breakpoints.md || isCollapsed
//                                     ? "flex-col justify-center gap-0"
//                                     : "gap-3"
//                                     }`}
//                             >
//                                 <span className={getIconClass(active)}>{item.icon}</span>
//                                 {!(width < breakpoints.md || isCollapsed) && (
//                                     <span className="whitespace-nowrap text-sm">{item.title}</span>
//                                 )}
//                             </NavLink>
//                         )}
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// };

// export default NavMenu;


// new code
import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { lowerCase } from "lodash";
import useWidth from "../../Hooks/useWidth";
import useDarkmode from "../../Hooks/useDarkMode";
import useNavbarColorType from "../../Hooks/useNavbarColorType";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { GiBookAura } from "react-icons/gi";
import { LuTableProperties } from "react-icons/lu";
import { GiCalendar } from "react-icons/gi";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { GiFilmSpool } from "react-icons/gi";
import { PiExam } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { useSafeNavigate } from "../../Hooks/useSafeNavigate";


// Additional active routes for menu items
const additionalActiveRoutes = {
    "/list/clients": ["/list/clients", "/create/clients", "/edit/clients", "/view/clients"],
    "/user": ["/user", "/edit/user", "/view/user"],
    "/list/unit": ["/list/unit", "/create/unit", "/edit/unit", "/view/unit"],
    "/list/admin": ["/list/admin", "/create/admin", "/edit/admin", "/view/admin"],
    "/list/employee": ["/list/employee", "/create/employee", "/edit/employee", "/view/employee"],
    "/list/payroll": ["/list/payroll", "/create/payroll", "/edit/payroll", "/view/payroll"],
    "/list/recruitment": ["/list/recruitment", "/create/recruitment", "/edit/recruitment", "/view/recruitment"],
    "/list/ledger": ["/list/ledger", "/create/ledger", "/edit/ledger", "/view/ledger"],
    "/list/invoice": ["/list/invoice", "/create/invoice", "/edit/invoice", "/view/invoice"],
    "/list/budget": ["/list/budget", "/create/budget", "/edit/budget", "/view/budget"],
    "/list/financial-report": ["/list/financial-report", "/create/financial-report", "/edit/financial-report", "/view/financial-report"],
    "/list/performance-report": ["/list/performance-report", "/create/performance-report", "/edit/performance-report", "/view/performance-report"],
    "/list/compliance-report": ["/list/compliance-report", "/create/compliance-report", "/edit/compliance-report", "/view/compliance-report"],
};

const NavMenu = ({ isCollapsed, setIsCollapsed }) => {
    const store = useSelector((state) => state);
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    const { capability } = useSelector((state) => state.capabilitySlice);
    const [sideNavItems, setSideNavItems] = useState([]);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const location = useLocation();
    const [navbarColorType] = useNavbarColorType();
    const { width, breakpoints } = useWidth();
    const [isDark] = useDarkmode();
    const skipSubmenuUpdate = useRef(false); // Flag to skip submenu update after child click


    const safeNavigate = useSafeNavigate();

    // console.log("store", store);



    // Define header groups and associated modules
    const headerGroups = [
        { title: "General", modules: ["Administration"] },
        { title: "Academic", modules: ["Curriculum", "Time Table", "Calendar", "Examination", "LMS", "Social"] },
        { title: "Tools", modules: ["HR", "Accounting", "Report"] },
        { title: "Student", modules: ["Student Information"] },
    ];

    // Get active routes for a given link
    const getActiveRoutes = (link) => additionalActiveRoutes[link] || [link];

    // Check if the current location matches the target route
    const isLocationMatch = (targetLocation) =>
        targetLocation &&
        getActiveRoutes(targetLocation).some((route) =>
            location.pathname.startsWith(route)
        );

    // Update active submenu based on location
    useEffect(() => {
        if (skipSubmenuUpdate.current) {
            skipSubmenuUpdate.current = false; // Reset flag after skipping once
            return;
        }

        const submenuIndex = sideNavItems.findIndex((item) => {
            if (item.child) {
                return item.child.some((childItem) =>
                    isLocationMatch(childItem.childlink)
                );
            }
            return isLocationMatch(item.link);
        });
        setActiveSubmenu(submenuIndex >= 0 ? submenuIndex : null);
    }, [location, sideNavItems]);

    // Transform permissions into menu items
    useEffect(() => {
        const transformedList = transformPermissionsList(
            capability || []
        );

        // console.log("transformedList", transformedList);

        setSideNavItems([
            {
                title: "Dashboard",
                link: "/dashboard",
                icon: <TiHomeOutline />,
            },
            ...transformedList,
        ]);
    }, [capability]);

    // Transform permissions list into menu structure with fixed headers
    const transformPermissionsList = (vendorPermissionsList) => {
        const result = [];
        const accessedModules = vendorPermissionsList.filter((module) => module.access);

        headerGroups.forEach((group) => {

            const groupModules = accessedModules.filter((m) =>
                group.modules.includes(m.name)
            );



            if (groupModules.length > 0) {
                result.push({
                    isHeadr: true,
                    title: group.title,
                });

                groupModules.forEach((module) => {
                    const menuItems = module.menu
                        .filter((menu) => menu.access)
                        .map((menu) => {
                            const normalizedMenuName = lowerCase(menu.name).replace(/\s+/g, "-");
                            return {
                                childtitle: menu.name || menu.displayName,
                                childlink: `/list/${normalizedMenuName}`,
                            };
                        });

                    if (menuItems.length > 0) {
                        let icon = <TiHomeOutline />;
                        if (module.name === "Administration") {
                            icon = <MdOutlineAdminPanelSettings />;
                        } else if (module.name === "HR") {
                            icon = <RiAdminLine />;
                        } else if (module.name === "Accounting" || module.name === "Report") {
                            icon = <TiHomeOutline />;
                        } else if (module.name === "Curriculum") {
                            icon = <GiBookAura />;
                        } else if (module.name === "Student Information") {
                            icon = <PiStudent />;
                        }
                        else if (module.name === "Time Table") {
                            icon = <LuTableProperties />;
                        } else if (module.name === "Calendar") {
                            icon = <GiCalendar />;
                        } else if (module.name === "Examination") {
                            icon = <PiExam />;
                        } else if (module.name === "LMS") {
                            icon = <PiFilmSlateDuotone />;
                        } else if (module.name === "Social") {
                            icon = <GiFilmSpool />;
                        }

                        result.push({
                            title: module.name,
                            icon,
                            child: menuItems,
                        });
                    }
                });
            }
        });

        return result;
    };

    // Handle submenu toggle and ensure only one is open
    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    // Handle child menu click to close submenu
    const handleChildClick = () => {
        skipSubmenuUpdate.current = true; // Prevent useEffect from reopening submenu
        setActiveSubmenu(null); // Close parent submenu
    };

    // Check if the item or its children are active
    const isItemActive = (item) =>
        !item.child
            ? isLocationMatch(item.link)
            : item.child.some((childItem) => isLocationMatch(childItem.childlink));

    // Dynamic class names for nav items
    const getNavItemClass = (isActive) =>
        `nav-item my-2 w-full rounded-md transition duration-300 ${isActive ? `${isDark ? "twoD-style-button-three" : "twoD-style-button-three"} shadow-md` : ""
        } ${width < breakpoints.md || isCollapsed ? "flex justify-center" : "px-2"}`;

    const getChildItemClass = (isActive) =>
        `nav-item my-2 w-full rounded-md transition duration-300 ${isActive ? `${isDark ? "" : ""} text-primary dark:text-primaryDark ` : ""
        } ${width < breakpoints.md || isCollapsed ? "flex justify-center" : "px-2"}`;

    const getCircleClass = (isActive) =>
        `h-3 w-3 rounded-full ${isActive ? `${isDark ? "bg-primaryDark" : "bg-primary"}  ` : "border border-2"}`;

    // Dynamic class names for icons
    const getIconClass = (isActive) =>
        `menu-icon flex-grow-0 p-1 text-[1.2rem] rounded-md ${isActive
            ? `${isDark ? "" : ""}`
            : `${isDark ? "bg-upperCardBgDark" : ` ${navbarColorType == "black" ? "bg-gray-700" : navbarColorType == "transparent" ? "bg-gray-200" : "bg-upperCardBgLight"}`} shadow-sm`
        } `;

    // Dynamic navbar color styles
    const getNavbarColorStyleClasses = () => {
        switch (navbarColorType) {
            case "white":
            case "transparent":
                return "text-black dark:text-white";
            case "black":
                return "text-white";
            default:
                return "";
        }
    };

    useEffect(() => {
        if (isCollapsed) {
            handleChildClick();
        }
    }, [isCollapsed]);

    // #AB30FC

    return (
        <ul
            className={`pb-2 mx-2 h-[100%] overflow-hidden ${getNavbarColorStyleClasses()}`}
        >
            {sideNavItems.map((item, i) => {
                if (item.isHeadr) {
                    return (
                        <li
                            key={i}
                            className={`my-4 text-sm font-bold uppercase text-gray-500 dark:text-white`}
                        >
                            {isCollapsed ? item.title.slice(0, 3) + ".." : item.title}
                        </li>
                    );
                }
                const active = isItemActive(item);
                const hasChildren = !!item.child;

                return (
                    <li key={i}>
                        {hasChildren ? (
                            <>
                                <div
                                    onClick={() => toggleSubmenu(i)}
                                    className={`${getNavItemClass(active)} menu-link flex items-center py-1 cursor-pointer ${width < breakpoints.md || isCollapsed
                                        ? "flex-col justify-center gap-0"
                                        : "gap-3"
                                        }`}
                                >
                                    <span className={getIconClass(active)}>{item.icon}</span>
                                    {!(width < breakpoints.md || isCollapsed) && (
                                        <span className="whitespace-nowrap text-sm">{item.title}</span>
                                    )}
                                    {!(width < breakpoints.md || isCollapsed) && (
                                        <span
                                            className={`ml-auto transition-transform duration-300 ${activeSubmenu === i ? "rotate-180" : ""
                                                }`}
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                <ul
                                    className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${activeSubmenu === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {item.child.map((child, j) => {
                                        const childActive = isLocationMatch(child.childlink);
                                        return (
                                            <li className="flex pl-6 items-center justify-center" key={j}>
                                                <span className={`${getCircleClass(childActive)}`}></span>
                                                <div
                                                    // to={child.childlink}
                                                    onClick={() => {
                                                        handleChildClick();
                                                        console.log("addadad");
                                                        
                                                        safeNavigate(`${child.childlink}`)
                                                    }} // Close submenu on child click
                                                    className={`${getChildItemClass(childActive)} cursor-pointer menu-link flex items-center py-1  ${width < breakpoints.md || isCollapsed
                                                        ? "flex-col justify-center gap-0"
                                                        : "gap-3"
                                                        }`}
                                                >
                                                    {!(width < breakpoints.md || isCollapsed) && (
                                                        <span className="whitespace-nowrap text-sm">
                                                            {child.childtitle}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : (
                            <NavLink
                                to={item.link}
                                className={`${getNavItemClass(active)} menu-link flex items-center py-1 ${width < breakpoints.md || isCollapsed
                                    ? "flex-col justify-center gap-0"
                                    : "gap-3"
                                    }`}
                            >
                                <span className={getIconClass(active)}>{item.icon}</span>
                                {!(width < breakpoints.md || isCollapsed) && (
                                    <span className="whitespace-nowrap text-sm">{item.title}</span>
                                )}
                            </NavLink>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default NavMenu;