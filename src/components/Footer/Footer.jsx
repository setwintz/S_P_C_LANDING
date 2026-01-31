import React from 'react';
import useWidth from "../../Hooks/useWidth";
import useDarkmode from "../../Hooks/useDarkMode";
import images from '../../constant/images'; // Assuming this import is available for the logo

const Footer = (isOnCreatePage) => {
    const [isDark] = useDarkmode();
    const { width, breakpoints } = useWidth();

    const footerBg = isDark ? 'bg-gray-900' : 'bg-white';
    const textColor = isDark ? 'text-gray-300' : 'text-gray-600';
    const borderColor = isDark ? 'border-blue-gray-800' : 'border-slate-400';

    return (
        <footer className={`shadow-lg ${width < breakpoints.sm && isOnCreatePage ? "pb-24" : ""} ${footerBg} ${borderColor} dark:bg-cardBgDark border-b-[0.5px] flex flex-col sm:flex-row justify-between items-center px-4 py-4 h-auto min-h-[60px] flex-shrink-0`}>
            {/* Left Section: Logo and Copyright */}
            <div className="flex flex-row items-center justify-center sm:justify-start w-full sm:w-auto mb-2 sm:mb-0">
                <img 
                    src={images.setwintzShort} 
                    alt="Zoho Corporation Logo" 
                    className="h-6 w-auto mr-2 sm:mr-4 flex-shrink-0"
                />
                <div className={`text-sm ${textColor} flex flex-col sm:flex-row items-center`}>
                    <span className="mr-0 sm:mr-4">
                        © 2025, Setwintz Pvt. Ltd. All Rights Reserved.
                    </span>
                </div>
            </div>

            {/* Right Section: Support Info */}
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right w-full sm:w-auto">
                <p className={`text-sm ${textColor} mb-1`}>
                    You can directly talk to us every Monday to Friday 9:00 AM to 7:00 PM
                </p>
                <p className={`text-sm ${textColor} mb-1 font-medium`}>
                    Setwintz India Helpline: <a href="tel:18003093036" className="text-blue-600 hover:underline">18003093036</a> (Toll Free)
                </p>
                <p className={`text-xs ${textColor}`}>
                    Supported Languages: English, हिन्दी, தமிழ், తెలుగు, മലയാളം, ಕന്നಡ, मराठी, ગુજરાતી, বাংলা
                </p>
            </div>
        </footer>
    );
};

export default Footer;