import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import campusService from '../../services/campus/campus.service';
import { image } from 'framer-motion/client';
import images from '../../constant/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setCapability } from '../../store/reducer/capability/capabilitySlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTenant } from '../../store/reducer/tenant/tenantSlice';

function ListOrganizations() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { organization: mainOrg } = useSelector((state) => state?.organizationSlice);
    const { tenant } = useSelector((state) => state?.tenantSlice);
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getOrganizationBranches();
    }, []);

    async function getOrganizationBranches() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await campusService.listAllUnits(mainOrg?._id);
            setBranches(response?.data?.data || []);
        } catch (error) {
            console.error('Error while fetching branches:', error);
            setError('Failed to load branches. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }


    async function handleSwitchBranch(branch) {
        const dataObject = {
            unitId: branch.unit_uuid, enterpriseId: mainOrg.enterprise_uuid
        }
        try {
            const response = await campusService.switchToBranch(dataObject);
            console.log("response.data.tenatRole.capability)", response.data.tenatRole.capability);
            dispatch(setCapability(response.data.tenatRole.capability));
            console.log("response.data.branch", response.data.branch);

            dispatch(setTenant(response.data.branch));
            navigate("/dashboard")
            // window.location.reload();
        } catch (error) {
            console.log("error", error);
        }
    }


     async function handleSwitchToOrganization(branch) {
        const dataObject = {
           enterpriseId: mainOrg.enterprise_uuid
        }
        try {
            const response = await campusService.switchToOrganization(dataObject);
            console.log("response.data.tenatRole.capability)", response.data.tenatRole.capability);
            dispatch(setCapability(response.data.tenatRole.capability));
            dispatch(setTenant(response.data.organization));
            navigate("/dashboard")
            // window.location.reload();
        } catch (error) {
            console.log("error", error);
        }
    }

    function getInitials(name) {
        if (!name) return 'NA';
        const words = name.split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    function getGradientColors(index) {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-pink-500 to-red-500',
            'from-orange-500 to-red-500',
            'from-pink-500 to-rose-500',
            'from-amber-500 to-yellow-500'
        ];
        return gradients[index % gradients.length];
    }

    const totalUnits = branches.length + 1;
    const activeUnits = branches.length + 1; // Assuming all are active as per sample
    const totalEmployees = 248; // Hardcoded as per HTML, or calculate if data available
    const locations = 4; // Hardcoded as per HTML

    return (
        <div className="overflow-y-auto bg-slate-50">
            {/* Header */}
            <header className="bg-white dark:bg-upperCardBgDark border-b border-slate-200 dark:border-gray-600 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 w-10 h-10 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-md shadow-primary dark:shadow-primaryDark">
                                <img src={images.setwintzShort} alt="company logo" />
                            </div>
                            <div>
                                <h1 id="logo-text" className="text-xl font-bold text-slate-800">Setwintz</h1>
                                <p className="text-xs text-slate-500">Enterprise Solutions</p>
                            </div>
                        </div>
                        {/* User Avatar */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="w-9 h-9 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-base sm:text-bases font-bold shadow-lg main-org-badge">
                                <span id="main-org-initials">{getInitials(mainOrg?.name)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 id="page-title" className="text-2xl sm:text-3xl font-bold text-slate-800">Organizations</h2>
                            <p className="text-slate-500 mt-1">Manage your organization and branches</p>
                        </div>
                        <button
                            // className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-200 text-sm"
                            className="twoD-style-button-three flex items-center gap-2 py-2.5 px-4 transition-colors shadow-blue-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Branch
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-upperCardBgDark rounded-2xl p-4 border border-slate-200 dark:border-gray-600 stagger-fade" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800" id="total-count">{totalUnits}</p>
                                <p className="text-xs text-slate-500">Total Units</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-upperCardBgDark rounded-2xl p-4 border border-slate-200 dark:border-gray-600 stagger-fade" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{activeUnits}</p>
                                <p className="text-xs text-slate-500">Active</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-upperCardBgDark rounded-2xl p-4 border border-slate-200 dark:border-gray-600 stagger-fade" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{totalEmployees}</p>
                                <p className="text-xs text-slate-500">Employees</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-upperCardBgDark rounded-2xl p-4 border border-slate-200 dark:border-gray-600 stagger-fade" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{locations}</p>
                                <p className="text-xs text-slate-500">Locations</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Organizations List */}
                <div className="space-y-6">
                    {/* Main Organization Section */}
                    <div className="stagger-fade" style={{ animationDelay: '0.5s' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <span id="main-org-label" className="text-xs font-semibold text-primary dark:text-primaryDark uppercase tracking-wider">Headquarters</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-primary dark:from-primaryDark to-transparent"></div>
                        </div>
                        {/* Main Org Card */}
                        <div
                            id="main-org-card"
                            onClick={handleSwitchToOrganization}
                            className="org-card bg-white dark:bg-upperCardBgDark rounded-2xl border-2 border-primary dark:border-primaryDark/50 shadow-md shadow-primary/50 dark:shadow-primaryDark/50 overflow-hidden cursor-pointer"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg main-org-badge">
                                            <span id="main-org-initials">{getInitials(mainOrg?.name)}</span>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md" title="Main Organization">
                                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h3 id="main-org-name" className="text-lg sm:text-xl font-bold text-slate-800 truncate">{mainOrg?.name?.toUpperCase()}</h3>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Main Org</span>
                                        </div>
                                        <p id="main-org-email" className="text-slate-500 text-sm truncate mb-3">{mainOrg?.email}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span>{mainOrg?.city}</span> {/* Hardcoded as per HTML; replace with data if available */}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>120 Employees</span> {/* Hardcoded; replace if data available */}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                                <span className="text-green-600">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center gap-2 sm:flex-col">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="More options">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branches Section */}
                    <div className="stagger-fade" style={{ animationDelay: '0.6s' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Branches</span>
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs font-medium" id="branch-count">
                                {branches.length}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                        </div>
                        {/* Branches Grid */}
                        <div id="branches-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-32 col-span-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            ) : error ? (
                                <p className="text-red-500 text-center col-span-2">{error}</p>
                            ) : (
                                branches.map((branch, index) => (
                                    <Tippy key={branch._id || index} content="Switch to this branch">
                                        <div
                                            className="relative org-card branch-line bg-white dark:bg-upperCardBgDark rounded-xl border border-slate-200 dark:border-gray-600 dark:border-gray-600 hover:border-primary  dark:hover:border-primaryDark/80 hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-primaryDark/30 overflow-hidden cursor-pointer stagger-fade"
                                            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                                            onClick={() => handleSwitchBranch(branch)}
                                        >
                                            <div className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColors(index)} rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0`}>
                                                        {getInitials(branch.name)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold text-slate-800 truncate text-sm">{branch.name?.toUpperCase()}</h4>
                                                            {branch.name === tenant.name && (
                                                                <span
                                                                    className="inline-flex absolute top-1 right-4 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap"
                                                                    role="status"
                                                                    aria-label="This is the chosen branch"
                                                                >
                                                                    <svg className="w-3 h-3 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    Chosen
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-500 text-xs truncate">{branch.email}</p>
                                                    </div>
                                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100">
                                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        <span>{branch.city || 'Location not available'}</span> {/* Use data if available */}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span>{branch.employees || 'N/A'} Staff</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                        <span className={`${branch?.active ? "text-green-600" : "text-red-600"}`}> {branch?.active ? "Active" : "Inactive"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tippy>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListOrganizations;