import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCog } from 'react-icons/fa';
import useWidth from '../../Hooks/useWidth';
import { IoIosArrowRoundBack } from 'react-icons/io';

// Import your services
import academicYearService from '../../services/academicYear/academicYear.service';
// import unitService from '../../services/unit/unit.service';
// import curriculumService from '../../services/curriculum/curriculum.service';
// import mediumService from '../../services/medium/medium.service';
// import shiftTypeService from '../../services/shiftType/shiftType.service';
// import classService from '../../services/class/class.service';
import campusService from '../../services/campus/campus.service';
import mediumService from '../../services/medium/medium.service';
import classService from '../../services/class/class.service';
import curriculumService from '../../services/curriculum/curriculum.service';
import academicShiftTypeService from '../../services/academicShiftType/academicShiftType.service';

function CreateAcademicYear() {
  const { width, breakpoints } = useWidth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { organization } = useSelector((state) => state?.organizationSlice);
  const { clientUser } = useSelector((state) => state?.authCustomerSlice);

  // Determine mode
  const id = state?.id;
  const isViewMode = state?.view === true;
  const isEditMode = !!id && !isViewMode;
  const isCreateMode = !id;

  const [headeOn, setHeaderOn] = useState(false);
  const { show } = useSelector((state) => state?.showTabSlice);

  useEffect(() => {
    setHeaderOn(!!show);
  }, [show]);

  // Form initial state - matches your backend exactly
  const initialFormData = useMemo(() => ({
    unit_id: '',
    name: '',
    startDate: '',
    endDate: '',
    fromClass: '',
    toClass: '',
    curriculum: '',
    medium: '',
    academicShiftType: '',
    description: '',
  }), []);

  const initialFormDataErr = useMemo(() => ({
    unit_id: '',
    name: '',
    startDate: '',
    endDate: '',
    curriculum: '',
    medium: '',
    academicShiftType: '',
  }), []);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formDataErr, setFormDataErr] = useState(initialFormDataErr);
  const [apiError, setApiError] = useState('');
  const [isFormDirty, setIsFormDirty] = useState(false);


  console.log("formData", formData);
  console.log("formDataErr", formDataErr);



  // Dropdown data
  const [units, setUnits] = useState([]);
  const [classes, setClasses] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [shiftTypes, setShiftTypes] = useState([]);

  const inputsDisabled = isLoading || isViewMode;
  const isEnterprise = clientUser?.isEnterpriseType;
  const tenantId = clientUser?.orgId;
  const enterpriseUuid = isEnterprise ? organization?.enterprise_uuid : clientUser?.enterpriseUuId;

  // Load dropdown data
  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [unitRes] = await Promise.all([
          campusService.listAllUnits(organization?._id),
        ]);
        setUnits(unitRes.data?.data || []);
      } catch (err) {
        console.error('Failed to load dropdowns', err);
      }
    };
    setFormData(isEnterprise ? initialFormData : { ...initialFormData, unit_id: organization?._id });
    loadDropdowns();
  }, [isEnterprise, organization?._id]);

  // Load existing academic year in edit/view mode
  useEffect(() => {
    if ((isEditMode || isViewMode) && state?.row) {
      const row = state.row;
      setFormData({
        unit_id: row.unit_id?._id || row.unit_id || '',
        name: row.name || '',
        startDate: row.startDate ? row.startDate.split('T')[0] : '',
        endDate: row.endDate ? row.endDate.split('T')[0] : '',
        fromClass: row.fromClass?._id || '',
        toClass: row.toClass?._id || '',
        curriculum: row.curriculum?._id || '',
        medium: row.medium?._id || '',
        academicShiftType: row.academicShiftType?._id || '',
        description: row.description || '',
      });
      setIsFormDirty(false);
    }
  }, [state, isEditMode, isViewMode]);

  // Validation - Exactly like your original style
  const validateField = useCallback((name, value) => {
    const rules = {
      unit_id: [
        [!value, 'Unit is required']
      ],
      name: [
        [!value?.trim(), 'Academic Year Name is required']
      ],
      startDate: [
        [!value, 'Start Date is required']
      ],
      endDate: [
        [!value, 'End Date is required'],
        [formData.startDate && value && value <= formData.startDate, 'End Date must be after Start Date']
      ],
      curriculum: [
        [!value, 'Curriculum is required']
      ],
      medium: [
        [!value, 'Medium is required']
      ],
      academicShiftType: [
        [!value, 'Academic Shift Type is required']
      ],
    };
    return (rules[name] || []).find(([condition]) => condition)?.[1] || '';
  }, [formData.startDate]);

  const validateAll = useCallback(() => {
    if (isViewMode) return false;

    const errors = {};
    Object.keys(formData).forEach(key => {
      if (['fromClass', 'toClass', 'description'].includes(key)) return;
      if ((key === 'description') && isEditMode) return;
      errors[key] = validateField(key, formData[key]);
    });

    console.log("errors", errors);


    setFormDataErr(prev => ({ ...prev, ...errors }));
    return Object.values(errors).some((error) => error);
  }, [formData, validateField, isViewMode, isEditMode]);

  const handleInputChange = useCallback((e) => {
    if (isViewMode) return;
    const { name, value } = e.target;
    if (name === "name") {
      // Allow: empty, 4 digits, or 4 digits + hyphen + up to 2 digits
      if (/^(?:\d{0,4}|\d{4}-\d{0,2})$/.test(value) || value === '') {
        setFormData(prev => ({ ...prev, [name]: value }));
      }

      setFormDataErr(prev => ({ ...prev, [name]: validateField(name, value) }));

    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      setFormDataErr(prev => ({ ...prev, [name]: validateField(name, value) }));

    }
    setIsFormDirty(true);
  }, [validateField, isViewMode]);

  const handleSubmit = async (action = 'save') => {
    if (isViewMode) return;

    const error = validateAll();
    if (error) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const payload = {
        ...formData,
        unit_id: formData.unit_id,
        fromClass: formData.fromClass || undefined,
        toClass: formData.toClass || undefined,
        description: formData.description || undefined,
        enterprise_id: enterpriseUuid

      };

      const response = isEditMode
        ? await academicYearService.update(id, payload)
        : await academicYearService.create(payload);

      Swal.fire({ icon: 'success', title: response?.data?.message, timer: 2000, showConfirmButton: false });
      setIsFormDirty(false);
      if (action === 'save') navigate('/list/academicYear');
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
        if (res.isConfirmed) navigate('/settings/academic/year');
      });
    } else {
      navigate('/settings/academic/year');
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

  useEffect(() => {
    if (formData?.unit_id) {
      const loadDropdowns = async () => {
        try {
          const [medRes, classRes, currRes, shiftRes] = await Promise.all([
            mediumService.listAll(formData?.unit_id),
            classService.listAll(formData?.unit_id),
            curriculumService.listAll(formData?.unit_id),
            academicShiftTypeService.listAll(formData?.unit_id),
          ]);
          setMediums(medRes.data?.data || []);
          setClasses(classRes.data?.data || []);
          setCurriculums(currRes.data?.data || []);
          setShiftTypes(shiftRes.data?.data || []);
        } catch (err) {
          console.error('Failed to load dropdowns', err);
        }
      };
      loadDropdowns();

    }

  }, [formData?.unit_id])

  const animateHeader = () => width < breakpoints.sm
    ? `${headeOn ? "top-12" : "top-0"}`
    : "top-12";

  const pageTitle = isViewMode ? 'View Academic Year' : isEditMode ? 'Edit Academic Year' : 'Create Academic Year';
  const saveBtnText = isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save');

  return (
    <div className="max-w-7xl min-h-[80vh] mx-auto mt-2 mb-10 lg:px-8 sm:px-0">
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
              onClick={() => Swal.fire({ icon: 'info', title: 'Settings Coming Soon', timer: 2000, showConfirmButton: false })}
              className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center"
              disabled={isLoading}
            >
              <FaCog className="text-gray-400 dark:text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => Swal.fire({ icon: 'info', title: 'Settings Coming Soon', timer: 2000, showConfirmButton: false })}
              className="flex items-center gap-1 ring-gray-400 ring-1 hover:ring-2 font-medium rounded-lg text-sm px-3 py-2 text-center"
              disabled={isLoading}
            >
              <FaCog className="text-gray-400 dark:text-white" />
              Setting
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
            {apiError && <div className="mt-4 text-red-500 text-sm text-center">{apiError}</div>}

            <div className="mt-8 relative border border-gray-200 dark:border-gray-700 rounded-lg p-6  md:p-6">
              <span className="text-base absolute top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">
                Academic Year Details
              </span>

              <form className="w-[100%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {/* Unit */}
                {isEnterprise && (
                  <div>
                    <label className="block input-label">Unit <span className="text-red-500">*</span></label>
                    <select
                      name="unit_id"
                      value={formData.unit_id}
                      onChange={handleInputChange}
                      className="input-base"
                      disabled={inputsDisabled}
                    >
                      <option value="">Select Unit</option>
                      {units.map(unit => (
                        <option key={unit._id} value={unit._id}>{unit.name}</option>
                      ))}
                    </select>
                    {formDataErr.unit_id && <span className="text-red-500 text-xs">{formDataErr.unit_id}</span>}
                  </div>
                )}


                {/* Name */}
                <div>
                  <label className="block input-label">Academic Year Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. 2025-26"
                    className="input-base"
                    disabled={inputsDisabled}
                  />
                  {formDataErr.name && <span className="text-red-500 text-xs">{formDataErr.name}</span>}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block input-label">Start Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  />
                  {formDataErr.startDate && <span className="text-red-500 text-xs">{formDataErr.startDate}</span>}
                </div>

                {/* End Date */}
                <div>
                  <label className="block input-label">End Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  />
                  {formDataErr.endDate && <span className="text-red-500 text-xs">{formDataErr.endDate}</span>}
                </div>

                {/* From Class */}
                <div>
                  <label className="block input-label">From Class</label>
                  <select
                    name="fromClass"
                    value={formData.fromClass}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  >
                    <option value="">Not specified</option>
                    {classes.map(cls => (
                      <option key={cls._id} value={cls._id}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                {/* To Class */}
                <div>
                  <label className="block input-label">To Class</label>
                  <select
                    name="toClass"
                    value={formData.toClass}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  >
                    <option value="">Not specified</option>
                    {classes.map(cls => (
                      <option key={cls._id} value={cls._id}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                {/* Curriculum */}
                <div>
                  <label className="block input-label">Curriculum <span className="text-red-500">*</span></label>
                  <select
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  >
                    <option value="">Select Curriculum</option>
                    {curriculums.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  {formDataErr.curriculum && <span className="text-red-500 text-xs">{formDataErr.curriculum}</span>}
                </div>

                {/* Medium */}
                <div>
                  <label className="block input-label">Medium <span className="text-red-500">*</span></label>
                  <select
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  >
                    <option value="">Select Medium</option>
                    {mediums.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                  {formDataErr.medium && <span className="text-red-500 text-xs">{formDataErr.medium}</span>}
                </div>

                {/* Academic Shift Type */}
                <div>
                  <label className="block input-label">Academic Shift Type <span className="text-red-500">*</span></label>
                  <select
                    name="academicShiftType"
                    value={formData.academicShiftType}
                    onChange={handleInputChange}
                    className="input-base"
                    disabled={inputsDisabled}
                  >
                    <option value="">Select Shift</option>
                    {shiftTypes.map(s => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                  {formDataErr.academicShiftType && <span className="text-red-500 text-xs">{formDataErr.academicShiftType}</span>}
                </div>

                {/* Description - Full Width */}
                <div className="lg:col-span-3 md:col-span-2 col-span-1">
                  <label className="block input-label">Description (Optional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    className="input-base-desc"
                    placeholder="Any additional information..."
                    disabled={inputsDisabled}
                  />
                </div>
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

export default CreateAcademicYear;