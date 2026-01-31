


import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../constant/images';
import campusService from '../../services/campus/campus.service';
import Swal from 'sweetalert2';
import { FaCog } from 'react-icons/fa';
import useWidth from '../../Hooks/useWidth';
import { IoIosArrowRoundBack } from 'react-icons/io';

function CreateUnit() {
  const { width, breakpoints } = useWidth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { organization } = useSelector((state) => state?.organizationSlice);
  const { clientUser } = useSelector((state) => state?.authCustomerSlice);
  const { show } = useSelector((state) => state?.showTabSlice || {});

  // === Mode Detection ===
  const id = state?.id;
  const isViewMode = state?.view === true;
  const isEditMode = !!id && !isViewMode;
  const isCreateMode = !id;

  // === Header Animation Logic (same as CreateAdmin) ===
  const [headeOn, setHeaderOn] = useState(false);
  useEffect(() => {
    setHeaderOn(!!show);
  }, [show]);

  const defaultBanner = images?.loginBg;
  const defaultLogo = images?.companyLogoLight;

  const initialFormData = useMemo(() => ({
    name: "", founderName: "", affiliation: "", institutionCode: "", email: "",
    alternativeEmail: "", phone: "", officeNumber: "", institutoinType: "", pan: "",
    city: "", state: "", country: "", zipCode: "", address: "", banner: "", logo: ""
  }), []);

  const initialFormDataErr = useMemo(() => ({
    name: "", founderName: "", affiliation: "", institutionCode: "", email: "",
    alternativeEmail: "", phone: "", officeNumber: "", institutoinType: "", pan: "",
    city: "", state: "", country: "", zipCode: "", address: "", banner: "", logo: ""
  }), []);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formDataErr, setFormDataErr] = useState(initialFormDataErr);
  const [imgPreview1, setImgPreview1] = useState(null);
  const [imgErr1, setImgErr1] = useState("");
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [imgPreview2, setImgPreview2] = useState(null);
  const [imgErr2, setImgErr2] = useState("");
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [apiError, setApiError] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);

  const inputsDisabled = isLoading || isViewMode;

  // === Sticky Header Animation ===
  const animateHeader = () => {
    if (width < breakpoints.sm) {
      return `${headeOn ? "top-12" : "top-0"}`;
    } else {
      return "top-12";
    }
  };

  const pageTitle = isViewMode ? 'View Unit' : isEditMode ? 'Edit Unit' : 'Create Unit';
  const saveBtnText = isLoading
    ? (isEditMode ? 'Updating...' : 'Saving...')
    : (isEditMode ? 'Update' : 'Save');

  // === Validation ===
  const validateField = useCallback((name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    const rules = {
      name: [!value ? "Institute Name is required" : value.length < 3 ? "Minimum 3 characters required" : ""],
      founderName: [!value ? "Founder Name is required" : value.length < 3 ? "Minimum 3 characters required" : ""],
      affiliation: [!value ? "Affiliation is required" : value.length < 3 ? "Minimum 3 characters required" : ""],
      institutionCode: [!value ? "Institute Code is required" : ""],
      email: [!value ? "Email is required" : !emailRegex.test(value) ? "Invalid email format" : ""],
      alternativeEmail: [!value ? "Alternative Email is required" : !emailRegex.test(value) ? "Invalid email format" : ""],
      phone: [!value ? "Phone is required" : !phoneRegex.test(value) ? "Invalid phone number" : ""],
      officeNumber: [!value ? "Office Phone is required" : !phoneRegex.test(value) ? "Invalid phone number" : ""],
      institutoinType: [!value ? "Institution Type is required" : ""],
      pan: [!value ? "PAN is required" : ""],
      city: [!value ? "City is required" : ""],
      state: [!value ? "State is required" : ""],
      country: [!value ? "Country is required" : ""],
      zipCode: [!value ? "Zip Code is required" : ""],
      address: [!value ? "Address is required" : ""],
    };
    return rules[name] || "";
  }, []);

  const validateAll = useCallback(() => {
    if (isViewMode) return false;
    const errors = {};
    Object.keys(initialFormData).forEach(key => {
      errors[key] = validateField(key, formData[key]);
    });
    console.log("errors", errors);

    setFormDataErr(prev => ({ ...prev, ...errors }));
    return Object.values(errors).some(Boolean);
  }, [formData, validateField, isViewMode]);

  const handleInputChange = useCallback((e) => {
    if (isViewMode) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormDataErr(prev => ({ ...prev, [name]: validateField(name, value) }));
    setIsFormDirty(true);
  }, [validateField, isViewMode]);

  const handleFileChange1 = useCallback((e) => {
    if (isViewMode) return;
    const file = e.target.files[0];
    setImgErr1("");
    if (!file) return;
    const fileSizeKB = file.size / 1024;
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) return setImgErr1("Only JPG, JPEG, PNG, or GIF allowed.");
    if (fileSizeKB > 5120) return setImgErr1("Image size should not exceed 5MB.");

    const preview = URL.createObjectURL(file);
    setSelectedFile1(file);
    setImgPreview1(preview);
    setFormData(prev => ({ ...prev, banner: preview }));
    setIsFormDirty(true);
  }, [isViewMode]);

  const handleFileChange2 = useCallback((e) => {
    if (isViewMode) return;
    const file = e.target.files[0];
    setImgErr2("");
    if (!file) return;
    const fileSizeKB = file.size / 1024;
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) return setImgErr2("Only JPG, JPEG, PNG, or GIF allowed.");
    if (fileSizeKB > 5120) return setImgErr2("Image size should not exceed 5MB.");

    const preview = URL.createObjectURL(file);
    setSelectedFile2(file);
    setImgPreview2(preview);
    setFormData(prev => ({ ...prev, logo: preview }));
    setIsFormDirty(true);
  }, [isViewMode]);

  // Load data
  useEffect(() => {
    if (state?.row) {
      const r = state.row;
      setFormData(prev => ({
        ...prev,
        name: r.name || "", founderName: r.founderName || "", affiliation: r.affiliation || "",
        institutionCode: r.institutionCode || "", email: r.email || "", alternativeEmail: r.alternativeEmail || "",
        phone: r.phone || "", officeNumber: r.officeNumber || "", institutoinType: r.institutoinType || "",
        pan: r.pan || "", city: r.city || "", state: r.state || "", country: r.country || "",
        zipCode: r.zipCode || "", address: r.address || ""
      }));
      if (r.banner) setImgPreview1(`${import.meta.env.VITE_API_URL}/institute/${r.banner}`);
      if (r.logo) setImgPreview2(`${import.meta.env.VITE_API_URL}/institute/${r.logo}`);
      setIsFormDirty(false);
    }
  }, [state]);

  const handleSubmit = async (action = 'save') => {

    if (isViewMode) return;
    // if (validateAll()) return setIsLoading(false);

    console.log("yes");


    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("enterpriseId", organization?._id);
      form.append("clientId", clientUser?._id);
      Object.keys(formData).forEach(key => {
        if (key !== 'banner' && key !== 'logo') form.append(key, formData[key]);
      });
      if (selectedFile1) form.append("banner", selectedFile1);
      if (selectedFile2) form.append("logo", selectedFile2);
      if (isEditMode) form.append("unitId", id);

      const res = isEditMode
        ? await campusService.updateUnit(form)
        : await campusService.createUnit(form);

      Swal.fire({ icon: 'success', title: res?.data?.message, timer: 2000, showConfirmButton: false });
      setIsFormDirty(false);
      if (action === 'save') navigate('/list/unit');
    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed";
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
      }).then(res => res.isConfirmed && navigate('/list/unit'));
    } else {
      navigate('/list/unit');
    }
  };

  useEffect(() => {
    if (isFormDirty && !isViewMode) {
      const handler = e => { e.preventDefault(); e.returnValue = ''; };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [isFormDirty, isViewMode]);

  return (
    <div className=" min-h-[80vh] mx-auto mt-2 mb-10 px-0 sm:px-0 lg:px-2">
      {/* === Sticky Header (Same as CreateAdmin) === */}
      <div className={`sticky ${animateHeader()} z-30 bg-white border-b-[1.5px] dark:bg-cardBgDark shadow-sm rounded-t-md md:py-4 py-2 md:px-0 md:pr-2 pr-2  flex items-center justify-between flex-wrap gap-4 transition-all duration-200`}>
        <div className="flex items-center ">
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
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center" disabled={isLoading}>
              <FaCog className='text-gray-400 dark:text-white' />
            </button>
          </div>
        ) : (
          !isViewMode && (
            <div className="flex items-center gap-4 flex-wrap">
              <button className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center" disabled={isLoading}>
                <FaCog className='text-gray-400 dark:text-white' />
                Unit Setting
              </button>
              {isCreateMode && (
                <button onClick={() => handleSubmit('saveAndNew')} className="flex items-center gap-1 text-blueBorder dark:text-orangeBorder ring-blueBorder dark:ring-orangeBorder ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center" disabled={isLoading}>
                  Save & New
                </button>
              )}
              {isEditMode && (
                <button onClick={handleBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium" disabled={isLoading}>
                  Cancel
                </button>
              )}
              <button onClick={() => handleSubmit('save')} className="twoD-style-button-three px-4 py-2" disabled={isLoading}>
                {saveBtnText}
              </button>
            </div>
          )
        )}
      </div>

      {/* === Main Content === */}
      <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-b-xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-48 sm:h-64">
          <img src={imgPreview1 || formData.banner || defaultBanner} alt="Banner" className="w-[100%] h-[100%] object-cover" />
          {!isViewMode && (
            <div className="absolute md:bottom-4 bottom-14 right-4 flex flex-col items-end gap-1 z-10">
              <input type="file" accept="image/jpeg,image/png,image/gif" onChange={handleFileChange1} className="cursor-pointer bg-white dark:bg-cardBgDark rounded-lg text-sm md:px-4 px-2 py-2 shadow-sm" disabled={isLoading} />
              {imgErr1 && <span className="text-red-500 text-xs">{imgErr1}</span>}
            </div>
          )}
        </div>

        <div className="md:p-6 p-2">
          <div className="flex flex-col">
            <div className="relative -mt-16 sm:-mt-20">
              <img src={imgPreview2 || formData.logo || defaultLogo} alt="Logo" className="w-32 h-32 rounded-full border-4 border-white dark:border-upperCardBgDark object-cover" />
              {!isViewMode && (
                <div className="mt-2 flex flex-col gap-1">
                  <input type="file" accept="image/jpeg,image/png,image/gif" onChange={handleFileChange2} className="text-sm cursor-pointer" disabled={isLoading} />
                  {imgErr2 && <span className="text-red-500 text-xs">{imgErr2}</span>}
                </div>
              )}
            </div>

            <div className="mt-8">
              <form onSubmit={e => { e.preventDefault(); handleSubmit('save'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="relative border-none border-t-0 rounded-tl-none rounded-tr-none border-gray-200 dark:border-gray-700 p-2 py-6 shadow-md rounded-lg" >
                    <div className="text-base flex items-center gap-2 w-[100%] absolute top-[-1rem] left-0 border-none px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                      <span>Basic Information</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                      {['name', 'institutionCode', 'institutoinType', 'founderName', 'affiliation', 'pan'].map(f => (
                        <div key={f}>
                          <label className="block input-label">
                            {f === 'institutoinType' ? 'Institution Type' : f === 'institutionCode' ? 'Institution Code' : f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input type="text" name={f} value={formData[f]} onChange={handleInputChange} className="input-base" placeholder={f === 'name' ? 'ex: Carmel Faridabad ....' : ''} disabled={inputsDisabled} />
                          {formDataErr[f] && <span className="text-red-500 text-xs">{formDataErr[f]}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="relative border-none border-t-0 rounded-tl-none rounded-tr-none border-gray-200 dark:border-gray-700 p-2 py-6 shadow-md rounded-lg" >
                    <div className="text-base flex items-center gap-2 w-[100%] absolute top-[-1rem] left-0 border-none px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                      <span> Contact Details</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                    </div>
                    {/* <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                      Contact Details
                    </span> */}
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                      {['email', 'alternativeEmail', 'phone', 'officeNumber'].map(f => (
                        <div key={f}>
                          <label className="block input-label">
                            {f === 'alternativeEmail' ? 'Alternative Email' : f === 'officeNumber' ? 'Office Phone' : f.charAt(0).toUpperCase() + f.slice(1)}
                          </label>
                          <input type={f.includes('email') ? 'email' : 'tel'} name={f} value={formData[f]} onChange={handleInputChange} className="input-base" disabled={inputsDisabled} />
                          {formDataErr[f] && <span className="text-red-500 text-xs">{formDataErr[f]}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="relative border-none border-t-0 rounded-tl-none rounded-tr-none border-gray-200 dark:border-gray-700 md:col-span-2 p-2 py-6 shadow-md rounded-lg" >
                    <div className="text-base flex items-center gap-2 w-[100%] absolute top-[-1rem] left-0 border-none px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                      <span> Address</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                    </div>
                    {/* <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                      Address
                    </span> */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                      {['country', 'state', 'city', 'zipCode', 'address'].map(f => (
                        <div key={f}>
                          <label className="block input-label">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                          <input type="text" name={f} value={formData[f]} onChange={handleInputChange} className="input-base" disabled={inputsDisabled} />
                          {formDataErr[f] && <span className="text-red-500 text-xs">{formDataErr[f]}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* === Fixed Mobile Bottom Bar (Exact same as CreateAdmin) === */}
        {width < breakpoints.sm && !isViewMode && (
          <div className="fixed bottom-0 z-30 bg-white w-[100%] border-b-[1.5px] dark:bg-cardBgDark shadow-2xl border-[1.4px] border-t rounded-t-md h-[3rem]">
            <div className="flex h-[100%] w-[100%]">
              {isCreateMode ? (
                <button onClick={() => handleSubmit('saveAndNew')} className="save-new-bottom" disabled={isLoading}>
                  <span>Save & New</span>
                </button>
              ) : (
                <button onClick={handleBack} className="cancel-bottom" disabled={isLoading}>
                  <span>Cancel</span>
                </button>
              )}
              <button onClick={() => handleSubmit('save')} className="save-bottom" disabled={isLoading}>
                <span>{saveBtnText}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUnit;

