


import { useEffect, useState, useCallback, useMemo, Fragment } from 'react';
import CustomTable from '../../components/CustomTable/CustomTable';
import useDarkmode from '../../Hooks/useDarkMode';
import curriculumService from '../../services/curriculum/curriculum.service';
import campusService from '../../services/campus/campus.service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import NoAcademicYear from './NoAcademicYear';
import LoadingTwo from '../../components/Loading/LoadingTwo';
import AcademicYearFilters from './AcademicYearFilters';

// Icons
import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RiFileEditLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import { SlEye } from 'react-icons/sl';
import { FaRedoAlt } from 'react-icons/fa';
import academicYearService from '../../services/academicYear/academicYear.service';

const DEFAULT_FORM = { unit_id: '', name: '', code: '', description: '' };

function AcademicYear({ noFade = false }) {
    const [isDark] = useDarkmode();
    const navigate = useNavigate();
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    const { organization } = useSelector((state) => state.organizationSlice);

    // State
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
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
    const [showCurriculumFilterModel, setShowCurriculumFilterModel] = useState(false); // Fixed name

    const isEnterprise = clientUser?.isEnterpriseType;
    const tenantId = clientUser?.orgId;
    const enterpriseUuid = isEnterprise ? organization?.enterprise_uuid : clientUser?.enterpriseUuId;

    // Fetch Units
    useEffect(() => {
        if (isEnterprise && organization?._id) {
            campusService.listAllUnits(organization._id)
                .then(res => setUnits(res?.data?.data || []))
                .catch(() => toast.error('Failed to load units'));
        } else if (!isEnterprise && organization?._id) {
            setFormData(prev => ({ ...prev, unit_id: organization._id }));
        }
    }, [isEnterprise, organization]);

    // Validation
    const validate = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!editId && !formData.code.trim()) newErrors.code = 'Code is required';
        if (isEnterprise && !formData.unit_id) newErrors.unit_id = 'Unit is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, isEnterprise, editId]);

    // Input Change
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            let response;
            if (editId) {
                response = await curriculumService.update({
                    curriculumId: editId, // Fixed: was mediumId
                    tenantId,
                    name: formData.name,
                    description: formData.description
                });
            } else {
                const payload = {
                    unit_id: formData.unit_id,
                    name: formData.name,
                    code: formData.code,
                    description: formData.description,
                    enterprise_id: enterpriseUuid
                };
                response = await curriculumService.create(payload);
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

    // Open Form
    const openForm = useCallback((data = null, viewMode = false) => {
        setIsViewMode(viewMode);
        if (data) {
            setEditId(data._id);
            setFormData({
                unit_id: data.unit_id || '',
                name: data.name || '',
                code: data.code || '',
                description: data.description || ''
            });
        } else {
            setEditId(null);
            setFormData(isEnterprise ? DEFAULT_FORM : { ...DEFAULT_FORM, unit_id: organization?._id });
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
            const unitId = isEnterprise ? null : organization?._id;
            const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

            const res = await academicYearService.getList(page, perPage, keyword, unitId, entUuid, selectedStatus, selectedUnitId);

            setUpdatedData(res.data?.data || []);
            setTotalData(res.data?.total || 0);
        } catch {
            toast.error('Failed to load curriculums');
        } finally {
            setDataLoading(false);
        }
    }, [isEnterprise, organization, selectedStatus, selectedUnitId]);

    useEffect(() => {
        fetchList(currentPage, rowsPerPage, searchText);
    }, [currentPage, rowsPerPage, searchText, selectedStatus, selectedUnitId, refreshKey, fetchList]);

    // Toggle Status
    const toggleStatus = async (currentStatus, id) => {
        setShowLoading(true);
        try {
            const unitId = isEnterprise ? null : organization?._id;
            const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

            const res = await curriculumService.activeInactive({
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
            toast.success(`Curriculum ${currentStatus ? 'deactivated' : 'activated'}`);
        } catch {
            toast.error('Failed to update status');
        } finally {
            setShowLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Curriculum?',
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
                const unitId = isEnterprise ? null : organization?._id;
                const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

                const res = await curriculumService.softDelete({
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
                toast.success('Curriculum deleted');
            } catch {
                toast.error('Failed to delete curriculum');
            } finally {
                setShowLoading(false);
            }
        }
    };

    // Restore
    const handleRestore = async (id) => {
        const result = await Swal.fire({
            title: 'Restore Curriculum?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        });

        if (result.isConfirmed) {
            setShowLoading(true);
            try {
                const unitId = isEnterprise ? null : organization?._id;
                const entUuid = isEnterprise ? organization?.enterprise_uuid : null;

                const res = await curriculumService.restore({
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
                toast.success('Curriculum restored');
            } catch {
                toast.error('Failed to restore curriculum');
            } finally {
                setShowLoading(false);
            }
        }
    };

    // Table Columns
    const columns = useMemo(() => {
        const base = [
            {
                header: 'Name',
                width: '200px',
                render: (_, row) => (
                    <span className="font-medium text-black dark:text-white">{row.name}</span>
                ),
            },
            {
                header: 'From Class',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-black dark:text-white ">{row.fromClass?.name || '-'}</span>
                ),
            },
            {
                header: 'To Class',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-black dark:text-white ">{row?.toClass?.name || '-'}</span>
                ),
            },
            {
                key: 'description',
                header: 'Description',
                width: '280px',
                render: (value) => (
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{value || '-'}</span>
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
                                            onClick={() => handleView(row, 'view')}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''} group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                            >
                                                <SlEye className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" />
                                                View
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                            onClick={() => handleView(row, 'edit')}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''} group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm`}
                                            >
                                                <RiFileEditLine className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" />
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => row?.deletedAt ? handleRestore(row._id) : handleDelete(row._id)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''} group hover:bg-blue-100 dark:hover:bg-custom-gradient-grey-blue flex items-center w-[100%] px-4 py-2 text-sm ${row?.deletedAt ? 'text-green-600' : 'text-red-600'}`}
                                            >
                                                {row?.deletedAt ? <FaRedoAlt className="mr-3 h-5 w-5" /> : <IoTrashOutline className="mr-3 h-5 w-5" />}
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

        if (isEnterprise) {
            base.splice(0, 0, {
                header: 'Unit',
                width: '180px',
                render: (_, row) => <span className="text-sm font-medium text-black dark:text-white">{row?.unit_id?.name || '—'}</span>
            });
        }

        return base;
    }, [isDark, isEnterprise, toggleStatus, openForm, handleDelete, handleRestore]);

    async function handleView(row, type) {
        try {
            if (type == "view") {
                navigate("/settings/academic/year/create", { state: { id: row?._id, row: row, view: true } });
            } else if (type == "edit") {
                navigate("/settings/academic/year/create", { state: { id: row?._id, row: row, view: false } });
            }
        } catch (error) {
            setShowLoadingModal(false)
            console.log("error while getting client data", error);
        }
    }

    // Filter count
    useEffect(() => {
        const count = [selectedStatus !== "all", selectedUnitId].filter(Boolean).length;
        setFiltersCount(count);
    }, [selectedStatus, selectedUnitId]);

    const resetFilter = () => {
        setSelectedStatus("all");
        setSelectedUnitId(null);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <CustomTable
                resetFilter={resetFilter}
                dataLoading={dataLoading}
                refreshCount={refreshKey}
                columns={columns}
                fetchData={fetchList}
                headerBackground={isDark ? '#a5a3a1f7' : '#f0f1f3'}
                headerTextColor={isDark ? '#fff' : '#171a1d'}
                rowBackground={isDark ? '#1c212c' : '#fff'}
                rowTextColor={isDark ? '#fff' : '#2196f3'}
                alternateRowBackground={isDark ? '1c212c' : ''}
                defaultRowsPerPage={10}
                buttonName="Academic Year"
                title="Academic Years"
                buttonAction={() => navigate("create")}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                text={searchText}
                setText={setSearchText}
                updatedData={updatedData}
                totalData={totalData}
                noData={<NoAcademicYear />}
                filterToggleValue={showCurriculumFilterModel}
                filterToggleFunction={setShowCurriculumFilterModel}
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
                                    <h2 className="text-xl font-semibold text-formHeadingLight dark:text-orangeBorder">
                                        {isViewMode ? 'View Academic Year' : editId ? 'Edit Academic Year' : 'Create Academic Year'}
                                    </h2>
                                    <button onClick={closeForm} className="text-gray-500 border rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-red-400 transition-colors">
                                        <RxCross2 className="p-1 text-[1.5rem] text-red-700" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                                    {isEnterprise && (
                                        <div>
                                            <label className="block input-label">Unit <span className="text-red-500">*</span></label>
                                            <select
                                                name="unit_id"
                                                value={formData.unit_id}
                                                onChange={handleInputChange}
                                                className="input-base"
                                                required
                                                disabled={isViewMode || !!editId}
                                            >
                                                <option value="">Select Unit</option>
                                                {units.map(unit => (
                                                    <option key={unit._id} value={unit._id}>{unit.name}</option>
                                                ))}
                                            </select>
                                            {errors.unit_id && <p className="text-red-500 text-xs mt-1">{errors.unit_id}</p>}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block input-label">Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            placeholder="e.g. CBSE, ICSE, State Board"
                                            required
                                            disabled={isViewMode}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    {!editId && (
                                        <div>
                                            <label className="block input-label">Code <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="code"
                                                value={formData.code}
                                                onChange={handleInputChange}
                                                className="input-base"
                                                placeholder="e.g. CBSE2024"
                                                required
                                                disabled={isViewMode}
                                            />
                                            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block input-label">Description <span className="text-red-500">*</span></label>
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
                                </form>

                                {responseError && (
                                    <div className="p-4 bg-red-100 rounded-lg mx-6 mb-4">
                                        <p className="text-red-700 text-sm">{responseError}</p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-cardBgDark">
                                    <button onClick={closeForm} className="twoD-style-button-cancel">
                                        {isViewMode ? 'Close' : 'Cancel'}
                                    </button>
                                    {!isViewMode && (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className={`twoD-style-button-three transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Saving...' : editId ? 'Update' : 'Create'}
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <AcademicYearFilters
                selectedUnitId={selectedUnitId}
                setSelectedUnitId={setSelectedUnitId}
                resetFilter={resetFilter}
                filtersCount={filtersCount}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                units={units}
                showFilter={showCurriculumFilterModel}
                setShowFilter={setShowCurriculumFilterModel}
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

export default AcademicYear;