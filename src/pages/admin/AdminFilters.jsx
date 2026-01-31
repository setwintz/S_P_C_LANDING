import React, { Fragment, useState } from 'react';
import useDarkmode from '../../Hooks/useDarkMode';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { FaSlidersH, FaBell, FaCog } from 'react-icons/fa';
import { FaRegBuilding } from "react-icons/fa";
import AssignUnit from './AssignUnit';


function AdminFilters({ noFade, showAdminSettingModel, setShowAdminSettingModel }) {
  const [isDark] = useDarkmode();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('assignUnit');

  const menuItems = [
    { id: 'assignUnit', label: 'Assign Unit', icon: FaRegBuilding },
    { id: 'customFields', label: 'Custom Fields', icon: FaSlidersH },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'otherSettings', label: 'Other Settings', icon: FaCog },
    // Add more menu items as needed
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'assignUnit':
        return <AssignUnit/>;
      case 'customFields':
        return <div className="p-4">Custom Field settings</div>;
      case 'notifications':
        return <div className="p-4">Content for Admin Notifications goes here.</div>;
      case 'otherSettings':
        return <div className="p-4">Content for Other Settings goes here.</div>;
      default:
        return <div className="p-4">Select a menu item.</div>;
    }
  };

  return (
    <>
      <Transition appear show={showAdminSettingModel} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={() => setShowAdminSettingModel(false)}>
          <Transition.Child
            as={Fragment}
            enter={noFade ? '' : 'duration-300 ease-out'}
            enterFrom={noFade ? '' : 'opacity-0'}
            enterTo={noFade ? '' : 'opacity-100'}
            leave={noFade ? '' : 'duration-200 ease-in'}
            leaveFrom={noFade ? '' : 'opacity-100'}
            leaveTo={noFade ? '' : 'opacity-0'}
          >
            <div className="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter={noFade ? '' : 'duration-300 ease-out'}
              enterFrom={noFade ? '' : 'opacity-0 scale-95'}
              enterTo={noFade ? '' : 'opacity-100 scale-100'}
              leave={noFade ? '' : 'duration-200 ease-in'}
              leaveFrom={noFade ? '' : 'opacity-100 scale-100'}
              leaveTo={noFade ? '' : 'opacity-0 scale-95'}
            >
              <Dialog.Panel className="w-[100%] max-w-4xl bg-white dark:bg-cardBgDark rounded-lg shadow-xl flex flex-col max-h-[80vh]">
                {/* Fixed Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-cardBgDark">
                  <h2 className="text-xl font-semibold text-formHeadingLight dark:text-orangeBorder">
                    Admin Filters
                  </h2>
                  <button
                    onClick={() => setShowAdminSettingModel(false)}
                    className="text-gray-500 border rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-red-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <RxCross2 className="p-1 text-[1.5rem] text-red-700" />
                  </button>
                </div>

                {/* Scrollable Form Content */}
                {/* <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col md:flex-row min-h-[50vh]">
                    <nav className="w-[100%] md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 mb-4 md:mb-0 md:pr-4">
                      <ul className="space-y-2">
                        {menuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-[100%] text-left text-[.80rem] px-4 py-2 rounded-md transition-colors flex items-center ${
                                  activeTab === item.id
                                    ? 'bg-blue-100 dark:bg-custom-gradient-grey-blue text-blue-700 dark:text-white font-semibold'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue'
                                }`}
                                aria-current={activeTab === item.id ? 'page' : undefined}
                              >
                                <Icon className="mr-2 text-lg" />
                                {item.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>

                    <div className="w-[100%] md:w-3/4 md:pl-6 overflow-y-auto">
                      {renderContent()}
                    </div>

                  </div>
                </div> */}

                {/* Fixed Footer */}
                {/* <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-cardBgDark">
                  <button
                    onClick={() => setShowAdminSettingModel(false)}
                    className="twoD-style-button-cancel"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className={`twoD-style-button-three transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    Save
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AdminFilters;