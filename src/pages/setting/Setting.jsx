

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileUser, User, Lock, Database, Building, Users, Languages, Earth, Calendar, BookOpen, File, CreditCard, NotebookTabs, FileText, FileCheck, Building2, Search } from 'lucide-react';
import { IoCalendarNumberOutline } from "react-icons/io5";
import useWidth from '../../Hooks/useWidth';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react'; // Assuming lucide-react for icons; adjust import if using a different library

function Setting() {
    const [searchTerm, setSearchTerm] = useState('');
    const { width, breakpoints } = useWidth();
    const [headeOn, setHeaderOn] = useState(false);
    const { show } = useSelector((state) => state?.showTabSlice);
    useEffect(() => {
        if (show) {
            setHeaderOn(true);
        } else {
            setHeaderOn(false);
        }
    }, [show]);


    const allSettings = [
        { section: 'Personal', title: 'Profile', desc: 'Update your personal information and preferences', to: '/settings/profile', icon: User },
        { section: 'Personal', title: 'Password', desc: 'Change your account password', to: '/settings/password', icon: Lock },
        { section: 'Personal', title: 'Data Settings', desc: 'Manage your data and privacy settings', to: '/settings/data', icon: Database },
        { section: 'Organization', title: 'Organization Details', desc: 'Update organization information and branding', to: '/organization', icon: Building },
        { section: 'Organization > Academic', title: 'Medium', desc: 'Medium settings', to: '/settings/academic/medium', icon: Languages },
        { section: 'Organization > Academic', title: 'Curriculum', desc: 'Curriculum settings', to: '/settings/academic/curriculum', icon: Earth },
        { section: 'Organization > Academic', title: 'Academic Year', desc: 'Configure academic year settings', to: '/settings/academic/year', icon: Calendar },
        { section: 'Organization > Academic', title: 'Academic Calendar', desc: 'Configure academic calendar settings', to: '/settings/academic/calendar', icon: Calendar },
        { section: 'Organization > Academic', title: 'Shift', desc: 'Manage shift schedules', to: '/settings/academic/shift', icon: Calendar },
        { section: 'Organization > Class', title: 'Class Group', desc: 'Configure class groups', to: '/settings/class/group', icon: Users },
        { section: 'Organization > Class', title: 'Subject', desc: 'Manage subjects for classes', to: '/settings/class/subject', icon: BookOpen },
        { section: 'Organization > Class', title: 'Assignment', desc: 'Configure assignment settings', to: '/settings/class/assignment', icon: File },
        { section: 'Organization > Account', title: 'Billing', desc: 'Manage billing and payment settings', to: '/settings/account/billing', icon: CreditCard },
        { section: 'Organization > Account', title: 'Preferences', desc: 'Configure account preferences', to: '/settings/account/preferences', icon: User },
        { section: 'Organization > Exam', title: 'Schedule', desc: 'Configure exam schedules', to: '/settings/exam/schedule', icon: Calendar },
        { section: 'Organization > Exam', title: 'Results', desc: 'Manage exam results settings', to: '/settings/exam/results', icon: FileCheck },
    ];

    const filteredSettings = allSettings.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isSearching = searchTerm.trim() !== '';

    const animateHeader = () => {

        if (width < breakpoints.sm) {
            return `${headeOn && width < breakpoints.sm ? "top-12" : "top-0"} `

        } else {
            return `top-12`
        }

    }

    return (
        <div className="xl::max-w-7xl w-[100%] min-h-[80vh] mx-auto mb-10  sm:px-6 lg:px-2 px-0 ">
            {/* Sticky Search Bar */}
            <div className={`sticky relative  top-0 ${animateHeader()} z-10 bg-white dark:bg-cardBgDark py-3 md:px-6 px-3 rounded-md rounded-t-none shadow-lg flex md:flex-row flex-col md:justify-between items-center md:items-start gap-3 border-b border-gray-200 dark:border-gray-700 transition-all duration-200`}>
                <h2 className="md:text-lg text-base font-semibold text-gray-900 dark:text-white flex-shrink-0">
                    All Settings
                </h2>
                <div className="relative flex-1 md:flex-none md:w-80">
                    <input
                        type="text"
                        placeholder="Search settings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-base pl-8"
                        aria-label="Search settings"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
                <button
                    className={` ${width < breakpoints?.sm ? "absolute right-2" : "relative "} twoD-style-button-cancel flex items-center gap-2`} aria-label="Close settings panel"
                >
                    <X className="h-4 w-4" />
                    <span className="hidden md:inline">Close</span>
                </button>
            </div>




            {/* Settings Content */}
            {isSearching ? (
                <div className="mt-6 bg-white dark:bg-cardBgDark p-6 rounded-lg">
                    {filteredSettings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSettings.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className="group flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                >
                                    <div className="flex items-center mb-2 w-[100%]">
                                        <item.icon className="h-5 w-5 text-gray-500 dark:text-white mr-3 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-[100%] mt-2">
                                        <span className="text-xs text-gray-400 dark:text-gray-500">{item.section}</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-primaryDark transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No settings found matching your search.</p>
                    )}
                </div>
            ) : (
                <>
                    {/* Personal Settings Card */}
                    <div className="bg-white dark:bg-cardBgDark shadow-sm rounded-lg p-6 mb-8 mt-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                            Personal Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                to="/settings/profile"
                                className="group flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                            >
                                <div className="flex items-center mb-2">
                                    <User className="h-5 w-5 text-gray-500 dark:text-white mr-3 flex-shrink-0" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                        Profile
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-grow">
                                    Update your personal information and preferences
                                </p>
                                <div className="flex items-center justify-between w-[100%]">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Manage</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-primaryDark transition-colors" />
                                </div>
                            </Link>

                            <Link
                                to="/settings/password"
                                className="group flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                            >
                                <div className="flex items-center mb-2">
                                    <Lock className="h-5 w-5 text-gray-500 dark:text-white mr-3 flex-shrink-0" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                        Password
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-grow">
                                    Change your account password
                                </p>
                                <div className="flex items-center justify-between w-[100%]">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Manage</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-primaryDark transition-colors" />
                                </div>
                            </Link>

                            <Link
                                to="/settings/data"
                                className="group flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                            >
                                <div className="flex items-center mb-2">
                                    <Database className="h-5 w-5 text-gray-500 dark:text-white mr-3 flex-shrink-0" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                        Data Settings
                                    </h3>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-grow">
                                    Manage your data and privacy settings
                                </p>
                                <div className="flex items-center justify-between w-[100%]">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Manage</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-primaryDark transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Organization Settings Card */}
                    <div className="bg-white dark:bg-cardBgDark shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                            Organization Settings
                        </h2>
                        <div className="space-y-8">
                            {/* Organization Details */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <Building className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                    Organization Details
                                </h3>
                                <Link
                                    to="/organization"
                                    className="group flex flex-col items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                >
                                    <div className="flex items-center mb-2">
                                        <Building className="h-5 w-5 text-gray-500 dark:text-white mr-3 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Organization Information
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Update organization information and branding
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-[100%]">
                                        <span className="text-xs text-gray-400 dark:text-gray-500">Manage</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-primaryDark transition-colors" />
                                    </div>
                                </Link>
                            </div>

                            {/* Academic Settings */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <Users className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                    Academic Create
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 ml-6">
                                    Manage academic year and shift
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <Link
                                        to="/settings/academic/medium"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Languages className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Medium
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Medium settings</p>
                                    </Link>
                                    <Link
                                        to="/settings/academic/years"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <IoCalendarNumberOutline className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Years
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Years settings</p>
                                    </Link>
                                    <Link
                                        to="/settings/academic/shift-type"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Calendar className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Academic Shift Type
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage academic shift type</p>
                                    </Link>
                                    <Link
                                        to="/settings/academic/curriculum"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Earth className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Curriculum
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Curriculum settings</p>
                                    </Link>
                                    <Link
                                        to="/settings/class"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <FileUser className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Class
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure class groups</p>
                                    </Link>
                                    <Link
                                        to="/settings/class/group"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Users className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Class Group
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure class groups</p>
                                    </Link>
                                    <Link
                                        to="/settings/class/subject"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <BookOpen className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Subject
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage subjects for classes</p>
                                    </Link>
                                    <Link
                                        to="/settings/class/assignment"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <File className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Assignment
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure assignment settings</p>
                                    </Link>
                                    <Link
                                        to="/settings/academic/year"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Calendar className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Academic Year
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure academic year settings</p>
                                    </Link>
                                    <Link
                                        to="/settings/academic/calendar"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Calendar className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Academic Calendar
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure academic calendar settings</p>
                                    </Link>
                                </div>
                            </div>

                            {/* Class Settings */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <Building2 className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                    Custom Field
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 ml-6">
                                    Manage Custom Field settings
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <Link
                                        to="/settings/custom/field/student/create"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Calendar className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Student Creation
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage Student Creation setting</p>
                                    </Link>
                                </div>
                            </div>

                            {/* Account Settings */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <NotebookTabs className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                    Account
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 ml-6">
                                    Manage your account
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Link
                                        to="/settings/account/billing"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <CreditCard className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Billing
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage billing and payment settings</p>
                                    </Link>

                                    <Link
                                        to="/settings/account/preferences"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <User className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Preferences
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure account preferences</p>
                                    </Link>
                                </div>
                            </div>

                            {/* Exam Settings */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <FileText className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                    Exam
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 ml-6">
                                    Manage your exam
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Link
                                        to="/settings/exam/schedule"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <Calendar className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Schedule
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Configure exam schedules</p>
                                    </Link>

                                    <Link
                                        to="/settings/exam/results"
                                        className="group flex flex-col items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primaryDark/50 hover:bg-primary/20 dark:hover:bg-primaryDark/10 transition-all duration-200 ease-in-out"
                                    >
                                        <div className="flex items-center mb-1">
                                            <FileCheck className="h-4 w-4 text-gray-500 dark:text-white mr-2 flex-shrink-0" />
                                            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primaryDark">
                                                Results
                                            </h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage exam results settings</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Setting;