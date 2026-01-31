import { useState, useEffect, useCallback, Fragment } from 'react';
import styles from './CustomTable.module.css';
import { useNavigate } from 'react-router-dom';
import debounceFunction from '../../helper/Debounce';
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import images from '../../constant/images';
import { MdSearch } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { FaCog } from 'react-icons/fa';
import { HiDocumentReport } from "react-icons/hi";
import { MdOutlineFilterList } from "react-icons/md";
import { IoIosArrowRoundBack, IoIosRefresh } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import useWidth from '../../Hooks/useWidth';
import { useSelector } from 'react-redux';
import LoadingSpinner5 from '../Loading/LoadingSpinner5';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';




function CustomTable({
  resetFilter,
  dataLoading,
  filterToggleFunction,
  filterToggleValue,
  filtersCount,
  settingToggleFunction,
  settingToggleValue,
  title,
  refreshCount,
  columns,
  fetchData,
  headerBackground = '#f8f9fa',
  headerTextColor = '#111827',
  nodataTextColor = '#ffffff',
  rowBackground = '#fff',
  rowTextColor = '#111827',
  alternateRowBackground = '#f9fafb',
  rowHoverBackground = "#f3f4f6",
  defaultRowsPerPage = 10,
  buttonName,
  buttonAction,
  updatedData,
  totalData,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  text,
  setText,
  noData,
  lifeCycle,
  lifeCycleTitle,
  noFade = false
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const { width, breakpoints } = useWidth();
  const [headeOn, setHeaderOn] = useState(false);
  const { show } = useSelector((state) => state?.showTabSlice);
  // console.log("show", show);
  useEffect(() => {
    if (show) {
      setHeaderOn(true);
    } else {
      setHeaderOn(false);
    }
  }, [show]);
  // useEffect(() => {
  // loadData();
  // }, [refreshCount, currentPage, rowsPerPage]);
  useEffect(() => {
    if (updatedData && updatedData?.length > 0) {
      setData(updatedData);
      setTotalItems(totalData);
    } else {
      setData([]);
      setTotalItems(0);
    }
  }, [updatedData]);
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchData(currentPage, rowsPerPage, text);
      setData(response.data?.data || []);
      setTotalItems(response.data?.total || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const handlePageChange = (page) => {
    console.log("totalPages", totalPages);
    console.log("page", page);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
  };
  const [searchInput, setSearchInput] = useState(text);
  useEffect(() => {
    setSearchInput(text);
  }, [text]);
  const debounceSearch = useCallback(
    debounceFunction(
      (nextValue) => {
        setText(nextValue);
      },
      1000
    ),
    []
  );
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    debounceSearch(value);
  };
  const animateHeader = () => {
    if (width < breakpoints.sm) {
      return `${headeOn && width < breakpoints.sm ? "top-12" : "top-0"} `
    } else {
      return `top-12`
    }
  }


  // life cycle

  const [showForm, setShowForm] = useState(false);





  return (
    <div className=" relative ">
      <div className={`bg-white sticky ${animateHeader()} shadow-sm z-[999] border-b-[1.4px] dark:bg-cardBgDark rounded-t-xl md:p-4 p-4 transition-all duration-200`}>
        <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out"
            >
              <IoIosArrowRoundBack size={40} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title} <span onClick={() => setShowForm(true)} className='text-sm text-blue-700 underline cursor-pointer ml-4'>Life cycle !</span></h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {
              width < breakpoints.sm ?
                <button
                  className="filter relative"
                  aria-label="Filter results"
                  onClick={() => filterToggleFunction(!filterToggleValue)}
                >
                  <MdOutlineFilterList />
                  {filtersCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 flex items-center justify-center
                 min-w-5 h-5 px-1
                 bg-red-500 text-white text-xs font-semibold
                 rounded-full ring-2 ring-white dark:ring-gray-900
                 shadow-sm"
                      aria-hidden="true"
                    >
                      {filtersCount > 99 ? '99+' : filtersCount}
                    </span>
                  )}
                </button> : ""
            }
            <button
              className="report "
            >
              {width > breakpoints.sm ? "Report" : ""}
              <HiDocumentReport />
            </button>
            <button
              onClick={() => settingToggleFunction(!settingToggleValue)}
              className="setting"
            >
              {width > breakpoints.sm ? "Setting" : ""}
              <FaCog />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-between gap-4 w-[100%] ">
          {width > breakpoints.sm ?
            <button
              onClick={buttonAction}
              className="twoD-style-button-three w-fit flex items-center gap-1"
            >
              <span>{buttonName}</span>
              <MdOutlineCreateNewFolder className="text-[1.3rem]" />
            </button> : ""}
          <div className="flex items-center gap-2 w-[100%] md:w-auto">
            <div className="relative w-[100%] md:w-64">
              <input
                onChange={handleChange}
                type="text"
                name="search"
                value={searchInput}
                placeholder="Search..."
                className="input-base pl-8"
              />
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-sideNavActiveChildBgDark text-xl" />
            </div>
            {width > breakpoints.sm ?
              <button
                className="filter relative"
                aria-label="Filter  results"
                onClick={() => filterToggleFunction(!filterToggleValue)}
              >
                <span>Filters</span>
                <MdOutlineFilterList className="text-lg" />
                {/* Active Filters Badge */}
                {filtersCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center
                 min-w-5 h-5 px-1
                 bg-red-500 text-white text-xs font-semibold
                 rounded-full ring-2 ring-white dark:ring-gray-900
                 shadow-sm"
                    aria-hidden="true"
                  >
                    {filtersCount > 99 ? '99+' : filtersCount}
                  </span>
                )}
              </button> : ""
            }
            {
              filtersCount > 0 && (
                <Tippy className="" content="Reset Filters" placement="top" arrow={true} animation="fade">
                  <button
                    className="flex items-center justify-center p-1 rounded-md bg-blue-300 dark:bg-orange-500 hover:bg-blue-600 dark:hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-label="Announcements"
                    onClick={resetFilter}
                  >
                    <IoIosRefresh className="text-white dark:text-white text-[1rem]" />
                  </button>
                </Tippy>
              )
            }
          </div>
        </div>
      </div>
      {
        (data?.length === 0 && !dataLoading) ? <>{noData}</>
          :
          <div className="bg-white min-h-[70vh] dark:bg-cardBgDark rounded-b-xl md:p-4 p-4 ">
            <div className={styles.tableContainer}>
              <div className={`${styles.tableWrapper} overflow-auto min-h-[57vh]`}>
                <table
                  className={styles.table}
                  style={{
                    '--header-bg': headerBackground,
                    '--header-color': headerTextColor,
                    '--nodata-color': nodataTextColor,
                    '--row-bg': rowBackground,
                    '--row-color': rowTextColor,
                    '--alternate-row-bg': alternateRowBackground,
                    '--border-color': '#e5e7eb',
                    '--row-bg-hover': rowHoverBackground,
                  }}
                >
                  <thead>
                    <tr>
                      {columns?.map((column, index) => (
                        <th key={index} style={{ width: column.width }}>
                          {column.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataLoading ? (
                      <tr>
                        <td colSpan={columns.length} className={styles.loadingCell}>
                          <div className="flex flex-col gap-6 justify-center items-center">
                            <LoadingSpinner5 />
                            <span className='text-black dark:text-gray-400'>Loading...</span>

                          </div>
                        </td>
                      </tr>
                    ) : data?.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length} className={styles.noData}>
                          <div className=' flex justify-center items-center'>
                            <img src={images.noData} className='w-10 h-10' alt="" />
                            <span> No data found</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td key={colIndex} data-label={column.header}>
                              {column.render
                                ? column.render(row[column.key], row)
                                : row[column.key]}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className={`flex justify-between py-4`}>
                <div className={styles.rowsPerPage}>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Per page:</span>
                  <select
                    className="text-gray-800 dark:text-gray-200 bg-white dark:bg-fullBackgroungDark rounded-md"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    {[5, 10, 20, 50].map((option, index) => (
                      <option
                        className="text-gray-800 dark:text-gray-200 text-xs"
                        key={index}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.pageControls}>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    page {Number(currentPage)} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(Number(currentPage) - 1)}
                    disabled={Number(currentPage) === 1}
                    className="text-gray-800 dark:text-gray-200 bg-white dark:bg-fullBackgroungDark px-3 py-1.5 text-xs"
                  >
                    <BiChevronsLeft className='text-[1.2rem]' />
                  </button>
                  <button
                    onClick={() => handlePageChange(Number(currentPage) + 1)}
                    disabled={Number(currentPage) === totalPages}
                    className="text-gray-800 dark:text-white bg-white dark:bg-fullBackgroungDark px-3 py-1.5 text-xs"
                  >
                    <BiChevronsRight className='text-[1.2rem] ' />
                  </button>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Total rows - <span className="font-semibold">{totalItems}</span>
                </span>
              </div>
            </div>
          </div>
      }
      {/* floating create button */}
      {width < breakpoints.sm ?
        <button
          onClick={buttonAction}
          className="twoD-style-button-three fixed left-2 top-[80%] w-fit flex items-center gap-1"
        >
          <BsPlus className="text-[1.3rem]" />
        </button> : ""}


      {/* life cycle model */}


      <Transition appear show={showForm} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={() => setShowForm(false)}>
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
              <Dialog.Panel className="md:w-[80%] w-[100%]    bg-white dark:bg-upperCardBgDark rounded-lg shadow-xl flex flex-col max-h-[80vh]">
                {/* Fixed Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-upperCardBgDark">
                  <h2 className="md:text-xl text-base  font-bold text-gray-700 dark:text-gray-500">
                   {lifeCycleTitle}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    aria-label="Close"
                  >
                    <RxCross2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 py-4 overflow-y-auto  space-y-5">

                  {lifeCycle && lifeCycle}


                </div>

                {/* Fixed Footer */}
                <div className="flex justify-end gap-3 md:p-4 p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-upperCardBgDark">
                  <button
                    onClick={() => setShowForm(false)}
                    className="twoD-style-button-cancel flex gap-1 items-center "
                  >
                    <span>Close</span>
                    <RxCross2 />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>





    </div>
  );
}
export default CustomTable;