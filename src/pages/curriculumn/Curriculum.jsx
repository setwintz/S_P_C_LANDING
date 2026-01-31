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
import NoCurriculum from './NoCurriculum';
import LoadingTwo from '../../components/Loading/LoadingTwo';
import CurriculumFilters from './CurriculumFilters';

// Icons
import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { RiFileEditLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import { SlEye } from 'react-icons/sl';
import { FaRedoAlt } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import LoadingSpinner5 from '../../components/Loading/LoadingSpinner5';

const DEFAULT_FORM = {
    unit_id: '',
    name: '',
    code: '',
    description: '',
    from_class_id: '',
    to_class_id: '',
    medium_id: '',
    academic_shift_type_id: ''
};

function Curriculum({ noFade = false }) {
    const [isDark] = useDarkmode();
    const navigate = useNavigate();
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    const { organization } = useSelector((state) => state.organizationSlice);
    const { tenant } = useSelector((state) => state?.tenantSlice);


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


    const [classes, setClasses] = useState([]);
    const [mediums, setMediums] = useState([]);
    const [shifts, setShifts] = useState([]);

    console.log("classes", classes);
    console.log("mediums", mediums);
    console.log("shifts", shifts);

    console.log("formData", formData);



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

        // Mandatory only on create (same pattern as code)
        if (!editId) {
            if (!formData.from_class_id) newErrors.from_class_id = 'From Class is required';
            if (!formData.to_class_id) newErrors.to_class_id = 'To Class is required';
            if (!formData.medium_id) newErrors.medium_id = 'Medium is required';
            if (!formData.academic_shift_type_id) newErrors.academic_shift_type_id = 'Academic Shift Type is required';
        }

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
                    curriculumId: editId,
                    unit_id: formData.unit_id,
                    enterprise_id: enterpriseUuid,
                    createdBy: clientUser?.user_uuid,

                    name: formData.name,
                    code: formData.code,
                    description: formData.description,
                    enterprise_id: enterpriseUuid,
                    fromClass: formData.from_class_id,
                    toClass: formData.to_class_id,
                    medium: formData.medium_id,
                    academicShiftType: formData.academic_shift_type_id
                });
            } else {
                const payload = {
                    unit_id: formData.unit_id,
                    enterprise_id: enterpriseUuid,
                    createdBy: clientUser?.user_uuid,

                    name: formData.name,
                    code: formData.code,
                    description: formData.description,
                    enterprise_id: enterpriseUuid,
                    fromClass: formData.from_class_id,
                    toClass: formData.to_class_id,
                    medium: formData.medium_id,
                    academicShiftType: formData.academic_shift_type_id
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
                unit_id: tenant?.unit_uuid,
                name: data.name || '',
                code: data.code || '',
                description: data.description || '',
                from_class_id: data.fromClass?._id || '',
                to_class_id: data.toClass?._id || '',
                medium_id: data.medium?._id || '',
                academic_shift_type_id: data.academicShiftType?._id || ''
            });
        } else {
            setEditId(null);
            setFormData(isEnterprise ? { ...DEFAULT_FORM, unit_id: tenant?.unit_uuid } : { ...DEFAULT_FORM, unit_id: organization?._id });
        }
        setErrors({});
        setResponseError(null);
        setShowForm(true);
    }, [isEnterprise, organization, tenant]);

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

            const res = await curriculumService.getList(page, perPage, keyword, unitId, entUuid, selectedStatus, selectedUnitId);

            setUpdatedData(res.data?.data || []);
            setTotalData(res.data?.total || 0);
        } catch {
            toast.error('Failed to load curriculums');
        } finally {
            setDataLoading(false);
        }
    }, [isEnterprise, organization, selectedStatus, selectedUnitId]);


    useEffect(() => {

        if (tenant && tenant?.unit_uuid) {
            getLinkedDataList(tenant?.unit_uuid);
        }

    }, [tenant]);


    const getLinkedDataList = useCallback(async (id) => {
        try {
            const res = await curriculumService.getLinkedData(id);
            setClasses(res?.data?.data?.classes)
            setMediums(res?.data?.data?.mediums)
            setShifts(res?.data?.data?.shifts)
        } catch {
            toast.error('Failed to load linked data');
        }
    }, [tenant]);


    useEffect(() => {
        fetchList(currentPage, rowsPerPage, searchText);
    }, [currentPage, rowsPerPage, searchText, selectedStatus, selectedUnitId, refreshKey, fetchList]);

    // Toggle Status
    const toggleStatus = async (currentStatus, id) => {
        setShowLoading(true);
        try {
            const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
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
                const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
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
                const unitId = isEnterprise ? tenant?.unit_uuid : organization?.unit_uuid;
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
                    <span className="font-medium text-gray-800 dark:text-white">{row.name}</span>
                ),
            },
            {
                header: 'Code',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.code || '-'}</span>
                ),
            },
            {
                header: 'From',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.fromClass?.name || '-'}</span>
                ),
            },
            {
                header: 'To',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.toClass?.name || '-'}</span>
                ),
            },
            {
                header: 'Medium',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.medium?.name || '-'}</span>
                ),
            },
            {
                header: 'Shift',
                width: '120px',
                render: (_, row) => (
                    <span className="font-medium text-gray-800 dark:text-white">{row.academicShiftType?.name || '-'}</span>
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
                width: '130px',
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
                width: '10px',
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
                            <Menu.Items className={`absolute top-[-1rem] right-[2rem] z-10 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDark ? 'bg-upperCardBgDark text-white' : 'bg-white text-gray-900'}`}>
                                <div className="">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => openForm(row, true)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                    } group border-[1.4px] rounded-md border-transparent hover:border-primary dark:hover:border-primaryDark hover:bg-primary/30 dark:hover:bg-primaryDark/30 transition-colors duration-200 flex items-center w-[100%] px-4 py-2 text-sm`}                                            >
                                                <SlEye className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" />
                                                View
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => openForm(row, false)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                    } group border-[1.4px] rounded-md border-transparent hover:border-primary dark:hover:border-primaryDark hover:bg-primary/30 dark:hover:bg-primaryDark/30 transition-colors duration-200 flex items-center w-[100%] px-4 py-2 text-sm`}                                            >
                                                <RiFileEditLine className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-200" />
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => row?.deletedAt ? handleRestore(row._id) : handleDelete(row._id)}
                                                className={`${active ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''
                                                    } group border-[1.4px] rounded-md border-transparent hover:border-primary dark:hover:border-primaryDark hover:bg-primary/30 dark:hover:bg-primaryDark/30 transition-colors duration-200 flex items-center w-[100%] px-4 py-2 text-sm`}                                            >
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

        return base;
    }, [isDark, isEnterprise, toggleStatus, openForm, handleDelete, handleRestore]);

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
                buttonName="Curriculum"
                title="Curriculums"
                buttonAction={() => openForm()}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                text={searchText}
                setText={setSearchText}
                updatedData={updatedData}
                totalData={totalData}
                noData={<NoCurriculum />}
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
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-upperCardBgDark">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {isViewMode ? 'View Curriculum' : editId ? 'Edit Curriculum' : 'Create Curriculum'}
                                    </h2>
                                    <button
                                        onClick={closeForm}
                                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                        aria-label="Close"
                                    >
                                        <RxCross2 className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 gap-2 overflow-y-auto p-6 ">
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
                                        <label className="block input-label">From Class <span className="text-red-500">*</span></label>
                                        <select
                                            name="from_class_id"
                                            value={formData.from_class_id}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode || !!editId}
                                        >
                                            <option value="">Select From Class</option>
                                            {classes.map(clas => (
                                                <option key={clas._id} value={clas._id}>{clas.name}</option>
                                            ))}
                                        </select>
                                        {errors.from_class_id && <p className="text-red-500 text-xs mt-1">{errors.from_class_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block input-label">To Class <span className="text-red-500">*</span></label>
                                        <select
                                            name="to_class_id"
                                            value={formData.to_class_id}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode || !!editId}
                                        >
                                            <option value="">Select To Class</option>
                                            {classes.map(clas => (
                                                <option key={clas._id} value={clas._id}>{clas.name}</option>
                                            ))}
                                        </select>
                                        {errors.to_class_id && <p className="text-red-500 text-xs mt-1">{errors.to_class_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block input-label">Medium <span className="text-red-500">*</span></label>
                                        <select
                                            name="medium_id"
                                            value={formData.medium_id}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode || !!editId}
                                        >
                                            <option value="">Select Medium</option>
                                            {mediums.map(med => (
                                                <option key={med._id} value={med._id}>{med.name}</option>
                                            ))}
                                        </select>
                                        {errors.medium_id && <p className="text-red-500 text-xs mt-1">{errors.medium_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block input-label">Academic Shift Type <span className="text-red-500">*</span></label>
                                        <select
                                            name="academic_shift_type_id"
                                            value={formData.academic_shift_type_id}
                                            onChange={handleInputChange}
                                            className="input-base"
                                            required
                                            disabled={isViewMode || !!editId}
                                        >
                                            <option value="">Select Academic Shift Type</option>
                                            {shifts.map(shif => (
                                                <option key={shif._id} value={shif._id}>{shif.name}</option>
                                            ))}
                                        </select>
                                        {errors.academic_shift_type_id && <p className="text-red-500 text-xs mt-1">{errors.academic_shift_type_id}</p>}
                                    </div>

                                    <div className='md:col-span-2'>
                                        <label className="block input-label">Description <span className="text-red-500">*</span></label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="input-base-desc"
                                            rows={6}
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

                                <div className="flex justify-end gap-3 md:p-4 p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-upperCardBgDark">
                                    <button
                                        onClick={closeForm}
                                        className="twoD-style-button-cancel flex gap-1 items-center "
                                    >
                                        <span>{isViewMode ? 'Close' : 'Cancel'}</span>
                                        <RxCross2 />
                                    </button>
                                    {!isViewMode && (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className={`twoD-style-button-three transition-colors flex items-center gap-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}                                        >
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

            <CurriculumFilters
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
                        <LoadingSpinner5 />
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default Curriculum;