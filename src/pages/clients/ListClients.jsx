import React, { useEffect, useState, Fragment } from 'react'
import CustomTable from '../../components/CustomTable/CustomTable'
import useDarkmode from '../../Hooks/useDarkMode';
import clientService from '../../services/clientService';
import Hamberger from '../../components/Hamberger/Hamberger';
import { FaRedoAlt, FaRegEdit, FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from "@headlessui/react";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional: default CSS styling
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { BsDot } from "react-icons/bs";

function ListClients({ noFade }) {

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
                        {row?.firstName + " " + row?.lastName}
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
            key: 'role', header: 'Client Type', with: "auto",
            render: (value, row) => {
                const name = value ? value?.name : ""
                return (
                    <span className={`${name ? "text-custom-gradient-soft-blue" : "text-custom-gradient-red"} text-[.80rem] whitespace-nowrap font-bold text-custom-gradient-soft-blue border border-blue-200 dark:text-white px-2 py-2 rounded-full`} >
                        {name ? name : "Type not found"}
                    </span>
                )
            }
        },
        {
            key: 'companyId', header: 'Organization Name', with: "auto",
            render: (value, row) => {
                const name = value ? value?.name : ""
                return (
                    <span className={`${name ? "text-custom-gradient-soft-blue" : "text-red-600"} border border-red-600 text-[.80rem] whitespace-nowrap font-bold px-2 py-2 rounded-full`} >
                        {name ? name : "No organization created"}
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
                            className={` text-[.80rem] flex items-center font-bold text-white px-2 py-1 rounded-full`}
                        >
                            <BsDot className={`${value ? "text-green-600" : "text-custom-gradient-red"
                                }  text-[1.5rem]`} />
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
                <div className='flex gap-3'>
                    <Tippy
                        content={"Edit"}
                        placement="top"
                        theme="custom"
                    >
                        <button
                            className='border p-2 shadow-2xl rounded-full'
                            onClick={() => handleView(row?._id)}
                        >
                            <MdEditDocument className='text-gray-600 dark:text-white' />
                        </button>
                    </Tippy>
                    {
                        row?.deletedAt ?
                            <Tippy
                                content={"Restore"}
                                placement="top"
                                theme="custom"
                            >
                                <button
                                    onClick={() => handleRestore(currentPage, rowsPerPage, text, row?._id)}
                                    className='bg-green-100 dark:bg-green-900/60 p-2 rounded-md'
                                >
                                    <FaRedoAlt />
                                </button>
                            </Tippy>
                            :
                            <Tippy
                                content={"Delete"}
                                placement="top"
                                theme="custom"
                            >
                                <button
                                    onClick={() => handleDelete(currentPage, rowsPerPage, text, row?._id)}
                                    className='border p-2 shadow-xl rounded-full'
                                >
                                    <FaTrash className='text-gray-600 dark:text-white' />
                                </button>
                            </Tippy>
                    }
                </div>
            ),
        }
    ];

    async function getClients(currentPage, rowsPerPage, text) {
        try {
            const response = await clientService.getClients(currentPage, rowsPerPage, text);
            return response
        } catch (error) {
            throw error
        }
    }

    async function handleView(id) {
        try {
            setShowLoadingModal(true)
            const response = await clientService.getParticularClient(id);
            setShowLoadingModal(false);
            setTimeout(() => {
                navigate("/create/clients", { state: { client: response?.data?.data?.data } })
            }, 600);
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

    async function handleActiveInactive(currentPage, rowsPerPage, text, status, id) {
        try {
            const dataObject = {
                status: status ? "0" : "1",
                clientId: id,
                keyword: text,
                page: currentPage,
                perPage: rowsPerPage
            }
            setShowLoadingModal(true)
            const response = await clientService.activeInactive(dataObject);

            setUpdatedData(response.data?.data?.data)
            setShowLoadingModal(false)


        } catch (error) {
            setShowLoadingModal(false)

            console.log("error while active inactive status", error);
        }
    }

    function buttonAction() {
        navigate("/create/clients")
    }

    return (
        <div className="max-w-7xl mx-auto mt-8 mb-10 px-2 sm:px-4 lg:px-8">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Custom Fields</Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li aria-current="page" className="text-gray-700 dark:text-gray-300">
                        Create
                    </li>
                </ol>
            </nav>
            <h2 className="md:text-2xl text-1xl font-semibold text-formHeadingLight dark:text-orangeBorder mb-2 text-start">{`All Clients`}</h2>
            <div className="h-[1.8px] bg-formHeadingLight dark:bg-orangeBorder mb-4"></div>
            <CustomTable
                columns={columns}
                fetchData={getClients}
                headerBackground={isDark ? "#daa366" : "white"}
                headerTextColor={isDark ? "#white" : "#171a1d"}
                rowBackground={isDark ? "#1c212c" : "#fff"}
                rowTextColor={isDark ? "#fff" : "#2196f3"}
                alternateRowBackground={isDark ? "#333" : "#f9f9f9"}
                defaultRowsPerPage={10}
                buttonName={"Create Client"}
                buttonAction={buttonAction}
                updatedData={updatedData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                text={text}
                setText={setText}

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

export default ListClients



