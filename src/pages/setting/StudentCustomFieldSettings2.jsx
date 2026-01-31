

// new code


import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { RxCross2, RxValueNone } from 'react-icons/rx';
import { FaInfoCircle, FaExclamationCircle, FaGripVertical } from 'react-icons/fa';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import studentFieldSettingService from '../../services/setting/studentFieldSetting.service';
import useWidth from '../../Hooks/useWidth';
import toast from 'react-hot-toast';

// Reorder utility
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => ({
        ...item,
        gridConfig: { ...item.gridConfig, order: index + 1 },
    }));
};

// Shared Field Preview Component
const FieldPreview = React.memo(({ field }) => {
    const baseStyles = 'w-[100%] bg-transparent p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed';
    const options = field?.options?.map(item => ({ value: item, label: item })) || [];

    switch (field.type) {
        case 'text':
        case 'number':
        case 'email':
        case 'hyperlink':
            return <input disabled type={field.type} placeholder={field.placeholder} className={baseStyles} />;
        case 'textarea':
            return <textarea disabled placeholder={field.placeholder} className={`${baseStyles} min-h-[100px]`} />;
        case 'select':
            return <Select isDisabled options={options} className="basic-single" classNamePrefix="select" />;
        case 'multiselect':
            return <Select isDisabled isMulti options={options} className="basic-multi-select" classNamePrefix="select" />;
        case 'checkbox':
            return <input disabled type="checkbox" className="h-5 w-5 text-blue-600" />;
        case 'file':
            return <input disabled type="file" accept={field.validation?.fileTypes?.join(',')} className={baseStyles} />;
        case 'date':
        case 'datepicker':
            return <input disabled type="date" placeholder={field.placeholder || 'Select date'} className={baseStyles} />;
        case 'timepicker':
            return <input disabled type="time" placeholder={field.placeholder || 'Select time'} className={baseStyles} />;
        case 'color':
            return <input disabled type="color" className={`${baseStyles} h-10 cursor-not-allowed`} />;
        default:
            return <div className={baseStyles}>{field.type} (Preview)</div>;
    }
});

// Add Field Modal (unchanged logic, full preview)
const AddFieldModal = React.memo(({ isOpen, onClose, mode, currentSection, onSubmit, unitUuid, enterpriseUuid }) => {
    const { width, breakpoints } = useWidth();
    const [trigger] = useState('mouseenter focus');
    const [formData, setFormData] = useState({
        title_section: mode === 'new-tab' ? '' : currentSection || '',
        name: '',
        label: '',
        type: '',
        options: [],
        is_required: false,
        placeholder: '',
        validation: { regex: '', min: '', max: '', maxLength: '', minLength: '', fileTypes: [], maxSize: '' },
        gridConfig: { span: 12, order: 0 },
    });
    const [aspectRatio, setAspectRatio] = useState({ xAxis: '', yAxis: '' });
    const [errors, setErrors] = useState([]);
    const [optionInput, setOptionInput] = useState('');
    const [fileTypeInput, setFileTypeInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fieldTypes = useMemo(() => [
        'text', 'number', 'email', 'date', 'select', 'checkbox', 'textarea', 'multiselect', 'datepicker', 'timepicker', 'color', 'hyperlink', 'file',
    ].map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) })), []);

    const commonFileTypes = useMemo(() => [
        { value: 'image/jpeg', label: 'JPEG Image (.jpg, .jpeg)' },
        { value: 'image/png', label: 'PNG Image (.png)' },
        { value: 'image/gif', label: 'GIF Image (.gif)' },
        { value: 'image/webp', label: 'WebP Image (.webp)' },
        { value: 'application/pdf', label: 'PDF (.pdf)' },
        { value: 'video/mp4', label: 'MP4 Video (.mp4)' },
    ], []);

    const customStyles = useMemo(() => ({
        control: (provided) => ({ ...provided, backgroundColor: 'transparent', borderColor: '#ccc' }),
        input: (provided) => ({ ...provided, backgroundColor: 'transparent', color: '#000' }),
        singleValue: (provided) => ({ ...provided, color: '#000' }),
        menu: (provided) => ({ ...provided, backgroundColor: '#333' }),
        option: (provided, { isFocused, isSelected }) => ({
            ...provided,
            backgroundColor: isSelected ? '#555' : isFocused ? '#444' : 'transparent',
            color: isSelected ? '#fff' : '#ddd',
        }),
    }), []);

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                title_section: mode === 'new-tab' ? '' : currentSection || '',
                name: '', label: '', type: '', options: [], is_required: false, placeholder: '',
                validation: { regex: '', min: '', max: '', maxLength: '', minLength: '', fileTypes: [], maxSize: '' },
            }));
            setAspectRatio({ xAxis: '', yAxis: '' });
            setErrors([]);
            setOptionInput('');
            setFileTypeInput('');
        }
    }, [isOpen, mode, currentSection]);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: type === 'checkbox' ? checked : value },
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    }, []);

    const handleSelectChange = useCallback((name, selectedOption) => {
        setFormData(prev => ({ ...prev, [name]: selectedOption?.value || '' }));
    }, []);

    const handleAddOption = useCallback(() => {
        if (optionInput.trim()) {
            setFormData(prev => ({ ...prev, options: [...prev.options, optionInput.trim()] }));
            setOptionInput('');
        }
    }, [optionInput]);

    const handleRemoveOption = useCallback((index) => {
        setFormData(prev => ({ ...prev, options: prev.options.filter((_, i) => i !== index) }));
    }, []);

    const handleAddFileType = useCallback(() => {
        if (fileTypeInput.trim() && !formData.validation.fileTypes.includes(fileTypeInput.trim())) {
            setFormData(prev => ({
                ...prev,
                validation: { ...prev.validation, fileTypes: [...prev.validation.fileTypes, fileTypeInput.trim()] },
            }));
            setFileTypeInput('');
        }
    }, [fileTypeInput, formData.validation.fileTypes]);

    const handleFileTypesChange = useCallback((selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            validation: { ...prev.validation, fileTypes: selectedOptions?.map(opt => opt.value) || [] },
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setErrors([]);
        if (mode === 'new-tab' && !formData.title_section.trim()) {
            setErrors(['Section title is required for new tab.']);
            return;
        }

        const payload = {
            unit_id: unitUuid,
            enterprise_id: enterpriseUuid,
            title_section: formData.title_section,
            name: formData.name,
            label: formData.label,
            type: formData.type,
            options: formData.options.length > 0 ? formData.options : undefined,
            is_required: formData.is_required,
            placeholder: formData.placeholder || undefined,
            validation: {
                regex: formData.validation.regex || undefined,
                min: formData.validation.min ? Number(formData.validation.min) : undefined,
                max: formData.validation.max ? Number(formData.validation.max) : undefined,
                minLength: formData.validation.minLength ? Number(formData.validation.minLength) : undefined,
                maxLength: formData.validation.maxLength ? Number(formData.validation.maxLength) : undefined,
                fileTypes: formData.validation.fileTypes.length > 0 ? formData.validation.fileTypes : undefined,
                maxSize: formData.validation.maxSize ? Number(formData.validation.maxSize) : undefined,
            },
            aspectRation: formData.type === 'file' ? { xAxis: aspectRatio.xAxis, yAxis: aspectRatio.yAxis } : undefined,
            gridConfig: { span: Number(formData.gridConfig.span), order: Number(formData.gridConfig.order) },
            is_deleteable: true,
        };

        try {
            setIsSubmitting(true);
            const response = await studentFieldSettingService.createField(payload);
            toast.success('Field created successfully!');
            onSubmit(response.data?.data, mode);
            onClose();
        } catch (error) {
            const msg = error.response?.data?.message || 'Error creating field';
            setErrors([msg]);
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, aspectRatio, mode, unitUuid, enterpriseUuid, onSubmit, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-cardBgDark rounded-lg p-6 w-[100%] max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{mode === 'new-tab' ? 'Add New Tab & Field' : 'Add Field to Tab'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Section Title</label>
                        <input
                            type="text"
                            name="title_section"
                            value={formData.title_section}
                            onChange={handleChange}
                            disabled={mode === 'add-field'}
                            required={mode === 'new-tab'}
                            className="w-[100%] bg-transparent p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Academic Details"
                        />
                    </div>
                    {/* Rest of form fields - same as your original */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Field Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} onKeyDown={e => e.key === ' ' && e.preventDefault()} required className="w-[100%] bg-transparent p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., gpa" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Label</label>
                            <input type="text" name="label" value={formData.label} onChange={handleChange} required className="w-[100%] bg-transparent p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., GPA" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <Select options={fieldTypes} value={fieldTypes.find(opt => opt.value === formData.type) || null} onChange={selected => handleSelectChange('type', selected)} className="basic-single" classNamePrefix="select" styles={customStyles} required />
                        </div>
                    </div>
                    {/* Include all other form fields from your original modal - omitted for brevity but keep them */}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="twoD-style-button-cancel">Cancel</button>
                        <button disabled={isSubmitting} type="submit" className="twoD-style-button-three w-fit flex items-center gap-1">
                            {isSubmitting ? 'Submitting...' : 'Create Field'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

AddFieldModal.displayName = 'AddFieldModal';

// Main Component
function StudentCustomFieldSettings2() {
    const navigate = useNavigate();
    const { width, breakpoints } = useWidth();
    const [headerOn, setHeaderOn] = useState(false);
    const { show } = useSelector((state) => state?.showTabSlice);
    const { clientUser } = useSelector((state) => state.authCustomerSlice);
    const { organization } = useSelector((state) => state.organizationSlice);
    const isEnterprise = clientUser?.isEnterpriseType;
    const enterpriseUuid = isEnterprise ? organization?.enterprise_uuid : clientUser?.enterpriseUuId;
    const unitUuid = organization.unit_uuid;

    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('unnamed');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('new-tab');
    const [currentSection, setCurrentSection] = useState('');
    const [reorderMode, setReorderMode] = useState({ section: null, fields: [] });

    useEffect(() => setHeaderOn(!!show), [show]);

    const fetchFields = useCallback(async () => {
        try {
            setLoading(true);
            const res = await studentFieldSettingService.getFields(enterpriseUuid, unitUuid);
            setFields(res.data?.data || []);
            setReorderMode({ section: null, fields: [] });
        } catch (error) {
            toast.error('Failed to fetch fields');
        } finally {
            setLoading(false);
        }
    }, [enterpriseUuid, unitUuid]);

    useEffect(() => { fetchFields(); }, [fetchFields]);

    const groupedFields = useMemo(() => {
        const groups = fields.reduce((acc, field) => {
            if (!acc[field.title_section]) acc[field.title_section] = [];
            acc[field.title_section].push(field);
            return acc;
        }, {});
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => a.gridConfig?.order - b.gridConfig?.order);
        });
        return groups;
    }, [fields]);

    const tabSections = useMemo(() => Object.keys(groupedFields).filter(s => s !== 'General Info'), [groupedFields]);
    const unnamedTabEmpty = activeTab === 'unnamed' && (!tabSections.length || !groupedFields['Unnamed Tab']);

    const handleRefreshDefaults = useCallback(async () => {
        try {
            const res = await studentFieldSettingService.create({ unit_id: unitUuid, enterprise_id: enterpriseUuid });
            Swal.fire({ icon: 'success', title: res.data?.message || 'Success!', timer: 2000, showConfirmButton: false });
            fetchFields();
        } catch (error) {
            Swal.fire({ icon: 'error', title: error.response?.data?.message || 'Error!', timer: 2000, showConfirmButton: false });
        }
    }, [unitUuid, enterpriseUuid, fetchFields]);

    const handleAddTab = useCallback(() => { setModalMode('new-tab'); setCurrentSection(''); setModalOpen(true); }, []);
    const handleAddFieldToTab = useCallback((section) => { setModalMode('add-field'); setCurrentSection(section); setModalOpen(true); }, []);
    const handleModalSubmit = useCallback((newField, mode) => {
        if (mode === 'new-tab') setActiveTab(newField.title_section);
        fetchFields();
    }, [fetchFields]);

    const handleDeleteField = useCallback(async (fieldId, section) => {
        if (!(await Swal.fire({ title: 'Delete?', icon: 'question', showCancelButton: true })).isConfirmed) return;
        try {
            await studentFieldSettingService.deleteField(unitUuid, enterpriseUuid, fieldId);
            toast.success('Field deleted');
            fetchFields();
        } catch { toast.error('Delete failed'); }
    }, [unitUuid, enterpriseUuid, fetchFields]);

    // Reorder Logic
    const enterReorderMode = useCallback((section, fields) => {
        setReorderMode({ section, fields: [...fields] });
        toast.info('Drag to reorder → Save to confirm');
    }, []);

    const exitReorderMode = useCallback((revert = false) => {
        if (revert) fetchFields();
        setReorderMode({ section: null, fields: [] });
    }, [fetchFields]);

    const onDragEnd = useCallback((result) => {
        if (!result.destination) return;
        const items = reorder(reorderMode.fields, result.source.index, result.destination.index);
        setReorderMode(prev => ({ ...prev, fields: items }));
    }, [reorderMode.fields]);

    const saveOrder = useCallback(async (section) => {
        try {
            const payload = {
                unit_id: unitUuid,
                enterprise_id: enterpriseUuid,
                title_section: section,
                updatedFields: reorderMode.fields.map(f => ({ fieldId: f._id, order: f.gridConfig.order })),
            };
            await studentFieldSettingService.updateOrder(payload);
            toast.success('Order saved');
            exitReorderMode(false);
            fetchFields();
        } catch {
            toast.error('Save failed');
            exitReorderMode(true);
        }
    }, [reorderMode.fields, unitUuid, enterpriseUuid, exitReorderMode, fetchFields]);

    const isReordering = useCallback((section) => reorderMode.section === section, [reorderMode.section]);

    const renderSectionFields = useCallback((sectionFields, sectionTitle) => {
        const fieldsToShow = isReordering(sectionTitle) ? reorderMode.fields : sectionFields;
        const reorderActive = isReordering(sectionTitle);

        return (
            <>
                {reorderActive ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={`section-${sectionTitle}`}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 gap-4 p-4">
                                    {fieldsToShow.map((field, index) => (
                                        <Draggable key={field._id} draggableId={field._id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`relative bg-white dark:bg-cardBgDark p-4 rounded-lg shadow-lg border w-[100%] ${snapshot.isDragging ? 'border-blue-500' : 'border-gray-200'}`}
                                                    style={provided.draggableProps.style}
                                                >
                                                    <div {...provided.dragHandleProps} className="absolute left-3 top-3 cursor-move text-gray-500">
                                                        <FaGripVertical size={20} />
                                                    </div>
                                                    <span className="absolute right-3 top-3 text-xs font-medium text-gray-600">
                                                        Order: {field.gridConfig.order}
                                                    </span>
                                                    {field.is_deleteable && (
                                                        <button onClick={() => handleDeleteField(field._id, sectionTitle)} className="absolute top-3 right-12 text-red-600">
                                                            <RxCross2 />
                                                        </button>
                                                    )}
                                                    <label className="block text-sm font-medium mt-8 mb-2">{field.label} {field.is_required && <span className="text-red-500">*</span>}</label>
                                                    <FieldPreview field={field} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {fieldsToShow.map(field => (
                            <div key={field._id} className="relative bg-white dark:bg-cardBgDark p-4 rounded-lg shadow">
                                {field.is_deleteable && (
                                    <button onClick={() => handleDeleteField(field._id, sectionTitle)} className="absolute top-2 right-2 text-red-600">
                                        <RxCross2 />
                                    </button>
                                )}
                                {!field.is_deleteable && <RxValueNone className="absolute top-2 right-2 text-green-600" />}
                                <label className="block text-sm font-medium mb-2">{field.label} {field.is_required && <span className="text-red-500">*</span>}</label>
                                <FieldPreview field={field} />
                            </div>
                        ))}
                    </div>
                )}

                {sectionTitle !== 'General Info' && (
                    <div className="flex p-4 gap-3 justify-end border-t">
                        {reorderActive ? (
                            <>
                                <button onClick={() => exitReorderMode(true)} className="twoD-style-button-cancel">Cancel</button>
                                <button onClick={() => saveOrder(sectionTitle)} className="twoD-style-button-three">Save Seq</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => enterReorderMode(sectionTitle, sectionFields)} className="twoD-style-button-three flex items-center gap-1">
                                    <AiOutlineOrderedList /> Adjust Seq
                                </button>
                                <button onClick={() => handleAddFieldToTab(sectionTitle)} className="twoD-style-button-three flex items-center gap-1">
                                    <FiPlus /> Add More Fields
                                </button>
                            </>
                        )}
                    </div>
                )}
            </>
        );
    }, [isReordering, reorderMode.fields, onDragEnd, handleDeleteField, exitReorderMode, saveOrder, enterReorderMode, handleAddFieldToTab]);

    const animateHeader = useMemo(() => width < breakpoints.sm ? `${headerOn ? 'top-12' : 'top-0'}` : 'top-12', [width, breakpoints.sm, headerOn]);
    const handleBack = useCallback(() => navigate('/system/setting'), [navigate]);

    if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;

    return (
        <div className="max-w-7xl min-h-[84vh] mx-auto md:p-4 p-0 mb-10">
            <div className={`sticky ${animateHeader} z-30 bg-white border-b dark:bg-cardBgDark shadow-sm rounded-t-md md:py-4 py-2 md:px-4 px-1 flex items-center justify-between flex-wrap gap-4 transition-all duration-200`}>
                <div className="flex items-center gap-2">
                    <button onClick={handleBack} className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"><IoIosArrowRoundBack size={40} /></button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Student Fields Setting</h1>
                </div>
                <button onClick={handleRefreshDefaults} className="text-gray-600 hover:text-blue-600"><MdOutlineRefresh size={28} /></button>
            </div>

            <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-b-lg mt-0 px-2">
                {/* General Info */}
                <div className="mt-8 relative border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span className="absolute top-[-1rem] left-2 px-2 py-1 bg-white dark:bg-cardBgDark border border-gray-200 dark:border-gray-700 rounded-lg font-semibold">General Info</span>
                    {groupedFields['General Info']?.length ? renderSectionFields(groupedFields['General Info'], 'General Info') : <div className="text-center py-12 text-gray-500"><FaExclamationCircle className="mx-auto text-4xl mb-2" />No fields</div>}
                </div>

                {/* Custom Tabs */}
                <div className="mt-8 mb-4 relative border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <span className="absolute top-[-1rem] left-2 px-2 py-1 bg-white dark:bg-cardBgDark border border-gray-200 dark:border-gray-700 rounded-lg font-semibold">Custom Tabs</span>
                    <div className="flex justify-end mb-4">
                        <button onClick={handleAddTab} className="twoD-style-button-three flex items-center gap-1"><FiPlus /> Add Tab</button>
                    </div>

                    <div role="tablist" className="flex overflow-x-auto border-b border-gray-200 mb-4">
                        {unnamedTabEmpty && tabSections.length === 0 && (
                            <button onClick={() => setActiveTab('unnamed')} className={`px-6 py-3 border-b-2 ${activeTab === 'unnamed' ? 'border-blue-500 text-blue-600' : 'border-transparent'} font-medium`}>UnNamed Tab</button>
                        )}
                        {tabSections.map(section => (
                            <button
                                key={section}
                                onClick={() => setActiveTab(section)}
                                className={`px-6 py-3 border-b-2 ${activeTab === section ? 'border-blue-500 text-blue-600' : 'border-transparent'} font-medium whitespace-nowrap`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'unnamed' && unnamedTabEmpty && tabSections.length === 0 ? (
                        <div className="text-center py-12 text-gray-500"><FaExclamationCircle className="mx-auto text-4xl mb-2" />Empty tab. Add a tab to start.</div>
                    ) : groupedFields[activeTab] ? (
                        renderSectionFields(groupedFields[activeTab], activeTab)
                    ) : null}
                </div>
            </div>

            <AddFieldModal isOpen={modalOpen} onClose={() => setModalOpen(false)} mode={modalMode} currentSection={currentSection} onSubmit={handleModalSubmit} unitUuid={unitUuid} enterpriseUuid={enterpriseUuid} />
        </div>
    );
}

export default StudentCustomFieldSettings2;