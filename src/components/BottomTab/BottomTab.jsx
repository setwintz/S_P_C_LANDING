
import React, { Fragment, useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lowerCase } from "lodash";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FiSliders } from "react-icons/fi";

import useDarkmode from "../../Hooks/useDarkMode";
import useWidth from "../../Hooks/useWidth";
import useNavbarColorType from "../../Hooks/useNavbarColorType";
import { GiBookAura, GiCalendar, GiFilmSpool } from "react-icons/gi";
import { LuTableProperties } from "react-icons/lu";
import { PiExam, PiFilmSlateDuotone } from "react-icons/pi";

// Additional active routes for menu items (copied from NavMenu for consistency)
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

// Define header groups and associated modules (copied from NavMenu for dynamic generation)
const headerGroups = [
  { title: "General", modules: ["Administration"] },
  { title: "Academic", modules: ["Curriculum", "Time Table", "Calendar", "Examination", "LMS", "Social"] },
  { title: "Business Tools", modules: ["HR", "Accounting", "Report"] },
];


const BottomTab = ({ show, noFade }) => {
  const location = useLocation();
  const isDark = useDarkmode();
  const navigate = useNavigate();
  const { clientUser } = useSelector((state) => state.authCustomerSlice);
  const [sideNavItems, setSideNavItems] = useState([]);
  // console.log("clientUser", clientUser);

  const [flatMenuItems, setFlatMenuItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [navbarColorType] = useNavbarColorType();
  const { width, breakpoints } = useWidth();
  const skipSubmenuUpdate = useRef(false); // Flag to skip submenu update after child click

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

  // Transform permissions list into menu structure (copied from NavMenu)
  const transformPermissionsList = (vendorPermissionsList) => {
    const result = [];
    const accessedModules = vendorPermissionsList.filter((module) => module.access);

    // console.log("accessedModules", accessedModules);


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
            } else if (module.name === "Time Table") {
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

  // Generate sideNavItems dynamically
  useEffect(() => {
    // console.log("clientUser?.tenant_role?.capability", clientUser?.tenant_role?.capability);

    const transformedList = transformPermissionsList(
      clientUser?.tenant_role?.capability || []
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
  }, [clientUser]);

  // Flatten the menu items for bottom tab
  useEffect(() => {
    const flatItems = [];
    sideNavItems.forEach((item) => {
      if (item.isHeadr) return;
      if (item.child) {
        item.child.forEach((child) => {
          flatItems.push({
            title: child.childtitle,
            link: child.childlink,
            icon: item.icon, // Use parent's icon for child
          });
        });
      } else {
        flatItems.push({
          title: item.title,
          link: item.link,
          icon: item.icon,
        });
      }
    });
    setFlatMenuItems(flatItems);
  }, [sideNavItems]);

  // Close offcanvas on navigation (location change)
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  // Prepare bottom menu items: first 4 flat items + More if there are more
  const bottomMenuItems = flatMenuItems.slice(0, 4);
  // console.log("bottomMenuItems", bottomMenuItems);

  const moreItems = flatMenuItems.slice(4);
  const hasMore = moreItems.length > 0;
  const moreItem = {
    title: "More",
    icon: <FiSliders />,
    isMore: true,
  };
  const menuItems = [...bottomMenuItems, ...(hasMore ? [moreItem] : [])];

  // console.log("menuItems", menuItems);


  // Handle navigation or open offcanvas
  function handleNavigateToMenu(item) {
    if (item.isMore) {
      setIsOpen(true);
    } else {
      navigate(item.link);
    }
  }

  // Get icon class based on active state
  const getIconClass = (isActiveItem) => {
    return `${isActiveItem ? `shadow-md border border-gray-400 ${isDark ? "bg-[#d7d7d78a]" : "bg-[#d7d7d78a]"} shadow-custom-light` : "bg-transparent"}`;
  };

  // For More item, active if any remaining item is active
  const getIsMoreActive = () => moreItems.some((item) => isLocationMatch(item.link));

  // Check if the item or its children are active (for offcanvas)
  const isItemActive = (item) =>
    !item.child
      ? isLocationMatch(item.link)
      : item.child.some((childItem) => isLocationMatch(childItem.childlink));

  // Dynamic class names for nav items (for offcanvas, slightly different: added border and different shadow)
  const getNavItemClass = (isActive) =>
    `nav-item my-2 w-[100%] rounded-md transition duration-300  ${isActive ? `${isDark ? "twoD-style-button-three" : "twoD-style-button-three"} shadow-lg` : ""
    } px-4`; // Always expanded style, changed bg and shadow

  const getChildItemClass = (isActive) =>
    `nav-item my-2 w-[100%] rounded-md transition duration-300 ${isActive ? `${isDark ? "" : ""} text-formHeadingLight dark:text-activeNavItemDark ` : ""
    } px-4`; // Changed colors

  const getCircleClass = (isActive) =>
    `h-3 w-3 rounded-full ${isActive ? `${isDark ? "bg-custom-gradient-grey-blue border-orangeBorder" : "bg-formHeadingLight border-blue-400"}  ` : "border border-2 "}`; // Changed to blue theme

  // Dynamic class names for icons (slightly different padding and size)
  const getIconClassOffcanvas = (isActive) =>
    `menu-icon flex-grow-0 p-2 text-[1.2rem] rounded-lg ${isActive
      ? `${isDark ? "" : ""}`
      : `${isDark ? "" : ` ${navbarColorType == "black" ? "" : navbarColorType == "transparent" ? "bg-gray-200" : "bg-gray-100"}`}`
    } `; // Adjusted padding, size, bg

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

  const getNavbarBgColor = () => {
    switch (navbarColorType) {
      case "white":
        return "bg-white dark:bg-upperCardBgDark    ";
      case "transparent":
        return "bg-upperCardBgLight dark:bg-upperCardBgDark  ";
      case "black":
        return "bg-black text-white dark:bg-upperCardBgDark "
      default:
        return "bg-upperCardBgLight dark:bg-upperCardBgDark ";
    }
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

  return (
    <Fragment>
      <div
        className={`w-[100%] rounded-t-xl border-t-2 border-formHeadingLight dark:border-activeNavItemDark h-16 fixed bottom-0 left-0 transition-transform duration-300 z-50 ${isDark ? "border-blue-gray-800" : "border-slate-400"} ${show ? "translate-y-0" : "translate-y-full"} bg-white dark:bg-custom-gradient-grey-blue`}
      >
        <ul className="flex h-[100%] justify-around items-center">
          {menuItems.map((item, index) => {
            const isActive = item.isMore ? getIsMoreActive() : isLocationMatch(item.link);
            return (
              <li
                key={index}
                className="nav-item px-3 flex justify-center rounded-md hover:bg-slate-200 transition duration-500"
              >
                <button
                  onClick={() => handleNavigateToMenu(item)}
                  className={`flex items-center justify-center ${isActive ? "scale-105" : "scale-100"} transition-transform duration-1000`}
                >
                  <span className={`menu-icon ${getIconClass(isActive)} py-1 px-1 rounded-xl flex flex-row justify-center items-center gap-1`}>
                    <span>
                      {React.createElement(item.icon.type, {
                        className: isActive ? `${isDark ? "text-gray-700" : "text-red-200"}` : "text-gray-700",
                        size: 20,
                      })}
                    </span>
                    {isActive && (
                      <span className="text-gray-600 font-semibold text-xs">
                        {item.title}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <div
          className={`fixed inset-0 z-[9999] bg-black/50 transition-opacity duration-300`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64  ${getNavbarBgColor()} dark:bg-custom-gradient-grey-blue shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-4 text-gray-600 dark:text-white focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineClose size={24} />
            </button>
            <ul
              className={`pb-2 mx-2 h-[calc(100%-4rem)] overflow-y-auto ${getNavbarColorStyleClasses()}`}
            >
              {sideNavItems.map((item, i) => {
                if (item.isHeadr) {
                  return (
                    <li
                      key={i}
                      className={`my-4 text-sm font-bold uppercase text-gray-500 dark:text-white`}
                    >
                      {item.title}
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
                          className={`${getNavItemClass(active)} menu-link flex items-center py-1 cursor-pointer gap-1`}
                        >
                          <span className={getIconClassOffcanvas(active)}>{item.icon}</span>
                          <span className="whitespace-nowrap text-sm">{item.title}</span>
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
                                <NavLink
                                  to={child.childlink}
                                  // onClick={handleChildClick} // Close submenu on child click
                                  className={`${getChildItemClass(childActive)} menu-link flex items-center py-1 gap-3`}
                                >
                                  <span className="whitespace-nowrap text-sm">
                                    {child.childtitle}
                                  </span>
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <NavLink
                        to={item.link}
                        className={`${getNavItemClass(active)} menu-link flex items-center py-1 gap-3`}
                      >
                        <span className={getIconClassOffcanvas(active)}>{item.icon}</span>
                        <span className="whitespace-nowrap text-sm">{item.title}</span>
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BottomTab;
