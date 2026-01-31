import React, { Fragment, useEffect, useState } from 'react';
import useDarkmode from '../../Hooks/useDarkMode';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';


function AcademicYearFilters({ noFade, showFilter, setShowFilter, units, selectedStatus, setSelectedStatus, resetFilter, setSelectedUnitId, selectedUnitId }) {
  const [isDark] = useDarkmode();
  const [loading, setLoading] = useState(false);
  const { clientUser } = useSelector((state) => state.authCustomerSlice);
  const isEnterprise = clientUser?.isEnterpriseType;




  return (
    <>
      <Transition appear show={showFilter} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={() => setShowFilter(false)}>
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
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="text-gray-500 border rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-red-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <RxCross2 className="p-1 text-[1.5rem] text-red-700" />
                  </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className='grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1'>
                    {isEnterprise && (
                      <div>
                        <label className="block input-label">
                          Unit <span className="text-red-500">*</span>
                        </label>
                        <select
                          onChange={(e) => setSelectedUnitId(e.target.value)}
                          className="input-base"
                          value={selectedUnitId}
                        >
                          <option value="">All</option>
                          {units.map(unit => (
                            <option key={unit._id} value={unit._id}>{unit.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block input-label">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        value={selectedStatus}

                        className="input-base"
                      >
                        <option value="all">All</option>
                        <option value={false}>Inactive</option>
                        <option value={true}>Active</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Fixed Footer */}
                <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-cardBgDark">
                  <button
                    onClick={() => {
                      resetFilter();
                      setShowFilter(false);
                    }}
                    className="twoD-style-button-cancel"
                    disabled={loading}
                  >
                    Reset
                  </button>
                  <button
                    className={`twoD-style-button-three transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      setShowFilter(false);
                    }}

                  >
                    Apply
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AcademicYearFilters;