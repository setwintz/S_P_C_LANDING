import { useEffect, useState, useCallback, useMemo, Fragment } from 'react';
import CustomTable from '../../components/CustomTable/CustomTable';
import useDarkmode from '../../Hooks/useDarkMode';
import academicShiftTypeService from '../../services/academicShiftType/academicShiftType.service';
import campusService from '../../services/campus/campus.service';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import NoAcademicShiftType from './NoAcademicShiftType';
import LoadingTwo from '../../components/Loading/LoadingTwo';
import AcademicShiftTypeFilters from './AcademicShiftTypeFilters';

// Icons
import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RiFileEditLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import { SlEye } from 'react-icons/sl';
import { FaRedoAlt } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';

// Constants
const DEFAULT_FORM = { unit_id: '', name: '', description: '', startTime: '', endTime: '' };

function AcademicShiftType({ noFade = false }) {
    const [isDark] = useDarkmode();
    const navigate = useNavigate();
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    const { organization } = useSelector((state) => state.organizationSlice);
    const { tenant } = useSelector((state) => state?.tenantSlice);

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('currentPage')) || 1;
    const rowsPerPage = Number(searchParams.get('rowsPerPage')) || 10;
    const searchText = searchParams.get('searchText') || "";

    console.log("pagination", {
        currentPage: currentPage,
        rowsPerPage: rowsPerPage,
        searchText: searchText
    });

    const updateSearchParams = (params) => {
        console.log("new params", params);

        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            Object.entries(params).forEach(([key, value]) => {
                console.log("key", key);
                console.log("value", value);

                if (value === null || value === undefined || value === '') {
                    newParams.delete(key);
                } else {
                    newParams.set(key, value);
                }
            });
            console.log("newParams", newParams);

            return newParams;
        });
    };

    const handlePageChange = (page) => {
        updateSearchParams({ currentPage: page });
    };

    const handleRowsPerPageChange = (rows) => {
        updateSearchParams({
            rowsPerPage: rows,
            currentPage: 1, // industry standard
        });
    };

    const handleSearchChange = (text) => {
        updateSearchParams({
            searchText: text,
            currentPage: 1,
        });
    };

    // State
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [filtersCount, setFiltersCount] = useState(0);

    const [refreshKey, setRefreshKey] = useState(0);
    const [units, setUnits] = useState([]);
    const [formData, setFormData] = useState(DEFAULT_FORM);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [updatedData, setUpdatedData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [responseError, setResponseError] = useState(null);
    const [showFilterModel, setShowFilterModel] = useState(false); // Fixed name

    const isEnterprise = clientUser?.isEnterpriseType;
    const tenantId = clientUser?.orgId;
    const enterpriseUuid = isEnterprise ? organization?.enterprise_uuid : clientUser?.enterpriseUuId;

    console.log("formData", formData);


    // Fetch Units (Enterprise only)
    useEffect(() => {
        if (isEnterprise && organization?._id) {
            campusService.listAllUnits(organization._id)
                .then(res => setUnits(res?.data?.data || []))
                .catch(() => toast.error('Failed to load units'));
        } else if (!isEnterprise && organization?._id) {
            setFormData(prev => ({ ...prev, unit_id: organization.unit_uuid }));
        }
    }, [isEnterprise, organization]);

    const validate = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Shift Type is required';
        if (isEnterprise && !formData.unit_id) newErrors.unit_id = 'Unit is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.startTime) newErrors.startTime = 'Start Time is required';
        if (!formData.endTime) newErrors.endTime = 'End Time is required';

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (formData.startTime && !timeRegex.test(formData.startTime)) {
            newErrors.startTime = 'Invalid time format (HH:MM)';
        }

        if (formData.endTime && !timeRegex.test(formData.endTime)) {
            newErrors.endTime = 'Invalid time format (HH:MM)';
        }

        setErrors(newErrors);

        console.log("Object.keys(newErrors).length === 0", Object.keys(newErrors).length === 0);
        

        return Object.keys(newErrors).length === 0;
    }, [formData, isEnterprise]);


    // Handle Input Change
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            let response;
            if (editId) {
                response = await academicShiftTypeService.update({
                    academicShiftTypeId: editId, // Fixed: was mediumId
                    unit_id: formData?.unit_id,
                    name: formData.name,
                    description: formData.description,
                    startTime: formData.startTime.trim(),
                    endTime: formData.endTime.trim(),
                    createdBy: clientUser?.user_uuid,
                });
            } else {
                const payload = {
                    unit_id: formData.unit_id,
                    name: formData.name,
                    description: formData.description,
                    startTime: formData.startTime.trim(),
                    endTime: formData.endTime.trim(),
                    enterprise_id: enterpriseUuid,
                    createdBy: clientUser?.user_uuid,
                };
                response = await academicShiftTypeService.create(payload);
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: response?.data?.message || 'Success!',
                showConfirmButton: false,
                timer: 2000,
            });

            closeForm();
            setRefreshKey(prev => prev + 1);
        } catch (err) {
            const msg = err?.response?.data?.message || 'Operation failed';
            setResponseError(msg);
        } finally {
            setLoading(false);
        }
    };

    // Open Form: Create / Edit / View
    const openForm = useCallback((data = null, viewMode = false) => {
        setIsViewMode(viewMode);
        if (data) {
            setEditId(data._id);
            setFormData({
                unit_id: data?.unit_linked_uuid?.unit_uuid || '',
                name: data.name || '',
                description: data.description || '',
                startTime: data.startTime || '',
                endTime: data.endTime || ''
            });
        } else {
            setEditId(null);
            setFormData(isEnterprise ? {...DEFAULT_FORM, unit_id: tenant?.unit_uuid } : { ...DEFAULT_FORM, unit_id: organization?.unit_uuid });
        }
        setErrors({});
        setResponseError(null);
        setShowForm(true);
    }, [isEnterprise, organization]);

    const closeForm = useCallback(() => {
        setShowForm(false);
        setIsViewMode(false);
        setEditId(null);
        setFormData(DEFAULT_FORM);
        setErrors({});
        setResponseError(null);
    }, []);

    // Fetch List
    const fetchList = useCallback(async (page, perPage, keyword) => {
        try {
            setDataLoading(true);
            const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
            const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

            const res = await academicShiftTypeService.getList(page, perPage, keyword, unitId, entUuid, selectedStatus, selectedUnitId);

            setUpdatedData(res.data?.data || []);
            setTotalData(res.data?.total || 0);
        } catch {
            toast.error('Failed to load shift types');
        } finally {
            setDataLoading(false);
        }
    }, [isEnterprise, organization, selectedStatus, selectedUnitId]);

    useEffect(() => {
        fetchList(currentPage, rowsPerPage, searchText);
    }, [currentPage, rowsPerPage,
        searchText,
        selectedStatus, selectedUnitId, refreshKey, fetchList]);

    // Toggle Status
    const toggleStatus = async (currentStatus, id) => {
        setShowLoading(true);
        try {
            const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
            const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

            const res = await academicShiftTypeService.activeInactive({
                status: currentStatus ? '0' : '1',
                id,
                page: currentPage,
                perPage: rowsPerPage,
                keyword: searchText,
                unitId,
                entUuid,
                selectedStatus,
                selectedUnitId
            });

            setUpdatedData(res.data?.data || []);
            setTotalData(res.data?.total || 0);
            toast.success(`Shift Type ${currentStatus ? 'deactivated' : 'activated'}`);
        } catch {
            toast.error('Failed to update status');
        } finally {
            setShowLoading(false);
        }
    };

    // Delete Shift Type
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Shift Type?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            setShowLoading(true);
            try {
                const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
                const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

                const res = await academicShiftTypeService.softDelete({
                    id,
                    page: currentPage,
                    perPage: rowsPerPage,
                    keyword: searchText,
                    unitId,
                    entUuid,
                    selectedStatus
                });

                setUpdatedData(res?.data?.data || []);
                setTotalData(res?.data?.total || 0);
                toast.success('Shift Type deleted');
            } catch {
                toast.error('Failed to delete shift type');
            } finally {
                setShowLoading(false);
            }
        }
    };

    // Restore Shift Type
    const handleRestore = async (id) => {
        const result = await Swal.fire({
            title: 'Restore Shift Type?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        });

        if (result.isConfirmed) {
            setShowLoading(true);
            try {
                const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
                const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

                const res = await academicShiftTypeService.restore({
                    id,
                    page: currentPage,
                    perPage: rowsPerPage,
                    keyword: searchText,
                    unitId,
                    entUuid,
                    selectedStatus
                });

                setUpdatedData(res?.data?.data || []);
                setTotalData(res?.data?.total || 0);
                toast.success('Shift Type restored');
            } catch {
                toast.error('Failed to restore shift type');
            } finally {
                setShowLoading(false);
            }
        }
    };

    // Table Columns
    const columns = useMemo(() => {
        const base = [
            {
                header: 'Shift Type',
                width: '200px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.name}</span>
                ),
            },
            {
                key: 'description',
                header: 'Description',
                width: '250px',
                render: (value) => (
                    <span className="text-gray-800 dark:text-white text-sm">{value || '-'}</span>
                ),
            },
            {
                key: 'startTime',
                header: 'Start Time',
                width: '150px',
                render: (value) => (
                    <span className="text-gray-800 dark:text-white text-sm">{value || '-'}</span>
                ),
            },
            {
                key: 'endTime',
                header: 'End Time',
                width: '150px',
                render: (value) => (
                    <span className="text-gray-800 dark:text-white text-sm">{value || '-'}</span>
                ),
            },
            {
                header: 'Status',
                render: (_, row) => (
                    <Tippy content={row.active ? 'Deactivate' : 'Activate'} placement="top">
                        <button
                            onClick={() => toggleStatus(row.active, row._id)}
                            className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full"
                        >
                            <BsDot className={`text-xl ${row.active ? 'text-green-600' : 'text-red-600'}`} />
                            <span className={row.active ? 'text-green-600' : 'text-red-600'}>
                                {row.active ? 'Active' : 'Inactive'}
                            </span>
                        </button>
                    </Tippy>
                ),
            },
            {
                header: 'Actions',
                render: (_, row) => (
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
                            <Menu.Items className={`absolute top-[-1rem] right-[2rem] z-10 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDark ? 'bg-cardBgDark text-white' : 'bg-white text-gray-900'}`}>
                                <div className="">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => openForm(row, true)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                    } group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                            >
                                                <SlEye className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" aria-hidden="true" />
                                                View
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => openForm(row, false)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                    } group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                            >
                                                <RiFileEditLine className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" aria-hidden="true" />
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => row?.deletedAt ? handleRestore(row._id) : handleDelete(row._id)}
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
            },
        ];

        // if (isEnterprise) {
        //     base.splice(1, 0, {
        //         header: 'Unit',
        //         width: '180px',
        //         render: (_, row) => <span className="text-sm font-medium text-gray-800 dark:text-white">{row?.unit_linked_uuid?.name || '—'}</span>
        //     });
        // }

        return base;
    }, [isDark, isEnterprise, toggleStatus, openForm, handleDelete, handleRestore]);

    // Filters count
    useEffect(() => {
        const count = [selectedStatus !== "all", selectedUnitId].filter(Boolean).length;
        setFiltersCount(count);
    }, [selectedStatus, selectedUnitId]);

    const resetFilter = () => {
        setSelectedStatus("all");
        setSelectedUnitId(null);
    };

    return (
        <div className=" w-[100%] mx-auto mt-4 mb-10   lg:px-2 px-0">
            <CustomTable
                resetFilter={resetFilter}
                dataLoading={dataLoading}
                refreshCount={refreshKey}
                columns={columns}
                fetchData={fetchList}
                headerBackground={isDark ? '#303e4e' : '#f0f1f3'}
                headerTextColor={isDark ? '#fff' : '#171a1d'}
                rowBackground={isDark ? '#1c212c' : '#fff'}
                rowTextColor={isDark ? '#fff' : '#2196f3'}
                alternateRowBackground={isDark ? '1c212c' : ''}
                rowHoverBackground={isDark ? '#000000' : '#eaf1ffb9'}
                defaultRowsPerPage={10}
                buttonName="Shift Type"
                title="Shift Types"
                buttonAction={() => openForm()}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={handleRowsPerPageChange}
                text={searchText}
                setText={handleSearchChange}
                updatedData={updatedData}
                totalData={totalData}
                noData={<NoAcademicShiftType />}
                filterToggleValue={showFilterModel}
                filterToggleFunction={setShowFilterModel}
                filtersCount={filtersCount}
            />

            {/* Form Modal */}
            <Transition appear show={showForm} as={Fragment}>
                <Dialog as="div" className="relative z-[99999]" onClose={closeForm}>
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
                            <Dialog.Panel className="w-[100%] max-w-lg bg-white dark:bg-cardBgDark rounded-lg shadow-xl flex flex-col max-h-[80vh]">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-cardBgDark">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {isViewMode ? 'View Shift Type' : editId ? 'Edit Shift Type' : 'Create Shift Type'}
                                    </h2>
                                    <button
                                        onClick={closeForm}
                                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                        aria-label="Close"
                                    >
                                        <RxCross2 className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                                    <div>
                                        <label className="block input-label">
                                            Shift Type <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            placeholder="e.g. Morning, Evening"
                                            required
                                            disabled={isViewMode}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block input-label">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            rows="4"
                                            placeholder="Enter description"
                                            required
                                            disabled={isViewMode}
                                        />
                                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                    </div>
                                    <div>
                                        <label className="block input-label">
                                            Start Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode}
                                        />

                                        {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
                                    </div>
                                    <div>
                                        <label className="block input-label">
                                            End Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode}
                                        />

                                        {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
                                    </div>
                                </form>

                                {responseError && (
                                    <div className="mt-4 p-4 bg-red-100 rounded-lg">
                                        <p className="text-red-700 text-sm">{responseError}</p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-upperCardBgDark">
                                    <button
                                        onClick={closeForm}
                                        className="twoD-style-button-cancel flex items-center gap-1"
                                    >
                                        <span>{isViewMode ? 'Close' : 'Cancel'}</span>
                                        <RxCross2 />
                                    </button>
                                    {!isViewMode && (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className={`twoD-style-button-three flex items-center gap-1 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
                                            {
                                                loading ?
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    :
                                                    <FiSave className="w-4 h-4" />

                                            }
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <AcademicShiftTypeFilters
                selectedUnitId={selectedUnitId}
                setSelectedUnitId={setSelectedUnitId}
                resetFilter={resetFilter}
                filtersCount={filtersCount}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                units={units}
                showFilter={showFilterModel}
                setShowFilter={setShowFilterModel}
            />

            {/* Global Loading */}
            <Transition show={showLoading} as={Fragment}>
                <Dialog as="div" className="relative z-[9999]" onClose={() => { }}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <LoadingTwo />
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default AcademicShiftType;