

import React, { useEffect, useState, Fragment, useCallback } from 'react'
import CustomTable from '../../components/CustomTable/CustomTable'
import useDarkmode from '../../Hooks/useDarkMode';
import clientService from '../../services/clientService';
import Hamberger from '../../components/Hamberger/Hamberger';
import { FaRedoAlt, FaRegEdit, FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition, Menu } from "@headlessui/react";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional: default CSS styling
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import campusService from '../../services/campus/campus.service';
import { useDispatch, useSelector } from 'react-redux';
import { SlEye } from "react-icons/sl";
import { RiFileEditLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import NoUnit from './NoUnit';
import toast from 'react-hot-toast';
import { setFalseForCreatePage, setFalseForEditPage, setTrueForCreatePage, setTrueForEditPage } from '../../store/reducer/test/onCreatePageSlice';

function Units({ noFade }) {
    const dispatch = useDispatch()
    const { organization } = useSelector((state) => state?.organizationSlice);

    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const handleCloseLoadingModal = () => {
        setShowLoadingModal(false);
    };
    const [isDark] = useDarkmode();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [text, setText] = useState("");
    const [updatedData, setUpdatedData] = useState([])
    const [totalData, setTotalData] = useState(0);

    const columns = [
        {
            key: 'display_id', header: 'ID', with: "auto",
            render: (value) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {value}
                    </span>
                )
            }
        },
        {
            header: 'Name', width: '200px',
            render: (value, row) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {row?.name}
                    </span>
                )
            }
        },
        {
            header: 'Code', width: '200px',
            render: (value, row) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {row?.institutionCode}
                    </span>
                )
            }
        },
        {
            header: 'Affiliation', width: '200px',
            render: (value, row) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {row?.affiliation}
                    </span>
                )
            }
        },
        {
            key: 'phone', header: 'Phone', width: '200px',
            render: (value) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {value}
                    </span>
                )
            }
        },
        {
            key: 'email', header: 'Email',
            render: (value) => {
                return (
                    <span className={`whitespace-nowrap  text-black dark:text-white  rounded-md`} >
                        {value}
                    </span>
                )
            }
        },
        {
            key: 'active',
            header: 'Status',
            render: (value, row) => {
                console.log("row active", row?.active);
                return (
                    <Tippy
                        content={value ? "Click to deactivate" : "Click to activate"}
                        placement="top"
                        theme="custom"

                    >
                        <button
                            onClick={() =>
                                handleActiveInactive(currentPage, rowsPerPage, text, row?.active, row?._id)
                            }
                            className={` text-[.80rem] w-[4rem]  flex items-center justify-center font-bold text-white px-2 py-1 rounded-full`}
                        >
                            {/* <BsDot className={`${value ? "text-green-600" : "text-custom-gradient-red"
                                }  text-[1.5rem]`} /> */}
                            <span className={`${value ? "text-green-600" : "text-red-700"
                                } `}>{value ? "Active" : "InActive"}</span>
                        </button>
                    </Tippy>
                )
            },
        },
        {
            header: 'Action',
            render: (value, row) => (
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="border p-2 shadow-xl rounded-full text-gray-600 dark:text-white">
                            <BsThreeDotsVertical />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 -translate-y-2"
                        enterTo="transform opacity-100 translate-y-0"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 translate-y-0"
                        leaveTo="transform opacity-0 -translate-y-2"
                    >
                        <Menu.Items className={`absolute top-[-1rem] right-[2rem] z-10 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDark ? 'bg-cardBgDark text-white' : 'bg-white text-gray-900'}`}>
                            <div className="">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => handleView(row, 'view')}
                                            className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                } group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                        >
                                            <SlEye className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-100" aria-hidden="true" />
                                            View
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => handleView(row, 'edit')}
                                            className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                } group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                        >
                                            <RiFileEditLine className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-100" aria-hidden="true" />
                                            Edit
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => row?.deletedAt ? handleRestore(currentPage, rowsPerPage, text, row?._id) : handleDelete(currentPage, rowsPerPage, text, row?._id)}
                                            className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                } group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm ${row?.deletedAt ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {row?.deletedAt ? (
                                                <FaRedoAlt className="mr-3 h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <IoTrashOutline className="mr-3 h-5 w-5" aria-hidden="true" />
                                            )}
                                            {row?.deletedAt ? 'Restore' : 'Delete'}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ),
        }
    ];

    async function getList(currentPage, rowsPerPage, text) {
        try {
            const response = await campusService.listUnits(currentPage, rowsPerPage, text, organization?._id);
            console.log("units list response", response);

            return response
        } catch (error) {
            throw error
        }
    }

    const fetchList = useCallback(async (page, perPage, keyword) => {
        try {
            const res = await campusService.listUnits(currentPage, rowsPerPage, text, organization?._id);

            console.log("res", res?.data?.data);

            setUpdatedData(res.data?.data || []);
            setTotalData(res.data?.total || 0);
            return res;
        } catch {
            toast.error('Failed to load mediums');
            throw new Error();
        }
    }, [organization]);


    useEffect(() => {
        fetchList(currentPage, rowsPerPage, text);
    }, [
        currentPage,
        rowsPerPage,
        fetchList             // important: include the callback itself
    ]);

    async function handleView(row, type) {
        try {
            navigate("/create/unit", { state: { id: row?._id, row: row, type: type } })
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while getting client data", error);
        }
    }


    async function handleView(row, type) {
        try {
            if (type == "view") {
                navigate("/create/unit", { state: { id: row?._id, row: row, view: true } });
                dispatch(setTrueForCreatePage())
            } else if (type == "edit") {
                navigate("/create/unit", { state: { id: row?._id, row: row, view: false } });
                dispatch(setTrueForEditPage())
            }
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while getting client data", error);
        }
    }

    async function handleDelete(currentPage, rowsPerPage, text, id) {
        try {
            const dataObject = {
                clientId: id,
                keyword: text,
                page: currentPage,
                perPage: rowsPerPage
            }
            setShowLoadingModal(true)
            const response = await clientService.softDeleteClient(dataObject);
            setUpdatedData(response.data?.data?.data)
            setShowLoadingModal(false);
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while getting company data", error);
        }
    }

    async function handleRestore(currentPage, rowsPerPage, text, id) {
        try {
            const dataObject = {
                clientId: id,
                keyword: text,
                page: currentPage,
                perPage: rowsPerPage
            }
            setShowLoadingModal(true)
            const response = await clientService.restoreClient(dataObject);
            setUpdatedData(response.data?.data?.data)
            setShowLoadingModal(false);
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while getting client data", error);
        }
    }

    async function handleActiveInactive(currentPage, rowsPerPage, text, status, id,) {
        try {
            const dataObject = {
                status: status ? "0" : "1",
                id: id,
                keyword: text,
                page: currentPage,
                perPage: rowsPerPage,
                enterpriseId: organization?._id
            }
            setShowLoadingModal(true)
            const response = await campusService.activeInactiveUnit(dataObject);
            setUpdatedData(response.data?.data)
            setShowLoadingModal(false)
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while active inactive status", error);
        }
    }

    function buttonAction() {
        navigate("/create/unit")
    }

    useEffect(() => {
        dispatch(setFalseForCreatePage())
        dispatch(setFalseForEditPage())
    }, [])

    return (
        <div className="xxl:max-w-7xl w-[100%] mx-auto mt-4 mb-10   lg:px-2 px-0">
            <CustomTable
                columns={columns}
                fetchData={getList}
                headerBackground={isDark ? '#303e4e' : '#f0f1f3'}
                headerTextColor={isDark ? '#fff' : '#171a1d'}
                rowBackground={isDark ? '#1c212c' : '#fff'}
                rowTextColor={isDark ? '#fff' : '#2196f3'}
                alternateRowBackground={isDark ? '1c212c' : ''}
                rowHoverBackground={isDark ? '#000000' : '#eaf1ffb9'}
                defaultRowsPerPage={10}
                buttonName={"Unit"}
                title={"Units"}
                buttonAction={buttonAction}
                updatedData={updatedData}
                totalData={updatedData?.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                text={text}
                setText={setText}
                noData={<NoUnit />}
            />
            <Transition appear show={showLoadingModal} as={Fragment}>
                <Dialog as="div" className="relative z-[99999]" onClose={handleCloseLoadingModal}>
                    <Transition.Child
                        as={Fragment}
                        enter={noFade ? "" : "duration-300 ease-out"}
                        enterFrom={noFade ? "" : "opacity-0"}
                        enterTo={noFade ? "" : "opacity-100"}
                        leave={noFade ? "" : "duration-200 ease-in"}
                        leaveFrom={noFade ? "" : "opacity-100"}
                        leaveTo={noFade ? "" : "opacity-0"}
                    >
                        <div className="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" />
                    </Transition.Child>
                    <div className="fixed  inset-0 overflow-y-auto flex justify-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter={noFade ? "" : "duration-300 ease-out"}
                            enterFrom={noFade ? "" : "opacity-0 scale-95"}
                            enterTo={noFade ? "" : "opacity-100 scale-100"}
                            leave={noFade ? "" : "duration-200 ease-in"}
                            leaveFrom={noFade ? "" : "opacity-100 scale-100"}
                            leaveTo={noFade ? "" : "opacity-0 scale-95"}
                        >
                            <Dialog.Panel>
                                <div className='flex  justify-center items-center'>
                                    <LoadingSpinner />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default Units

