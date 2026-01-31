// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import customFieldService from '../../../services/customFieldService';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// // import "../../../App.css"

// const CreateCustomField = ({ onFieldCreated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     label: '',
//     type: '',
//     options: [],
//     isRequired: false,
//     placeholder: '',
//     validation: { regex: '', min: '', max: '', maxLength: '', fileTypes: [], maxSize: '' },
//     gridConfig: { span: 12, order: 0 }
//   });
//   const [errors, setErrors] = useState([]);
//   const [optionInput, setOptionInput] = useState('');
//   const [fileTypeInput, setFileTypeInput] = useState('');
//   const [createdFields, setCreatedFields] = useState([]); // Store fields created in this session
//   const [existingFields, setExistingFields] = useState([]); // Store fields fetched from API

//   const fieldTypes = [
//     'text', 'number', 'email', 'date', 'select', 'checkbox',
//     'textarea', 'multiselect', 'datepicker', 'timepicker', 'color', 'hyperlink', 'file'
//   ].map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }));

//   const commonFileTypes = [
//     { value: 'image/jpeg', label: 'JPEG Image (.jpg, .jpeg)' },
//     { value: 'image/png', label: 'PNG Image (.png)' },
//     { value: 'image/gif', label: 'GIF Image (.gif)' },
//     { value: 'image/webp', label: 'WebP Image (.webp)' },
//     { value: 'image/bmp', label: 'BMP Image (.bmp)' },
//     { value: 'image/tiff', label: 'TIFF Image (.tiff, .tif)' },
//     { value: 'image/svg+xml', label: 'SVG Image (.svg)' },
//     { value: 'image/heic', label: 'HEIC Image (.heic)' },
//     { value: 'image/avif', label: 'AVIF Image (.avif)' },
//     { value: 'application/pdf', label: 'PDF (.pdf)' },
//     { value: 'text/csv', label: 'CSV (.csv)' },
//     { value: 'application/vnd.ms-excel', label: 'Excel (.xls)' },
//     { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel (.xlsx)' },
//     { value: 'application/msword', label: 'Word (.doc)' },
//     { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word (.docx)' },
//     { value: 'text/plain', label: 'Plain Text (.txt)' },
//     { value: 'application/json', label: 'JSON (.json)' },
//     { value: 'application/zip', label: 'ZIP Archive (.zip)' },
//     { value: 'audio/mpeg', label: 'MP3 Audio (.mp3)' },
//     { value: 'video/mp4', label: 'MP4 Video (.mp4)' }
//   ];

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: "transparent",
//       borderColor: "#ccc",
//     }),
//     input: (provided) => ({
//       ...provided,
//       backgroundColor: "transparent",
//       color: "#000",
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: "#000",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: "#333", // Dropdown background color
//     }),
//     option: (provided, { isFocused, isSelected }) => ({
//       ...provided,
//       backgroundColor: isSelected ? "#555" : isFocused ? "#444" : "transparent", // Option background color
//       color: isSelected ? "#fff" : "#ddd", // Text color for options
//       cursor: "pointer",
//     })
//   };


//   // Fetch existing fields on component mount
//   useEffect(() => {
//     const fetchFields = async () => {
//       try {
//         const response = await customFieldService.getCustomFields();
//         setExistingFields(response.data?.data); // Assuming response is { data: [...] }
//       } catch (error) {
//         setErrors(['Failed to fetch existing fields']);
//       }
//     };
//     fetchFields();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: type === 'checkbox' ? checked : value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleSelectChange = (name, selectedOption) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: selectedOption ? selectedOption.value : ''
//     }));
//   };

//   const handleAddOption = () => {
//     if (optionInput.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         options: [...prev.options, optionInput.trim()]
//       }));
//       setOptionInput('');
//     }
//   };

//   const handleRemoveOption = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       options: prev.options.filter((_, i) => i !== index)
//     }));
//   };

//   const handleAddFileType = () => {
//     if (fileTypeInput.trim() && !formData.validation.fileTypes.includes(fileTypeInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         validation: {
//           ...prev.validation,
//           fileTypes: [...prev.validation.fileTypes, fileTypeInput.trim()]
//         }
//       }));
//       setFileTypeInput('');
//     }
//   };

//   const handleRemoveFileType = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       validation: {
//         ...prev.validation,
//         fileTypes: prev.validation.fileTypes.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const handleFileTypesChange = (selectedOptions) => {
//     setFormData(prev => ({
//       ...prev,
//       validation: {
//         ...prev.validation,
//         fileTypes: selectedOptions ? selectedOptions.map(opt => opt.value) : []
//       }
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]); // Clear previous errors

//     const payload = {
//       name: formData.name,
//       label: formData.label,
//       type: formData.type,
//       options: formData.options.length > 0 ? formData.options : undefined,
//       isRequired: formData.isRequired,
//       placeholder: formData.placeholder || undefined,
//       validation: {
//         regex: formData.validation.regex || undefined,
//         min: formData.validation.min ? Number(formData.validation.min) : undefined,
//         max: formData.validation.max ? Number(formData.validation.max) : undefined,
//         maxLength: formData.validation.maxLength ? Number(formData.validation.maxLength) : undefined,
//         fileTypes: formData.validation.fileTypes.length > 0 ? formData.validation.fileTypes : undefined,
//         maxSize: formData.validation.maxSize ? Number(formData.validation.maxSize) : undefined
//       },
//       gridConfig: {
//         span: Number(formData.gridConfig.span),
//         order: Number(formData.gridConfig.order)
//       }
//     };

//     try {
//       const response = await customFieldService.createCustomField(payload);
//       console.log("Response:", response);

//       const newField = response.data?.data;
//       if (!newField) {
//         throw new Error("No field data returned from the server");
//       }

//       // Add the new field to the createdFields array
//       setCreatedFields(prev => [...prev, newField]);

//       // Show success toast
//       toast.success('Field created successfully!');

//       // Reset form
//       setFormData({
//         name: '',
//         label: '',
//         type: '',
//         options: [],
//         isRequired: false,
//         placeholder: '',
//         validation: { regex: '', min: '', max: '', maxLength: '', fileTypes: [], maxSize: '' },
//         gridConfig: { span: 12, order: 0 }
//       });

//     } catch (error) {
//       console.log("Error form:", error);
//       // Show error toast with backend message
//       const errorMessage = error || 'An error occurred while creating the field';
//       // toast.error(errorMessage);
//       setErrors([errorMessage]); // Optional: keep in state if you still want to display in UI
//     }
//   };


//   return (
//     <>
//       <div className="max-w-[100%]  mt-8 mb-10 md:mx-6 mx-0 ">
//         <nav aria-label="breadcrumb" className="mb-4 md:mx-0 mx-4">
//           <ol className="flex items-center  space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
//             <li>
//               <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
//             </li>
//             <li>
//               <span className="mx-2">/</span>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Custom Fields</Link>
//             </li>
//             <li>
//               <span className="mx-2">/</span>
//             </li>
//             <li aria-current="page" className="text-gray-700 dark:text-gray-300">
//               Create
//             </li>
//           </ol>
//         </nav>
//         <div className="bg-cardBgLight dark:bg-cardBgDark rounded-3xl shadow-custom-ligh p-6 ">
//           <h2 className="text-2xl font-bold mb-6 text-formHeadingLight dark:text-formHeadingDark custom-underline">
//             Create Custom Field
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div id="input" className="relative">
//                 <input
//                   type="text"
//                   id="floating_outlined"
//                   className="input-base peer"
//                   placeholder="Job title"
//                   value=""
//                 />
//                 <label
//                   htmlFor="floating_outlined"
//                   className="input-label"
//                 >
//                   Job title
//                 </label>
//               </div>
//             </div>

//             <div className='flex flex-row justify-end'>
//               {/* <button
//                 type="submit"
//                 className="btn-primary "
//               >
//                 <p className='btn-gradient-text'>Submit</p>
//               </button> */}

//               <button
//                 type="submit"
//                 className="twoD-style-button-two "
//               >
//                 <p className=''>Submit</p>
//               </button>
//               {/* <button class="premiumbutton">
//                 <div class="wrap">
//                   <p>
//                     <span>✧</span>
//                     <span>✦</span>
//                      SUBMIT
//                   </p>
//                 </div>
//               </button>  */}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>

//   );
// };

// export default CreateCustomField;


import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import customFieldService from '../../../services/customFieldService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CreateCustomField = ({ onFieldCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    type: '',
    options: [],
    isRequired: false,
    placeholder: '',
    validation: { regex: '', min: '', max: '', maxLength: '', fileTypes: [], maxSize: '' },
    gridConfig: { span: 12, order: 0 }
  });
  const [errors, setErrors] = useState([]);
  const [optionInput, setOptionInput] = useState('');
  const [fileTypeInput, setFileTypeInput] = useState('');
  const [createdFields, setCreatedFields] = useState([]);
  const [existingFields, setExistingFields] = useState([]);

  const fieldTypes = [
    'text', 'number', 'email', 'date', 'select', 'checkbox',
    'textarea', 'multiselect', 'datepicker', 'timepicker', 'color', 'hyperlink', 'file'
  ].map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }));

  const commonFileTypes = [
    { value: 'image/jpeg', label: 'JPEG Image (.jpg, .jpeg)' },
    { value: 'image/png', label: 'PNG Image (.png)' },
    { value: 'image/gif', label: 'GIF Image (.gif)' },
    { value: 'image/webp', label: 'WebP Image (.webp)' },
    { value: 'image/bmp', label: 'BMP Image (.bmp)' },
    { value: 'image/tiff', label: 'TIFF Image (.tiff, .tif)' },
    { value: 'image/svg+xml', label: 'SVG Image (.svg)' },
    { value: 'image/heic', label: 'HEIC Image (.heic)' },
    { value: 'image/avif', label: 'AVIF Image (.avif)' },
    { value: 'application/pdf', label: 'PDF (.pdf)' },
    { value: 'text/csv', label: 'CSV (.csv)' },
    { value: 'application/vnd.ms-excel', label: 'Excel (.xls)' },
    { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel (.xlsx)' },
    { value: 'application/msword', label: 'Word (.doc)' },
    { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word (.docx)' },
    { value: 'text/plain', label: 'Plain Text (.txt)' },
    { value: 'application/json', label: 'JSON (.json)' },
    { value: 'application/zip', label: 'ZIP Archive (.zip)' },
    { value: 'audio/mpeg', label: 'MP3 Audio (.mp3)' },
    { value: 'video/mp4', label: 'MP4 Video (.mp4)' }
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      borderColor: "#ccc",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      "&:hover": { borderColor: "#3b82f6" },
      "&:focus": { borderColor: "#3b82f6", boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)" }
    }),
    input: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#1f2937",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1f2937",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "0.375rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? "#3b82f6" : isFocused ? "#e5e7eb" : "#fff",
      color: isSelected ? "#fff" : "#1f2937",
      cursor: "pointer",
    })
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await customFieldService.getCustomFields();
        setExistingFields(response.data?.data);
      } catch (error) {
        setErrors(['Failed to fetch existing fields']);
      }
    };
    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleAddOption = () => {
    if (optionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, optionInput.trim()]
      }));
      setOptionInput('');
    }
  };

  const handleRemoveOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleAddFileType = () => {
    if (fileTypeInput.trim() && !formData.validation.fileTypes.includes(fileTypeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        validation: {
          ...prev.validation,
          fileTypes: [...prev.validation.fileTypes, fileTypeInput.trim()]
        }
      }));
      setFileTypeInput('');
    }
  };

  const handleRemoveFileType = (index) => {
    setFormData(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        fileTypes: prev.validation.fileTypes.filter((_, i) => i !== index)
      }
    }));
  };

  const handleFileTypesChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      validation: {
        ...prev.validation,
        fileTypes: selectedOptions ? selectedOptions.map(opt => opt.value) : []
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      name: formData.name,
      label: formData.label,
      type: formData.type,
      options: formData.options.length > 0 ? formData.options : undefined,
      isRequired: formData.isRequired,
      placeholder: formData.placeholder || undefined,
      validation: {
        regex: formData.validation.regex || undefined,
        min: formData.validation.min ? Number(formData.validation.min) : undefined,
        max: formData.validation.max ? Number(formData.validation.max) : undefined,
        maxLength: formData.validation.maxLength ? Number(formData.validation.maxLength) : undefined,
        fileTypes: formData.validation.fileTypes.length > 0 ? formData.validation.fileTypes : undefined,
        maxSize: formData.validation.maxSize ? Number(formData.validation.maxSize) : undefined
      },
      gridConfig: {
        span: Number(formData.gridConfig.span),
        order: Number(formData.gridConfig.order)
      }
    };

    try {
      const response = await customFieldService.createCustomField(payload);
      const newField = response.data?.data;
      if (!newField) {
        throw new Error("No field data returned from the server");
      }

      setCreatedFields(prev => [...prev, newField]);
      toast.success('Field created successfully!');

      setFormData({
        name: '',
        label: '',
        type: '',
        options: [],
        isRequired: false,
        placeholder: '',
        validation: { regex: '', min: '', max: '', maxLength: '', fileTypes: [], maxSize: '' },
        gridConfig: { span: 12, order: 0 }
      });
    } catch (error) {
      const errorMessage = error.message || 'An error occurred while creating the field';
      setErrors([errorMessage]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 mb-10 px-4 sm:px-6 min-h-[80vh] lg:px-8">
    
      <div className="bg-white dark:bg-cardBgDark rounded-3xl shadow-custom-light p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2">
          Create Custom Field
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            {/* <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="input-label"
              >
                Name
              </label>
            </div> */}

            {/* Label */}
            {/* <div className="relative">
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Label"
              />
              <label
                htmlFor="label"
                className="input-label"
              >
                Label
              </label>
            </div> */}

            {/* Type */}
            {/* <div className="relative">
              <Select
                name="type"
                options={fieldTypes}
                value={fieldTypes.find(option => option.value === formData.type)}
                onChange={(option) => handleSelectChange('type', option)}
                styles={customStyles}
                className="peer"
                placeholder="Select field type"
              />
              <label
                htmlFor="type"
                className="input-label"
              >
                Field Type
              </label>
            </div> */}

            {/* Placeholder */}
            {/* <div className="relative">
              <input
                type="text"
                name="placeholder"
                value={formData.placeholder}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Placeholder"
              />
              <label
                htmlFor="placeholder"
                className="input-label"
              >
                Placeholder
              </label>
            </div> */}

            {/* Is Required */}
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                name="isRequired"
                checked={formData.isRequired}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="isRequired"
                className="ml-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Is Required
              </label>
            </div> */}

            {/* Options (for select/multiselect) */}
            {/* {(formData.type === 'select' || formData.type === 'multiselect') && (
              <div className="relative">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={optionInput}
                    onChange={(e) => setOptionInput(e.target.value)}
                    className="input-base peer"
                    placeholder="Add option"
                  />
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <label
                  htmlFor="optionInput"
                  className="input-label"
                >
                  Options
                </label>
                <div className="mt-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Validation: Regex */}
            <div className="relative">
              <input
                type="text"
                name="validation.regex"
                value={formData.validation.regex}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Regex"
              />
              <label
                htmlFor="validation.regex"
                className="input-label"
              >
                Regex
              </label>
            </div>

            {/* Validation: Min */}
            <div className="relative">
              <input
                type="number"
                name="validation.min"
                value={formData.validation.min}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Min Value"
              />
              <label
                htmlFor="validation.min"
                className="input-label"
              >
                Min Value
              </label>
            </div>

            {/* Validation: Max */}
            <div className="relative">
              <input
                type="number"
                name="validation.max"
                value={formData.validation.max}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Max Value"
              />
              <label
                htmlFor="validation.max"
                className="input-label"
              >
                Max Value
              </label>
            </div>

            {/* Validation: Max Length */}
            <div className="relative">
              <input
                type="number"
                name="validation.maxLength"
                value={formData.validation.maxLength}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Max Length"
              />
              <label
                htmlFor="validation.maxLength"
                className="input-label"
              >
                Max Length
              </label>
            </div>

            {/* Validation: Max Size */}
            <div className="relative">
              <input
                type="number"
                name="validation.maxSize"
                value={formData.validation.maxSize}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Max File Size (bytes)"
              />
              <label
                htmlFor="validation.maxSize"
                className="input-label"
              >
                Max File Size (bytes)
              </label>
            </div>

            {/* Validation: File Types */}
            {formData.type === 'file' && (
              <div className="relative">
                <Select
                  isMulti
                  name="validation.fileTypes"
                  options={commonFileTypes}
                  value={commonFileTypes.filter(option => formData.validation.fileTypes.includes(option.value))}
                  onChange={handleFileTypesChange}
                  styles={customStyles}
                  className="peer"
                  placeholder="Select file types"
                />
                <label
                  htmlFor="validation.fileTypes"
                  className="input-label"
                >
                  File Types
                </label>
              </div>
            )}

            {/* Grid Config: Span */}
            {/* <div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div><div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div><div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div><div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div><div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div><div className="relative">
              <input
                type="number"
                name="gridConfig.es"
                value={formData.gridConfig.span}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Span"
                min="1"
                max="12"
              />
              <label
                htmlFor="gridConfig.span"
                className="input-label"
              >
                Grid Span (1-12)
              </label>
            </div> */}

            {/* Grid Config: Order */}
            <div className="relative">
              <input
                type="number"
                name="gridConfig.order"
                value={formData.gridConfig.order}
                onChange={handleChange}
                className="input-base peer"
                placeholder="Grid Order"
              />
              <label
                htmlFor="gridConfig.order"
                className="input-label"
              >
                Grid Order
              </label>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="text-red-500 text-sm">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="twoD-style-button-three"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomField;