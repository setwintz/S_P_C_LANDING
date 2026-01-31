import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../constant/images';
import campusService from '../../services/campus/campus.service';
import studentFieldSettingService from '../../services/setting/studentFieldSetting.service';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaCog, FaEye, FaEyeSlash } from 'react-icons/fa';
import useWidth from '../../Hooks/useWidth';
import { IoIosArrowRoundBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import getCroppedImg from '../../helper/getCroppedImage'; // Assume this helper is available

// Bind modal to app element for accessibility
Modal.setAppElement("#root");

function CreateStudentProfile() {
  const { width, breakpoints } = useWidth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { organization } = useSelector((state) => state?.organizationSlice);
  const { clientUser } = useSelector((state) => state?.authCustomerSlice);

  // Determine mode: create, edit, or view
  const id = state?.id;
  const isViewMode = state?.view === true;
  const isEditMode = !!id && !isViewMode;
  const isCreateMode = !id;

  const [headeOn, setHeaderOn] = useState(false);
  const { show } = useSelector((state) => state?.showTabSlice);

  useEffect(() => {
    setHeaderOn(!!show);
  }, [show]);

  const defaultProfilePic = images?.profile;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [formDataErr, setFormDataErr] = useState({});
  const [imgPreview, setImgPreview] = useState(null);
  const [imgErr, setImgErr] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({}); // For multiple files
  const [apiError, setApiError] = useState('');
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Disable all inputs in view mode or while loading
  const inputsDisabled = isLoading || isViewMode;

  // Dynamic fields state
  const [dynamicFields, setDynamicFields] = useState([]);
  const [groupedFields, setGroupedFields] = useState({});
  const [tabSections, setTabSections] = useState([]);
  const [activeTab, setActiveTab] = useState('General Info');

  console.log("tabSections", tabSections);


  useEffect(() => {

    if (tabSections?.length > 0) {

      setActiveTab(tabSections[0])

    }

  }, [tabSections])


  // Cropper states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [currentFieldName, setCurrentFieldName] = useState(null);
  const [currentAspectRatio, setCurrentAspectRatio] = useState(null);

  // Fetch dynamic fields
  const enterpriseUuid = clientUser?.isEnterpriseType ? organization?.enterprise_uuid : clientUser?.enterpriseUuId;
  const unitUuid = organization.unit_uuid;

  const fetchDynamicFields = useCallback(async () => {
    try {
      const res = await studentFieldSettingService.getFields(enterpriseUuid, unitUuid);
      const fieldsData = res.data?.data || [];
      setDynamicFields(fieldsData);

      // Group fields by title_section
      const groups = fieldsData.reduce((acc, field) => {
        const section = field.title_section;
        if (!acc[section]) acc[section] = [];
        acc[section].push(field);
        return acc;
      }, {});

      setGroupedFields(groups);
      setTabSections(Object.keys(groups).filter(section => section !== 'General Info'));

      // Initialize formData with dynamic fields
      const initialData = {};
      const initialErr = {};
      fieldsData.forEach(field => {
        initialData[field.name] = '';
        initialErr[field.name] = '';
      });
      setFormData(prev => ({ ...prev, ...initialData }));
      setFormDataErr(prev => ({ ...prev, ...initialErr }));
    } catch (error) {
      toast.error('Failed to fetch form fields');
    }
  }, [enterpriseUuid, unitUuid]);

  useEffect(() => {
    fetchDynamicFields();
  }, [fetchDynamicFields]);

  // Load existing data for edit/view
  useEffect(() => {
    if (state?.row) {
      const loadedData = {
        // Static fields
        firstName: state.row.firstName || '',
        lastName: state.row.lastName || '',
        email: state.row.email || '',
        phone: state.row.phone || '',
        password: '',
        confirmPassword: '',
        gender: state.row.gender || '',
        dob: state.row.dob || '',
        optionalMailId: state.row.optionalMailId || '',
        emergencyContact: state.row.emergencyContact || '',
        profilePic: state.row.profilePic || '',
        // Dynamic fields from row
        ...state.row.dynamicFields, // Assume row has dynamicFields object
      };
      setFormData(loadedData);
      if (state.row.profilePic) {
        setImgPreview(`${import.meta.env.VITE_API_URL}/profile/${state.row.profilePic}`);
      }
      setIsFormDirty(false);
    }
  }, [state]);

  // Validation function for a single field
  const validateField = useCallback((field, value) => {
    let error = '';
    if (field.is_required && (!value || (typeof value === 'string' && !value.trim()))) {
      error = `${field.label} is required`;
    } else if (field.validation) {
      const val = field.validation;
      if (val.regex && value && !new RegExp(val.regex).test(value)) {
        error = `Invalid format for ${field.label}`;
      }
      if (val.minLength && value && value.length < val.minLength) {
        error = `Minimum ${val.minLength} characters for ${field.label}`;
      }
      if (val.maxLength && value && value.length > val.maxLength) {
        error = `Maximum ${val.maxLength} characters for ${field.label}`;
      }
      if (val.min && Number(value) < val.min) {
        error = `Minimum value ${val.min} for ${field.label}`;
      }
      if (val.max && Number(value) > val.max) {
        error = `Maximum value ${val.max} for ${field.label}`;
      }
      // File-specific
      // if (field.type === 'file' && value && val.fileTypes && !val.fileTypes.some(type => value.type.includes(type.split('/')[1]))) {
      //   error = `Invalid file type for ${field.label}`;
      // }
      if (field.type === 'file' && value && val.maxSize && value.size > val.maxSize) {
        error = `File size exceeds limit for ${field.label}`;
      }
    }
    return error;
  }, []);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    dynamicFields.forEach(field => {
      newErrors[field.name] = validateField(field, formData[field.name] || '');
    });
    setFormDataErr(newErrors);
    return newErrors;
  }, [dynamicFields, formData, validateField]);

  // Group errors by tab/section
  const getTabErrors = useCallback((errors) => {
    const tabErrors = {};
    dynamicFields.forEach(field => {
      const err = errors[field.name];
      if (err) {
        const tab = field.title_section;
        if (!tabErrors[tab]) tabErrors[tab] = [];
        tabErrors[tab].push({ field: field.label, error: err });
      }
    });
    return tabErrors;
  }, [dynamicFields]);

  const handleInputChange = useCallback((name, value, field) => {
    if (inputsDisabled) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormDataErr(prev => ({ ...prev, [name]: validateField(field, value) }));
    setIsFormDirty(true);
  }, [validateField, inputsDisabled]);

  // Handle file change with cropping
  const handleFileChange = useCallback((e, field) => {
    if (inputsDisabled) return;
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const val = field.validation;
    if (val.fileTypes && !val.fileTypes.some(type => file.type.includes(type.split('/')[1]))) {
      setImgErr(`Invalid file type for ${field.label}`);
      return;
    }
    if (val.maxSize && file.size > val.maxSize) {
      setImgErr(`File size exceeds limit for ${field.label}`);
      return;
    }

    setImgErr('');
    setFormDataErr(prev => ({ ...prev, [field.name]: '' }));

    // If image, open crop modal
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setCurrentFieldName(field.name);
        setCurrentAspectRatio(field.aspectRation || { xAxis: 3, yAxis: 4 }); // Default 3/4
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      // Non-image file: store directly, show preview (e.g., name or icon)
      setSelectedFiles(prev => ({ ...prev, [field.name]: file }));
      setFormData(prev => ({ ...prev, [field.name]: file.name })); // Or URL for preview if applicable
      // Show preview: file name or icon
      toast.success(`File "${file.name}" uploaded for ${field.label}`);
    }
  }, [inputsDisabled]);

  // Cropper callbacks
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const fileName = `cropped_${Date.now()}.jpg`;
      const croppedFile = new File([croppedImage], fileName, { type: 'image/jpeg' });
      setSelectedFiles(prev => ({ ...prev, [currentFieldName]: croppedFile }));
      setImgPreview(URL.createObjectURL(croppedFile));
      setFormData(prev => ({ ...prev, [currentFieldName]: URL.createObjectURL(croppedFile) }));
      setFormDataErr(prev => ({ ...prev, [currentFieldName]: '' }));
      setCropModalOpen(false);
      setImageSrc(null);
      setCurrentFieldName(null);
      setCurrentAspectRatio(null);
      toast.success('Image cropped and uploaded');
    } catch (error) {
      toast.error('Failed to crop image');
    }
  }, [imageSrc, croppedAreaPixels, currentFieldName]);

  const handleCropCancel = useCallback(() => {
    setCropModalOpen(false);
    setImageSrc(null);
    setCurrentFieldName(null);
    setCurrentAspectRatio(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  const handleSubmit = useCallback(async (action = 'save') => {
    if (inputsDisabled) return;

    const errors = validateAll();
    const tabErrors = getTabErrors(errors);
    if (Object.keys(errors).length > 0) {
      const errorTabs = Object.keys(tabErrors).map(tab => `"${tab}"`).join(', ');
      toast.error(`Please fix errors in: ${errorTabs}`);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const payload = new FormData();
      payload.append('enterpriseId', organization?._id || '');
      payload.append('clientId', clientUser?._id || '');
      // Add static fields if any
      // Add dynamic fields
      dynamicFields.forEach(field => {
        let value = formData[field.name];
        if (field.type === 'file') {
          const file = selectedFiles[field.name];
          if (file) payload.append(field.name, file);
        } else {
          payload.append(field.name, value);
        }
      });
      if (isEditMode) payload.append('userId', id);

      const response = isEditMode
        ? await campusService.updateAdmin(payload)
        : await campusService.createAdmin(payload);

      Swal.fire({ icon: 'success', title: response?.data?.message || 'Success', timer: 2000 });
      setIsFormDirty(false);
      if (action === 'save') navigate('/list/admin');
      else if (action === 'saveAndNew') {
        setFormData({});
        setFormDataErr({});
        setSelectedFiles({});
        setImgPreview(null);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed';
      setApiError(msg);
      Swal.fire({ icon: 'error', title: msg, timer: 2000 });
    } finally {
      setIsLoading(false);
    }
  }, [dynamicFields, formData, selectedFiles, validateAll, getTabErrors, isEditMode, id, organization, clientUser, inputsDisabled, navigate]);

  const handleBack = useCallback(() => {
    if (isFormDirty && !isViewMode) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'Leave without saving?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Leave',
      }).then(res => res.isConfirmed && navigate('/list/admin'));
    } else {
      navigate('/list/admin');
    }
  }, [isFormDirty, isViewMode, navigate]);

  useEffect(() => {
    if (isFormDirty && !isViewMode) {
      const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [isFormDirty, isViewMode]);

  const animateHeader = () => width < breakpoints.sm ? `${headeOn ? "top-12" : "top-0"}` : "top-12";

  const pageTitle = isViewMode ? 'View Student' : isEditMode ? 'Edit Student' : 'Create Student';
  const saveBtnText = isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save');

  // Render dynamic input
  const renderDynamicInput = useCallback((field) => {

    const value = formData[field.name] || '';
    const error = formDataErr[field.name];
    const handleChange = (val) => handleInputChange(field.name, val, field);

    // const"input-base"= 'w-[100%] bg-transparent p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'timepicker':
      case 'color':
      case 'hyperlink':
        return (
          <div>
            <input type={field.type} value={value} onChange={(e) => handleChange(e.target.value)} disabled={inputsDisabled} className="input-base" placeholder={field.placeholder} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 'number':
        return (
          <div>
            <input type="number" value={value} onChange={(e) => handleChange(e.target.value)} disabled={inputsDisabled} className="input-base" placeholder={field.placeholder} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            <textarea value={value} onChange={(e) => handleChange(e.target.value)} disabled={inputsDisabled} className={`$"input-base" min-h-[100px]`} placeholder={field.placeholder} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 'select':
        const options = field.options?.map(opt => ({ value: opt, label: opt })) || [];
        return (
          <div>
            <Select value={options.find(opt => opt.value === value)} onChange={(selected) => handleChange(selected?.value)} isDisabled={inputsDisabled} options={options} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 'multiselect':
        const multiOptions = field.options?.map(opt => ({ value: opt, label: opt })) || [];
        return (
          <div>
            <Select value={multiOptions.filter(opt => value.includes(opt.value))} onChange={(selected) => handleChange(selected.map(s => s.value))} isMulti isDisabled={inputsDisabled} options={multiOptions} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "datepicker":
        return (
          <>
            <input
              type="date"
              placeholder={field?.placeholder || "Select a date"}
              className="input-base"
            // value={customizationValues[fieldName] || ""}
            // onChange={(e) => handleInputChange(fieldName, e.target.value, field)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        );
      case "date":
        return (
          <>
            <input
              type="date"
              placeholder={field?.placeholder || "Select a date"}
              className="input-base"
            // value={customizationValues[fieldName] || ""}
            // onChange={(e) => handleInputChange(fieldName, e.target.value, field)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        );
      case "timepicker":
        return (
          <>
            <input
              type="time"
              placeholder={field?.placeholder || "Select a time"}
              className="input-base"
            // value={customizationValues[fieldName] || ""}
            // onChange={(e) => handleInputChange(fieldName, e.target.value, field)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        );
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input type="checkbox" checked={!!value} onChange={(e) => handleChange(e.target.checked)} disabled={inputsDisabled} className="h-5 w-5 text-blue-600" />
            <label className="ml-2">{field.label}</label>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 'file':
        return (
          <div>
            <input type="file" onChange={(e) => handleFileChange(e, field)} disabled={inputsDisabled} accept={field.validation?.fileTypes?.join(',')} />
            {imgPreview && field.name === currentFieldName && (
              <img src={imgPreview} alt="Preview" className="mt-2 max-h-32 object-cover" />
            )}
            {selectedFiles[field.name] && !imgPreview && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="text-sm">File: {selectedFiles[field.name].name}</p>
                {/* Icon or preview for non-image */}
                <span className="text-xs text-gray-500">Uploaded</span>
              </div>
            )}
            {imgErr && <p className="text-red-500 text-sm mt-1">{imgErr}</p>}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      default:
        return <p className="text-gray-500">Unsupported field type: {field.type}</p>;
    }
  }, [formData, formDataErr, handleInputChange, handleFileChange, inputsDisabled, imgPreview, imgErr, selectedFiles, currentFieldName]);

  function sortByGridOrder(arr) {
    return arr.sort((a, b) => {
        const orderA = a?.gridConfig?.order ?? 0;
        const orderB = b?.gridConfig?.order ?? 0;
        return orderA - orderB;
    });
}


  return (
    <div className="max-w-7xl min-h-[84vh] mx-auto md:p-4 p-0 mb-10">
      {/* Sticky Header */}
      <div className={`sticky ${animateHeader()} z-30 bg-white border-b-[1.5px] dark:bg-cardBgDark shadow-sm rounded-t-md md:py-4 py-2 md:px-4 px-1 flex items-center justify-between flex-wrap gap-4 transition-all duration-200`}>
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" disabled={isLoading}>
            <IoIosArrowRoundBack size={40} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>
        {/* Buttons - same as before */}
        {!isViewMode && (
          <div className="flex gap-2">
            {isEditMode && <button onClick={handleBack} className="twoD-style-button-cancel" disabled={isLoading}>Cancel</button>}
            {isCreateMode && <button onClick={() => handleSubmit('saveAndNew')} className="twoD-style-button-three" disabled={isLoading}>Save & New</button>}
            <button onClick={() => handleSubmit('save')} className="twoD-style-button-three" disabled={isLoading}>{saveBtnText}</button>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-b-lg overflow-hidden mt-0 ">

        <div className="md:p-6 p-1">
          {/* General Info Section */}
          <div className="mb-8">
            <div className="mt-8 relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm md:p-6">

              <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                General Info
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                { groupedFields['General Info']?.map(field => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium">{field.label} {field.is_required && <span className="text-red-500">*</span>}</label>
                    {renderDynamicInput(field)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs for other sections */}
          {tabSections?.length > 0 && (
            <div className="mb-4">
              <div className="flex overflow-x-auto border-b border-gray-200">
                {tabSections?.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              <div className="mt-4 min-h-[30vh] relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm md:p-6 ">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  { sortByGridOrder(groupedFields[activeTab]) ?.map(field => {
                    return (
                      <div key={field.name} className="space-y-2">
                        <label className="block text-sm font-medium">{field.label} {field.is_required && <span className="text-red-500">*</span>}</label>
                        {renderDynamicInput(field)}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {apiError && <p className="text-red-500 mt-4 p-2 bg-red-50 rounded">{apiError}</p>}
        </div>


      </div>

      {/* Mobile Bottom Bar */}
      {width < breakpoints.sm && !isViewMode && (
        <div className="fixed bottom-0 z-30 bg-white w-[100%] border-t dark:bg-cardBgDark shadow-2xl h-[3rem]">
          <div className="flex h-full">
            {isEditMode ? (
              <button onClick={handleBack} className="flex-1 cancel-bottom" disabled={isLoading}>Cancel</button>
            ) : (
              <button onClick={() => handleSubmit('saveAndNew')} className="flex-1 save-new-bottom" disabled={isLoading}>Save & New</button>
            )}
            <button onClick={() => handleSubmit('save')} className="flex-1 save-bottom" disabled={isLoading}>{saveBtnText}</button>
          </div>
        </div>
      )}

      {/* Cropper Modal */}
      <Modal
        isOpen={cropModalOpen}
        onRequestClose={handleCropCancel}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '90%',
            padding: '20px',
          },
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Crop Image</h2>
        <div style={{ position: 'relative', width: '100%', height: '60vh' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={currentAspectRatio ? currentAspectRatio.xAxis / currentAspectRatio.yAxis : 3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-[100%]"
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={handleCropCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={handleCropConfirm} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Confirm Crop</button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateStudentProfile;