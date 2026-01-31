


// new

import React, { useEffect, useState, useMemo, useCallback, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Add this import
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { FiCalendar, FiCheck, FiCheckSquare, FiChevronDown, FiClock, FiDroplet, FiFileText, FiHash, FiLink, FiList, FiMail, FiPlus, FiType, FiUpload, FiEdit3, FiLayers } from 'react-icons/fi'; // Add FiEdit3
import { RxCross2, RxValueNone } from 'react-icons/rx';
import { FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import studentFieldSettingService from '../../services/setting/studentFieldSetting.service';
import useWidth from '../../Hooks/useWidth';
import toast from 'react-hot-toast';
import { AiOutlineOrderedList } from "react-icons/ai";
import { Dialog, Transition, Menu } from '@headlessui/react';
import { TfiTrash } from "react-icons/tfi";
import LoadingSpinner2 from '../../components/Loading/LoadingSpinner2';
import { RiFunctionAddLine } from "react-icons/ri";
import { FiSave } from "react-icons/fi";

// Modal Component for Adding Tab/Field (keeping existing code unchanged)
const AddFieldModal = React.memo(({ isOpen, noFade, onClose, mode, currentSection, onSubmit, unitUuid, enterpriseUuid }) => {
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
        { value: "text", label: "Text", icon: <FiType /> },
        { value: "number", label: "Number", icon: <FiHash /> },
        { value: "email", label: "Email", icon: <FiMail /> },
        { value: "date", label: "Date", icon: <FiCalendar /> },
        { value: "select", label: "Select", icon: <FiList /> },
        { value: "multiselect", label: "Multi Select", icon: <FiLayers /> },
        { value: "checkbox", label: "Checkbox", icon: <FiCheckSquare /> },
        { value: "textarea", label: "Textarea", icon: <FiFileText /> },
        { value: "file", label: "File Upload", icon: <FiUpload /> },
        { value: "hyperlink", label: "Hyperlink", icon: <FiLink /> },
        { value: "color", label: "Color", icon: <FiDroplet /> },
        { value: "timepicker", label: "Time Picker", icon: <FiClock /> },
    ]);
    const commonFileTypes = useMemo(() => [
        { value: 'image/jpeg', label: 'JPEG Image (.jpg, .jpeg)' },
        { value: 'image/png', label: 'PNG Image (.png)' },
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
            cursor: 'pointer',
        }),
    }), []);

    useEffect(() => {
        if (isOpen) {
            setFormData({
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

    const handleRemoveFileType = useCallback((index) => {
        setFormData(prev => ({
            ...prev,
            validation: { ...prev.validation, fileTypes: prev.validation.fileTypes.filter((_, i) => i !== index) },
        }));
    }, []);

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
            console.log("Response ", response);
            toast.success('Field created successfully!');
            onSubmit(response.data?.data, mode);
            onClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error creating field';
            setErrors([errorMessage]);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, aspectRatio, optionInput, fileTypeInput, mode, unitUuid, enterpriseUuid, onSubmit, onClose]);

    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const handleSelectType = (type) => {
        setFormData(prev => ({ ...prev, type: type.value }));
        setShowTypeDropdown(false);
    };

    const selectedTypeLabel = fieldTypes.find(t => t.value === formData.type)?.label || 'Select Type';
    const selectedTypeIcon = fieldTypes.find(t => t.value === formData.type)?.icon || <FiType />;

    if (!isOpen) return null;

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[99999]" onClose={onClose}>
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
                            <Dialog.Panel className="w-[100%] max-w-2xl max-h-[90vh] bg-modelBodyBgLight dark:bg-modelBodyBgDark rounded-lg shadow-xl flex flex-col">
                                {/* Fixed Header */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-upperCardBgDark">
                                    {/* <h2 className="text-xl text-formHeadingLight dark:text-orangeBorder font-bold">{mode === 'new-tab' ? 'Add New Tab & Field' : 'Add Field to Tab'}</h2> */}
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-[#475467] rounded-lg">
                                            <RiFunctionAddLine className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 dark:text-white">
                                                {mode === 'new-tab' ? 'Add New Tab & Field' : 'Add Field to Tab'}
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Select "Field Type" and add custom field.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        aria-label="Close"
                                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                    >
                                        <RxCross2 className="w-6 h-6" />
                                    </button>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-8 max-h-[80vh] md:min-h-[60vh] min-h-[90vh] p-4 overflow-y-auto"
                                >
                                    {/* ------------------------ SECTION TITLE + FIELD TYPE ------------------------ */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                        {/* Section Title */}
                                        <div>
                                            <label className="block input-label text-sm font-semibold mb-1">Section Title</label>
                                            <input
                                                type="text"
                                                name="title_section"
                                                value={formData.title_section}
                                                onChange={handleChange}
                                                disabled={mode === "add-field"}
                                                required={mode === "new-tab"}
                                                className="input-base"
                                                placeholder="e.g., Academic Details"
                                            />
                                        </div>
                                        {/* Field Type Select with Icons */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Field Type</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                                                    className="w-[100%] input-base border border-gray-300 rounded-lg text-left flex items-center justify-between transition"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-gray-600 dark:text-gray-100">{selectedTypeIcon}</span>
                                                        <span className="font-medium text-gray-600 dark:text-gray-100">{selectedTypeLabel}</span>
                                                    </div>
                                                    <FiChevronDown className={`transition-transform text-gray-600 dark:text-gray-100 ${showTypeDropdown ? 'rotate-180' : ''}`} />
                                                </button>
                                                {showTypeDropdown && (
                                                    <div className="absolute z-[999] w-[100%] h-[30vh] overflow-y-auto mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                                                        {fieldTypes.map((type) => (
                                                            <div
                                                                key={type.value}
                                                                onClick={() => handleSelectType(type)}
                                                                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition"
                                                            >
                                                                <span className="text-gray-700">{type.icon}</span>
                                                                <span className="text-gray-800">{type.label}</span>
                                                                {formData.type === type.value && <FiCheck className="ml-auto text-blue-600" />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ---------------------------- FIELD BASIC DETAILS ---------------------------- */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Field Name */}
                                        <div>
                                            <label className="block input-label text-sm font-medium mb-1">Field Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                                                required
                                                className="input-base"
                                                placeholder="e.g., gpa"
                                            />
                                        </div>
                                        {/* Label */}
                                        <div>
                                            <label className="block input-label text-sm font-medium mb-1">Label</label>
                                            <input
                                                type="text"
                                                name="label"
                                                value={formData.label}
                                                onChange={handleChange}
                                                required
                                                className="input-base"
                                                placeholder="e.g., GPA"
                                            />
                                        </div>
                                        {/* Placeholder */}
                                        {["text", "number", "email", "textarea", "hyperlink"].includes(
                                            formData.type
                                        ) && (
                                                <div>
                                                    <label className="block input-label text-sm font-medium mb-1">Placeholder</label>
                                                    <input
                                                        type="text"
                                                        name="placeholder"
                                                        value={formData.placeholder}
                                                        onChange={handleChange}
                                                        className="input-base"
                                                        placeholder="e.g., Enter GPA"
                                                    />
                                                </div>
                                            )}
                                    </div>
                                    {/* ---------------------------- SELECT / MULTISELECT ---------------------------- */}
                                    {(formData.type === "select" || formData.type === "multiselect") && (
                                        <div className="space-y-3">
                                            <label className="block input-label text-sm font-semibold">Options</label>
                                            {/* Input row */}
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={optionInput}
                                                    onChange={(e) => setOptionInput(e.target.value)}
                                                    className="flex-1 input-base"
                                                    placeholder="Add an option"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddOption}
                                                    className="px-4 py-2 text-black bg-blue-50 rounded-full hover:bg-blue-300 hover:text-white shadow-sm transition-all duration-300 ease-in-out"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {/* Option pills */}
                                            <div className="flex flex-wrap gap-2">
                                                {formData.options.map((option, index) => (
                                                    <span
                                                        key={index}
                                                        className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full
                       shadow-sm text-sm"
                                                    >
                                                        {option}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveOption(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            ✕
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {/* ---------------------------- FILE TYPE SECTION ---------------------------- */}
                                    {formData.type === "file" && (
                                        <div className="space-y-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-700">
                                            {/* File Types */}
                                            <div>
                                                <label className="block input-label text-sm font-medium mb-1">
                                                    File Types
                                                </label>
                                                <Select
                                                    isMulti
                                                    options={commonFileTypes}
                                                    value={commonFileTypes.filter((opt) =>
                                                        formData.validation.fileTypes.includes(opt.value)
                                                    )}
                                                    onChange={handleFileTypesChange}
                                                    classNamePrefix="select"
                                                    placeholder="Select file types..."
                                                />
                                            </div>
                                            {/* Add More File Types */}
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={fileTypeInput}
                                                    onChange={(e) => setFileTypeInput(e.target.value)}
                                                    className="flex-1 input-base"
                                                    placeholder="e.g., image/x-icon"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddFileType}
                                                    className="px-4 py-2 text-black bg-blue-50 rounded-full hover:bg-blue-300 hover:text-white shadow-sm transition-all duration-300 ease-in-out"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {/* File Type Pills */}
                                            <div className="flex flex-wrap gap-2">
                                                {formData.validation.fileTypes.map((fileType, index) => (
                                                    <span
                                                        key={index}
                                                        className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full shadow-sm text-sm"
                                                    >
                                                        {fileType}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFileType(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            ✕
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                            {/* Max File Size */}
                                            <div>
                                                <label className="block input-label text-sm font-medium mb-1">Max File Size</label>
                                                <input
                                                    type="number"
                                                    name="validation.maxSize"
                                                    value={formData.validation.maxSize}
                                                    onChange={handleChange}
                                                    className="w-[100%] input-base"
                                                    placeholder="e.g., 5242880 (5MB)"
                                                />
                                            </div>
                                            {/* Aspect Ratio */}
                                            <div>
                                                <label className="block input-label text-sm font-medium flex items-center gap-2">
                                                    Aspect Ratio (Optional)
                                                </label>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <input
                                                        type="text"
                                                        value={aspectRatio.xAxis}
                                                        onChange={(e) =>
                                                            /^\d*$/.test(e.target.value) &&
                                                            setAspectRatio((prev) => ({ ...prev, xAxis: e.target.value }))
                                                        }
                                                        className="w-24 input-base"
                                                        placeholder="4"
                                                    />
                                                    <span className="font-semibold">/</span>
                                                    <input
                                                        type="text"
                                                        value={aspectRatio.yAxis}
                                                        onChange={(e) =>
                                                            /^\d*$/.test(e.target.value) &&
                                                            setAspectRatio((prev) => ({ ...prev, yAxis: e.target.value }))
                                                        }
                                                        className="w-24 input-base"
                                                        placeholder="3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* ---------------------------- VALIDATION SECTION ---------------------------- */}
                                    {!["file", "date", "select", "multiselect", "datepicker", "timepicker", "color", "checkbox"].includes(formData.type) && (
                                        <div className="space-y-4 relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border dark:border-gray-700">
                                            <span className="text-base absolute top-[-1rem] z-[99] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                                                Validation
                                            </span>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Regex */}
                                                <div>
                                                    <label className="block input-label text-sm font-medium mb-1">Regex</label>
                                                    <input
                                                        type="text"
                                                        name="validation.regex"
                                                        value={formData.validation.regex}
                                                        onChange={handleChange}
                                                        className="w-[100%] input-base"
                                                        placeholder="e.g., ^[0-9]{10}$"
                                                    />
                                                </div>
                                                {/* Length Validation */}
                                                {["text", "textarea", "hyperlink"].includes(formData.type) && (
                                                    <>
                                                        <div>
                                                            <label className="block input-label text-sm font-medium mb-1">Min Length</label>
                                                            <input
                                                                type="number"
                                                                name="validation.minLength"
                                                                value={formData.validation.minLength}
                                                                onChange={handleChange}
                                                                className="w-[100%] input-base"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block input-label text-sm font-medium mb-1">Max Length</label>
                                                            <input
                                                                type="number"
                                                                name="validation.maxLength"
                                                                value={formData.validation.maxLength}
                                                                onChange={handleChange}
                                                                className="w-[100%] input-base"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                {/* Number Validation */}
                                                {formData.type === "number" && (
                                                    <>
                                                        <div>
                                                            <label className="block input-label text-sm font-medium mb-1">Min</label>
                                                            <input
                                                                type="number"
                                                                name="validation.min"
                                                                value={formData.validation.min}
                                                                onChange={handleChange}
                                                                className="w-[100%] input-base"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block input-label text-sm font-medium mb-1">Max</label>
                                                            <input
                                                                type="number"
                                                                name="validation.max"
                                                                value={formData.validation.max}
                                                                onChange={handleChange}
                                                                className="w-[100%] input-base"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {/* ---------------------------- REQUIRED FIELD (TOGGLE) ---------------------------- */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm input-label font-medium">Required</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="is_required"
                                                checked={formData.is_required}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div
                                                className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300
                    rounded-full peer peer-checked:bg-blue-600 transition-all"
                                            ></div>
                                            <div
                                                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all
                    peer-checked:translate-x-6"
                                            ></div>
                                        </label>
                                    </div>
                                    {/* Error Messages */}
                                    {errors.length > 0 && (
                                        <div className="p-4 bg-red-100 rounded-md">
                                            {errors.map((error, index) => (
                                                <p key={index} className="text-red-700 text-sm">
                                                    {error}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </form>
                                {/* Fixed Footer */}
                                <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-modelFooterBgLight dark:bg-modelFooterBgDark">
                                    <button type="button" onClick={onClose}
                                        className="twoD-style-button-cancel flex gap-2 items-center "
                                    >
                                         <span>Cancel</span> 
                                   <RxCross2/>
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="twoD-style-button-three w-fit flex items-center gap-1"
                                    >

                                        <span>
                                            Create Field
                                        </span>
                                        {
                                            isSubmitting ?
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                :
                                                <FiSave className="w-4 h-4" />

                                        }

                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
});

AddFieldModal.displayName = 'AddFieldModal';

// New Draggable Field Component
const DraggableFieldItem = ({ field, index, isDragging }) => {
    return (
        <Draggable key={field._id} draggableId={field._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                        flex items-center justify-between p-4 mb-2 bg-white dark:bg-cardBgDark 
                        border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm
                        transition-all duration-200 ease-in-out
                        ${isDragging ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-lg scale-105' : 'hover:shadow-md'}
                    `}
                >
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-[#475467] rounded-full cursor-move">
                            <FiEdit3 className="text-blue-600 dark:text-blue-400 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {field.label} {field.is_required && <span className="text-red-500">*</span>}
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{field.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            #{index + 1}
                        </span>
                        {field.is_deleteable && (
                            <Tippy content="Delete" placement="top">
                                <button
                                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                    aria-label="Delete field"
                                >
                                    <TfiTrash className="text-sm" />
                                </button>
                            </Tippy>
                        )}
                        {!field.is_deleteable && (
                            <RxValueNone className="text-green-600 text-sm" />
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

// New Field Sequence Modal Component
const FieldSequenceModal = React.memo(({
    isOpen,
    onClose,
    sectionTitle,
    originalFields,
    onSave,
    unitUuid,
    enterpriseUuid
}) => {
    const [fields, setFields] = useState(originalFields);
    const [isSubmitting, setIsSubmitting] = useState(false);


    console.log("fields seq", fields);


    useEffect(() => {
        if (isOpen) {
            setFields([...originalFields]);
        }
    }, [isOpen, originalFields]);

    const onDragEnd = useCallback((result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.index === destination.index) return;

        const newFields = Array.from(fields);
        const [reorderedItem] = newFields.splice(source.index, 1);
        newFields.splice(destination.index, 0, reorderedItem);

        // Update the order property for each field
        const updatedFields = newFields.map((field, index) => ({
            ...field,
            gridConfig: {
                ...field.gridConfig,
                order: index
            }
        }));

        setFields(updatedFields);
    }, [fields]);

    const handleSave = useCallback(async () => {
        try {
            setIsSubmitting(true);
            const payload = fields.map(field => ({
                fieldId: field._id,
                gridConfig: {
                    span: field.gridConfig?.span || 12,
                    order: field.gridConfig?.order || 0
                }
            }));

            const dataObject = {
                unit_id: unitUuid,
                enterprise_id: enterpriseUuid,
                title_section: sectionTitle,
                updatedFields: payload
            }

            // Call API to update field orders
            await studentFieldSettingService.updateFieldOrder(dataObject);

            toast.success('Field order updated successfully!');
            onSave(fields, sectionTitle);
            onClose();
            setIsSubmitting(false);

        } catch (error) {
            setIsSubmitting(false);

            console.error('Error updating field order:', error);
            toast.error(error.response?.data?.message || 'Failed to update field order');
        }
    }, [fields, unitUuid, enterpriseUuid, sectionTitle, onSave, onClose]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100000]" onClose={handleCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-[100%] max-w-2xl max-h-[90vh] bg-modelBodyBgLight dark:bg-modelBodyBgDark rounded-lg shadow-xl flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-[#475467] rounded-lg">
                                        <AiOutlineOrderedList className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 dark:text-white">
                                            Adjust Field Sequence
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Drag and drop to reorder fields in "{sectionTitle}"
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                >
                                    <RxCross2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                {fields.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaExclamationCircle className="mx-auto mb-4 text-4xl text-gray-400" />
                                        <p className="text-gray-500 dark:text-gray-400">No fields available to reorder</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId="field-sequence" direction="vertical">
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className={`
                                                            min-h-[200px] space-y-2
                                                            ${snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                                                        `}
                                                    >
                                                        {fields.map((field, index) => (
                                                            <DraggableFieldItem
                                                                key={field._id}
                                                                field={field}
                                                                index={index}
                                                                isDragging={false}
                                                            />
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-modelFooterBgLight dark:bg-modelFooterBgDark">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                    className="twoD-style-button-cancel flex gap-2 items-center"
                                >
                                   <span>Cancel</span> 
                                   <RxCross2/>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isSubmitting || fields.length === 0}
                                    className="twoD-style-button-three  disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                >
                                    <span>
                                        Save Order
                                    </span>
                                    {
                                        isSubmitting ?
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            :
                                            <FiSave className="w-4 h-4" />

                                    }


                                    {/* {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FiSave className="w-4 h-4" />
                                            Save Order
                                        </>
                                    )} */}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
});

FieldSequenceModal.displayName = 'FieldSequenceModal';

// Main Component (Updated)
function StudentCustomFieldSettings({ noFade = false }) {
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
    // New state for sequence modal
    const [sequenceModalOpen, setSequenceModalOpen] = useState(false);
    const [sequenceSectionTitle, setSequenceSectionTitle] = useState('');
    const [sequenceOriginalFields, setSequenceOriginalFields] = useState([]);

    useEffect(() => {
        setHeaderOn(!!show);
    }, [show]);

    const fetchFields = useCallback(async () => {
        try {
            setLoading(true);
            const res = await studentFieldSettingService.getFields(enterpriseUuid, unitUuid);
            setFields(res.data?.data || []);
        } catch (error) {
            console.error('Error fetching fields:', error);
            toast.error('Failed to fetch fields');
        } finally {
            setLoading(false);
        }
    }, [enterpriseUuid, unitUuid]);

    useEffect(() => {
        fetchFields();
    }, [fetchFields]);

    const groupedFields = useMemo(() => {
        const groups = fields.reduce((acc, field) => {
            if (!acc[field.title_section]) acc[field.title_section] = [];
            acc[field.title_section].push(field);
            return acc;
        }, {});
        // Sort fields within sections by order
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => a.gridConfig?.order - b.gridConfig?.order);
        });
        return groups;
    }, [fields]);

    const tabSections = useMemo(() => Object.keys(groupedFields).filter(section => section !== 'General Info'), [groupedFields]);
    const unnamedTabEmpty = activeTab === 'unnamed' && (!tabSections.length || !groupedFields['Unnamed Tab']);

    const handleRefreshDefaults = useCallback(async () => {
        try {
            const dataObject = { unit_id: unitUuid, enterprise_id: enterpriseUuid };
            const res = await studentFieldSettingService.create(dataObject);
            Swal.fire({ icon: 'success', title: res.data?.message || 'Success!', timer: 2000, showConfirmButton: false });
            fetchFields();
        } catch (error) {
            Swal.fire({ icon: 'error', title: error.response?.data?.message || 'Error refreshing defaults!', timer: 2000, showConfirmButton: false });
        }
    }, [unitUuid, enterpriseUuid, fetchFields]);

    const handleAddTab = useCallback(() => {
        setModalMode('new-tab');
        setCurrentSection('');
        setModalOpen(true);
    }, []);

    const handleAddFieldToTab = useCallback((section) => {
        setModalMode('add-field');
        setCurrentSection(section);
        setModalOpen(true);
    }, []);

    // New handlers for sequence modal
    const handleAdjustSequence = useCallback((sectionTitle, sectionFields) => {
        setSequenceSectionTitle(sectionTitle);
        setSequenceOriginalFields([...sectionFields]);
        setSequenceModalOpen(true);
    }, []);

    const handleSequenceModalSave = useCallback((updatedFields, sectionTitle) => {
        // Update the fields in the main state
        setFields(prevFields =>
            prevFields.map(field =>
                updatedFields.find(f => f._id === field._id) || field
            )
        );
        setSequenceModalOpen(false);
    }, []);

    const handleSequenceModalClose = useCallback(() => {
        setSequenceModalOpen(false);
    }, []);

    const handleModalSubmit = useCallback((newField, mode) => {
        if (mode === 'new-tab') {
            setActiveTab(newField.title_section);
            toast.success(`New tab "${newField.title_section}" created with field.`);
        }
        fetchFields();
    }, [fetchFields]);

    const handleDeleteField = useCallback(async (fieldId, section) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
        });
        if (result.isConfirmed) {
            try {
                await studentFieldSettingService.deleteField(unitUuid, enterpriseUuid, fieldId);
                toast.success('Field deleted successfully');
                fetchFields();
            } catch (error) {
                toast.error('Error deleting field');
            }
        }
    }, [unitUuid, enterpriseUuid, fetchFields]);

    const renderSectionFields = useCallback((sectionFields, sectionTitle) => (
        <>
            <div className="mb-4 relative border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-4">
                    {sectionFields.map((field) => (
                        <div key={field._id} className="relative flex justify-between items-center bg-white dark:bg-upperCardBgDark border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <label className="block text-sm font-medium mb-2">
                                {field.label} {field.is_required && <span className="text-red-500">*</span>}
                            </label>
                            {field.is_deleteable && (
                                <Tippy content="Delete" placement="top">
                                    <button
                                        onClick={() => handleDeleteField(field._id, sectionTitle)}
                                        className="bg-gray-100 hover:bg-gray-300 border p-1 rounded-full group transition-all duration-300 ease-in-out"
                                    >
                                        <TfiTrash className="text-red-500 hover:text-red-700" />
                                    </button>
                                </Tippy>
                            )}
                            {!field.is_deleteable && <RxValueNone className="text-green-600" />}
                        </div>
                    ))}
                </div>
                <div className='flex p-4 gap-2 justify-end'>
                    <button
                        onClick={() => handleAdjustSequence(sectionTitle, sectionFields)}
                        className="flex items-center gap-2 text-blueBorder dark:text-orangeBorder ring-blueBorder dark:ring-orangeBorder ring-1 hover:ring-2 from-blue-400 dark:hover:from-[#DAA366] font-medium rounded-lg text-sm px-3 py-2 text-center"
                    >
                        <span>Adjust Seq</span>  <AiOutlineOrderedList  className="text-[1.3rem]" />
                    </button>
                    <button
                        onClick={() => handleAddFieldToTab(sectionTitle)}
                        className="twoD-style-button-three w-fit flex items-center gap-2"
                    >
                        <span> Add</span>    <FiPlus className="inline " />
                    </button>
                </div>
            </div>
        </>
    ), [handleAddFieldToTab, handleDeleteField, handleAdjustSequence]);

    const renderFieldPreview = useCallback((field) => {
        return <div>Preview for {field.type}</div>;
    }, []);

    const animateHeader = useMemo(() =>
        width < breakpoints.sm ? `${headerOn ? 'top-12' : 'top-0'}` : 'top-12',
        [width, breakpoints.sm, headerOn]
    );

    const handleBack = useCallback(() => navigate('/system/setting'), [navigate]);

    return (
        <div className="max-w-7xl min-h-[84vh] mx-auto md:p-4 p-0 mb-10">
            {/* Sticky Header */}
            <div className={`sticky ${animateHeader} z-[100] bg-white border-b dark:bg-cardBgDark shadow-sm rounded-t-md md:py-4 py-2 md:px-4 px-1 flex items-center justify-between flex-wrap gap-4 transition-all duration-200`}>
                <div className="flex items-center gap-2">
                    <button onClick={handleBack} className=" transition-colors">
                        <IoIosArrowRoundBack className='text-black dark:text-gray-200 ' size={40} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Student Fields Setting</h1>
                </div>
                <button onClick={handleRefreshDefaults} className="text-gray-600 hover:text-blue-600">
                    <MdOutlineRefresh />
                </button>
            </div>

            {
                loading ?
                    <div className="flex justify-center  items-center min-h-[84vh]">
                        {/* <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" /> */}
                        <LoadingSpinner2 />
                    </div>
                    :
                    <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-b-lg overflow-hidden mt-0 px-2">
                        {/* General Info Section */}
                        <div className="mt-8 relative rounded-lg">
                            <span className="text-base absolute top-[-1rem] z-[99] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                                General Info
                            </span>
                            {groupedFields['General Info'] && groupedFields['General Info'].length > 0 ? (
                                renderSectionFields(groupedFields['General Info'], 'General Info')
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <FaExclamationCircle className="mx-auto mb-2 text-3xl" />
                                    No fields in General Info
                                </div>
                            )}
                        </div>

                        {/* Tabs Section */}
                        <div className="mt-8 mb-4 relative border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                                Custom Tabs
                            </span>
                            <div className="flex items-center justify-end mb-4">
                                <button
                                    onClick={handleAddTab}
                                    className="twoD-style-button-three w-fit flex items-center gap-2"
                                >
                                    <span>Add Tab</span>  <FiPlus />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {unnamedTabEmpty && tabSections?.length == 0 && (
                                    <button
                                        key="unnamed"
                                        onClick={() => setActiveTab('unnamed')}
                                        className={`
                                       relative
                                       -mb-px
                                       px-4
                                       py-3
                                       text-center
                                       text-sm
                                       font-medium
                                       whitespace-nowrap
                                       border-b-2
                                       transition-all
                                       duration-300
                                       ease-in-out
              
                md:px-6
              `}
                                    >
                                        UnNamed Tab
                                    </button>
                                )}
                                <div
                                    role="tablist"
                                    aria-label="Main tabs"
                                    className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 dark:border-gray-700 scrollbar-hide"
                                >
                                    <div className="flex space-x-1 min-w-max">
                                        {tabSections.map((section) => (
                                            <button
                                                key={section}
                                                type="button"
                                                role="tab"
                                                aria-selected={activeTab === section}
                                                aria-controls={`tabpanel-${section}`}
                                                id={`tab-${section}`}
                                                onClick={() => setActiveTab(section)}
                                                className={`
                relative
                -mb-px
                px-4
                py-3
                text-center
                text-sm
                font-medium
                whitespace-nowrap
                border-b-2
                transition-all
                duration-300
                ease-in-out
                ${activeTab === section
                                                        ? 'border-blue-600 dark:border-orange-700 text-blue-600 dark:text-orange-700'
                                                        : 'border-transparent text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300'
                                                    }
                md:px-6
              `}
                                            >
                                                {section}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {activeTab === 'unnamed' && unnamedTabEmpty && tabSections?.length == 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <FaExclamationCircle className="mx-auto mb-2 text-3xl" />
                                        Empty tab. Add a tab to get started.
                                    </div>
                                ) : groupedFields[activeTab] ? (
                                    renderSectionFields(groupedFields[activeTab], activeTab)
                                ) : null}
                            </div>
                        </div>
                    </div>

            }



            {/* Add Field Modal */}
            <AddFieldModal
                noFade={noFade}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                mode={modalMode}
                currentSection={currentSection}
                onSubmit={handleModalSubmit}
                unitUuid={unitUuid}
                enterpriseUuid={enterpriseUuid}
            />

            {/* New Field Sequence Modal */}
            <FieldSequenceModal
                isOpen={sequenceModalOpen}
                onClose={handleSequenceModalClose}
                sectionTitle={sequenceSectionTitle}
                originalFields={sequenceOriginalFields}
                onSave={handleSequenceModalSave}
                unitUuid={unitUuid}
                enterpriseUuid={enterpriseUuid}
            />
        </div>
    );
}

export default StudentCustomFieldSettings;

