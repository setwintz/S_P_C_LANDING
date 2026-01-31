
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../constant/images';
import campusService from '../../services/campus/campus.service';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaCog, FaEye, FaEyeSlash } from 'react-icons/fa';
import useWidth from '../../Hooks/useWidth';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setHasUnsavedChanges } from '../../store/reducer/unSavedChangesSlice';

function CreateAdmin() {
  const { width, breakpoints } = useWidth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { organization } = useSelector((state) => state?.organizationSlice);
  const { clientUser } = useSelector((state) => state?.authCustomerSlice);
  const store = useSelector((state) => state);

  const [isDirty, setIsDirty] = useState(false);

  console.log("aaatif", store);
  

  // Determine mode: create, edit, or view
  const id = state?.id;
  const isViewMode = state?.view === true;           // Only true when explicitly viewing
  const isEditMode = !!id && !isViewMode;            // Has ID but not view → edit
  const isCreateMode = !id;                          // No ID → create

  const [headeOn, setHeaderOn] = useState(false);
  const { show } = useSelector((state) => state?.showTabSlice);

  useEffect(() => {
    setHeaderOn(!!show);
  }, [show]);

  const defaultProfilePic = images?.profile;

  const initialFormData = useMemo(() => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    optionalMailId: '',
    emergencyContact: '',
    profilePic: '',
  }), []);

  const initialFormDataErr = useMemo(() => ({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    confirmPassword: '', gender: '', dob: '', optionalMailId: '',
    emergencyContact: '', profilePic: '',
  }), []);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formDataErr, setFormDataErr] = useState(initialFormDataErr);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgErr, setImgErr] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Disable all inputs in view mode or while loading
  const inputsDisabled = isLoading || isViewMode;

  // Validation
  const validateField = useCallback((name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const rules = {
      firstName: [!value ? 'First Name is required' : value.length < 3 ? 'Minimum 3 characters required' : ''],
      lastName: [!value ? 'Last Name is required' : value.length < 3 ? 'Minimum 3 characters required' : ''],
      email: [!value ? 'Email is required' : !emailRegex.test(value) ? 'Invalid email format' : ''],
      phone: [!value ? 'Phone is required' : !phoneRegex.test(value) ? 'Invalid phone number (minimum 10 digits)' : ''],
      password: [!value ? 'Password is required' : !passwordRegex.test(value) ? 'Password must be at least 8 characters with alphabet, number, and symbol' : ''],
      confirmPassword: [!value ? 'Confirm Password is required' : value !== formData.password ? 'Passwords do not match' : ''],
      gender: [!value ? 'Gender is required' : ''],
      dob: [!value ? 'Date of Birth is required' : ''],
      optionalMailId: [value && !emailRegex.test(value) ? 'Invalid email format' : ''],
      emergencyContact: [!value ? 'Emergency Contact is required' : !phoneRegex.test(value) ? 'Invalid phone number (minimum 10 digits)' : ''],
      profilePic: [!value ? 'Profile Picture is required' : ''],
    };
    return rules[name] || '';
  }, [formData.password]);

  const validateAll = useCallback(() => {
    if (isViewMode) return false;

    const errors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'password' && key !== 'confirmPassword' && isEditMode) return;
      if ((key === 'password' || key === 'confirmPassword') && !isCreateMode) return;
      errors[key] = validateField(key, formData[key]);
    });

    setFormDataErr(prev => ({ ...prev, ...errors }));
    return Object.values(errors).some(Boolean);
  }, [formData, validateField, isViewMode, isEditMode, isCreateMode]);

  const handleInputChange = useCallback((e) => {
    if (isViewMode) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormDataErr(prev => ({ ...prev, [name]: validateField(name, value) }));
    setIsFormDirty(true);
    setIsDirty(true);
  }, [validateField, isViewMode]);

  const handleFileChange = useCallback((e) => {
    if (isViewMode) return;
    const file = e.target.files[0];
    setImgErr('');
    setFormDataErr(prev => ({ ...prev, profilePic: '' }));

    if (!file) {
      if (isCreateMode || !formData.profilePic) {
        setFormDataErr(prev => ({ ...prev, profilePic: 'Profile Picture is required.' }));
      }
      return;
    }

    const fileSizeKB = file.size / 1024;
    if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      setImgErr('Only JPG, JPEG, PNG, GIF, or WEBP images are allowed.');
      return;
    }
    if (fileSizeKB > 10240) {
      setImgErr('Image size should not exceed 10MB.');
      return;
    }

    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setImgPreview(preview);
    setFormData(prev => ({ ...prev, profilePic: preview }));
    setIsFormDirty(true);
  }, [isViewMode, isCreateMode, formData.profilePic]);

  // Load data when editing or viewing
  useEffect(() => {
    if (state?.row) {
      setFormData({
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
      });
      if (state.row.profilePic) {
        setImgPreview(`${import.meta.env.VITE_API_URL}/profile/${state.row.profilePic}`);
      }
      setIsFormDirty(false);
    }
  }, [state]);

  const handleSubmit = async (action = 'save') => {
    if (isViewMode) return;
    if (validateAll()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const form = new FormData();
      form.append('enterpriseId', organization?._id || '');
      form.append('clientId', clientUser?._id || '');
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      if (isCreateMode) form.append('password', formData.password);
      form.append('gender', formData.gender);
      form.append('dob', formData.dob);
      form.append('optionalMailId', formData.optionalMailId);
      form.append('emergencyContact', formData.emergencyContact);
      if (selectedFile) form.append('profile', selectedFile);
      if (isEditMode) form.append('userId', id);

      const response = isEditMode
        ? await campusService.updateAdmin(form)
        : await campusService.createAdmin(form);

      Swal.fire({ icon: 'success', title: response?.data?.message, timer: 2000, showConfirmButton: false });
      setIsFormDirty(false);
      if (action === 'save') navigate('/list/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed';
      setApiError(msg);
      Swal.fire({ icon: 'error', title: msg, timer: 2000, showConfirmButton: false });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (isFormDirty && !isViewMode) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Do you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
        reverseButtons: true,
      }).then(res => {
        if (res.isConfirmed) navigate('/list/admin');
      });
    } else {
      navigate('/list/admin');
    }
  };

  useEffect(() => {
    if (isFormDirty && !isViewMode) {
      const handler = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [isFormDirty, isViewMode]);

  const animateHeader = () => width < breakpoints.sm
    ? `${headeOn ? "top-12" : "top-0"}`
    : "top-12";

  const pageTitle = isViewMode ? 'View Admin' : isEditMode ? 'Edit Admin' : 'Create Admin';
  const saveBtnText = isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save');


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setHasUnsavedChanges(isDirty));

    return () => {
      dispatch(setHasUnsavedChanges(false)); // Cleanup on unmount
    };
  }, [isDirty, dispatch]);

  return (
    <div className=" w-[100%] mx-auto mt-4 mb-10   lg:px-2 px-0">
      {/* Sticky Header */}
      <div className={`sticky ${animateHeader()} z-30 bg-white border-b-[1.5px] dark:bg-cardBgDark shadow-sm rounded-t-md md:py-4 py-2 md:px-4 px-1 flex items-center justify-between flex-wrap gap-4 transition-all duration-200`}>
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ease-in-out"
            disabled={isLoading}
          >
            <IoIosArrowRoundBack size={40} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>

        {width < breakpoints.sm ? (
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => Swal.fire({ icon: 'info', title: 'Admin Settings Coming Soon', timer: 2000, showConfirmButton: false })}
              className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center"
              disabled={isLoading}
            >
              <FaCog className="text-gray-400 dark:text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => Swal.fire({ icon: 'info', title: 'Admin Settings Coming Soon', timer: 2000, showConfirmButton: false })}
              className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center"
              disabled={isLoading}
            >
              <FaCog className="text-gray-400 dark:text-white" />
              Admin Setting
            </button>

            {/* Buttons only when NOT in view mode */}
            {!isViewMode && (
              <>
                {isEditMode && (
                  <button onClick={handleBack} className="twoD-style-button-cancel" disabled={isLoading}>
                    Cancel
                  </button>
                )}
                {isCreateMode && (
                  <button onClick={() => handleSubmit('saveAndNew')} className="save-new" disabled={isLoading}>
                    Save & New
                  </button>
                )}
                <button onClick={() => handleSubmit('save')} className="save" disabled={isLoading}>
                  {saveBtnText}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-b-lg overflow-hidden mt-0">
        <div className="md:p-6 p-1">
          <div className="flex flex-col">
            <div className="relative">
              <img
                src={imgPreview || (formData.profilePic ? `${import.meta.env.VITE_API_URL}/profile/${formData.profilePic}` : defaultProfilePic)}
                alt="Admin Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-upperCardBgDark object-cover"
              />
              {!isViewMode && (
                <div className="mt-2 flex flex-col gap-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="text-sm cursor-pointer"
                    disabled={isLoading}
                  />
                  {imgErr && <span className="text-red-500 text-xs">{imgErr}</span>}
                </div>
              )}
            </div>

            {apiError && <div className="mt-4 text-red-500 text-sm">{apiError}</div>}

            <div className="mt-8 relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm md:p-6">
              <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                Basic Information
              </span>

              <form className="w-[100%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {['firstName', 'lastName', 'email', 'phone', 'gender', 'dob', 'optionalMailId', 'emergencyContact'].map(field => (
                  <div key={field}>
                    <label className="block input-label">
                      {field === 'optionalMailId' ? 'Optional Email' :
                        field === 'emergencyContact' ? 'Emergency Contact' :
                          field === 'dob' ? 'Date of Birth' :
                            field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {field === 'gender' ? (
                      <select name="gender" value={formData.gender} onChange={handleInputChange} className="input-base" disabled={inputsDisabled}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : field === 'dob' ? (
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="input-base" disabled={inputsDisabled} />
                    ) : (
                      <input
                        type={field.includes('mail') || field === 'email' ? 'email' : field.includes('phone') || field === 'emergencyContact' ? 'tel' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="input-base"
                        disabled={inputsDisabled}
                      />
                    )}
                    {formDataErr[field] && <span className="text-red-500 text-xs">{formDataErr[field]}</span>}
                  </div>
                ))}

                {/* Password fields only in create mode or hidden in edit/view */}
                {isCreateMode && (
                  <>
                    <div className="relative">
                      <label className="block input-label">Password</label>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} className="input-base pr-10" disabled={isLoading} />
                      <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-2 top-1/2 transform translate-y-1/4 text-gray-500">
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </button>
                      {formDataErr.password && <span className="text-red-500 text-xs">{formDataErr.password}</span>}
                    </div>
                    <div className="relative">
                      <label className="block input-label">Confirm Password</label>
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="input-base pr-10" disabled={isLoading} />
                      <button type="button" onClick={() => setShowConfirmPassword(p => !p)} className="absolute right-2 top-1/2 transform translate-y-1/4 text-gray-500">
                        {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </button>
                      {formDataErr.confirmPassword && <span className="text-red-500 text-xs">{formDataErr.confirmPassword}</span>}
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        {width < breakpoints.sm && !isViewMode && (
          <div className="fixed bottom-0 z-30 bg-white w-[100%] border-b-[1.5px] dark:bg-cardBgDark shadow-2xl border-[1.4px] border-t rounded-t-md h-[3rem]">
            <div className="flex h-[100%] w-[100%]">
              {isEditMode ? (
                <button onClick={handleBack} className="cancel-bottom" disabled={isLoading}>
                  <span>Cancel</span>
                </button>
              ) : (
                <button onClick={() => handleSubmit('saveAndNew')} className="save-new-bottom" disabled={isLoading}>
                  <span>Save & New</span>
                </button>
              )}
              <button onClick={() => handleSubmit('save')} className="save-bottom" disabled={isLoading}>
                {saveBtnText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAdmin;