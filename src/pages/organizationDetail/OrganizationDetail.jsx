

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import images from '../../constant/images';
import campusService from '../../services/campus/campus.service';
import { setOrganization } from '../../store/reducer/organization/organizationSlice';
import Swal from 'sweetalert2';

function OrganizationDetail() {
    const dispatch = useDispatch();
    const { organization } = useSelector((state) => state?.organizationSlice);
    const { clientUser } = useSelector((state) => state?.authCustomerSlice);

    // Default images
    const defaultBanner = images?.loginBg;
    const defaultLogo = images?.companyLogoLight;

    // Destructure organization details with fallbacks
    const {
        banner = defaultBanner,
        logo = defaultLogo,
        email = '',
        name = 'Organization Name',
        phone = ''
    } = organization || {};

    // Memoized initial form data
    const initialFormData = useMemo(() => ({
        name: "",
        founderName: "",
        affiliation: "",
        institutionCode: "",
        email: "",
        alternativeEmail: "",
        phone: "",
        officeNumber: "",
        institutoinType: "",
        pan: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        address: "",
        banner: "",
        logo: "",
    }), []);

    // Memoized initial form error data
    const initialFormDataErr = useMemo(() => ({
        name: "",
        founderName: "",
        affiliation: "",
        institutionCode: "",
        email: "",
        alternativeEmail: "",
        phone: "",
        officeNumber: "",
        institutoinType: "",
        pan: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        address: "",
        banner: "",
        logo: "",
    }), []);

    // State management
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formDataErr, setFormDataErr] = useState(initialFormDataErr);
    const [imgPreview1, setImgPreview1] = useState(null);
    const [imgErr1, setImgErr1] = useState("");
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [imgPreview2, setImgPreview2] = useState(null);
    const [imgErr2, setImgErr2] = useState("");
    const [selectedFile2, setSelectedFile2] = useState(null);


    console.log("imgPreview2", imgPreview2);


    // Validation logic
    const validateField = useMemo(() => (name, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-]{10,}$/;

        const rules = {
            name: [
                [!value, "Institute Name is required"],
                [value.length < 3, "Minimum 3 characters required"],
            ],
            founderName: [
                [!value, "Founder Name is required"],
                [value.length < 3, "Minimum 3 characters required"],
            ],
            affiliation: [
                [!value, "Affiliation is required"],
                [value.length < 3, "Minimum 3 characters required"],
            ],
            institutionCode: [[!value, "Institute Code is required"]],
            email: [
                [!value, "Email is required"],
                [value && !emailRegex.test(value), "Invalid email format"],
            ],
            alternativeEmail: [
                [!value, "Alternative Email is required"],
                [value && !emailRegex.test(value), "Invalid email format"],
            ],
            phone: [
                [!value, "Phone is required"],
                [value && !phoneRegex.test(value), "Invalid phone number (minimum 10 digits)"],
            ],
            officeNumber: [
                [!value, "Office Phone is required"],
                [value && !phoneRegex.test(value), "Invalid phone number (minimum 10 digits)"],
            ],
            institutoinType: [[!value, "Institution Type is required"]],
            pan: [[!value, "PAN is required"]],
            city: [[!value, "City is required"]],
            state: [[!value, "State is required"]],
            country: [[!value, "Country is required"]],
            zipCode: [[!value, "Zip Code is required"]],
            address: [[!value, "Address is required"]],
        };
        return (rules[name] || []).find(([condition]) => condition)?.[1] || "";
    }, []);

    const validationFunction = useMemo(() => () => {
        const errors = {
            name: validateField("name", formData.name),
            founderName: validateField("founderName", formData.founderName),
            affiliation: validateField("affiliation", formData.affiliation),
            institutionCode: validateField("institutionCode", formData.institutionCode),
            email: validateField("email", formData.email),
            alternativeEmail: validateField("alternativeEmail", formData.alternativeEmail),
            phone: validateField("phone", formData.phone),
            officeNumber: validateField("officeNumber", formData.officeNumber),
            institutoinType: validateField("institutoinType", formData.institutoinType),
            pan: validateField("pan", formData.pan),
            city: validateField("city", formData.city),
            state: validateField("state", formData.state),
            country: validateField("country", formData.country),
            zipCode: validateField("zipCode", formData.zipCode),
            address: validateField("address", formData.address),
        };
        setFormDataErr((prev) => ({ ...prev, ...errors }));
        return Object.values(errors).some((error) => error);
    }, [formData, validateField]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormDataErr((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }, [validateField]);

    const handleFileChange1 = useCallback((e) => {
        const { files } = e.target;
        setImgErr1("");
        setFormDataErr((prev) => ({ ...prev, banner: "" }));

        if (!files[0]) {
            setFormDataErr((prev) => ({ ...prev, banner: "Banner is required." }));
            return;
        }

        const file = files[0];
        const fileSize = file.size / 1024; // Convert to KB
        let errorCount = 0;

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            setImgErr1("Only JPG, JPEG, PNG, or GIF images are allowed.");
            errorCount++;
        }
        if (fileSize > 1024 * 5) {
            setImgErr1("Image size should not exceed 5MB.");
            errorCount++;
        }

        if (errorCount === 0) {
            const imageAsBase64 = URL.createObjectURL(file);
            setSelectedFile1(file);
            setImgPreview1(imageAsBase64);
            setFormData((prev) => ({ ...prev, banner: imageAsBase64 }));
        }
    }, []);

    const handleFileChange2 = useCallback((e) => {
        const { files } = e.target;
        setImgErr2("");
        setFormDataErr((prev) => ({ ...prev, logo: "" }));

        if (!files[0]) {
            setFormDataErr((prev) => ({ ...prev, logo: "Logo is required." }));
            return;
        }

        const file = files[0];
        const fileSize = file.size / 1024; // Convert to KB
        let errorCount = 0;

        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            setImgErr2("Only JPG, JPEG, PNG, or GIF images are allowed.");
            errorCount++;
        }
        if (fileSize > 1024 * 5) {
            setImgErr2("Image size should not exceed 5MB.");
            errorCount++;
        }

        if (errorCount === 0) {
            const imageAsBase64 = URL.createObjectURL(file);
            setSelectedFile2(file);
            setImgPreview2(imageAsBase64);
            setFormData((prev) => ({ ...prev, logo: imageAsBase64 }));
        }
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const hasErrors = validationFunction();
            setIsLoading(true);
            if (hasErrors) {
                setIsLoading(false);
                return;
            }
            try {
                const fileObject = new FormData();
                fileObject.append("name", formData?.name);
                fileObject.append("founderName", formData?.founderName);
                fileObject.append("affiliation", formData?.affiliation);
                fileObject.append("institutionCode", formData?.institutionCode);
                fileObject.append("email", formData?.email);
                fileObject.append("alternativeEmail", formData?.alternativeEmail);
                fileObject.append("phone", formData?.phone);
                fileObject.append("officeNumber", formData?.officeNumber);
                fileObject.append("institutoinType", formData?.institutoinType);
                fileObject.append("pan", formData?.pan);
                fileObject.append("city", formData?.city);
                fileObject.append("state", formData?.state);
                fileObject.append("country", formData?.country);
                fileObject.append("zipCode", formData?.zipCode);
                fileObject.append("address", formData?.address);
                fileObject.append("clientId", clientUser?._id);

                if (selectedFile1) {
                    fileObject.append("banner", selectedFile1);
                }
                if (selectedFile2) {
                    fileObject.append("logo", selectedFile2);
                }

                let response;

                if (clientUser?.isUnitType) {
                    fileObject.append("unitId", organization?._id);
                    response = await campusService.updateUnitByUnithead(fileObject);
                } else {
                    fileObject.append("enterpriseId", organization?._id);
                    response = await campusService.updateEnterprise(fileObject);
                }

                // Replace with your API call
                console.log("response institute", response?.data?.data);
                dispatch(setOrganization(response?.data?.data));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
                setIsEditing(false);
            } catch (error) {
                 Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: error,
                    showConfirmButton: false,
                    timer: 2000,
                });
                console.error("Error while updating the institute", error);
            } finally {
                setIsLoading(false);
            }
        },
        [validationFunction, formData]
    );

    const toggleEditMode = useCallback(() => {
        setIsEditing((prev) => !prev);
        if (isEditing) {
            setSelectedFile1(null);
            setSelectedFile2(null);
            setImgErr1("");
            setImgErr2("");
            setFormDataErr((prev) => ({ ...prev, banner: "", logo: "" }));
        }
    }, [isEditing, name, email, phone, banner, logo, initialFormData]);

    const getInstitute = useCallback(async (id) => {
        try {
            await campusService.getOne(id);
        } catch (error) {
            console.error("Error while getting institute", error);
        }
    }, []);

    useEffect(() => {
        if (organization) {
            setFormData({
                name: organization?.name || "",
                founderName: organization?.founderName || "",
                affiliation: organization?.affiliation || "",
                institutionCode: organization?.institutionCode || "",
                email: organization?.email || "",
                alternativeEmail: organization?.alternativeEmail || "",
                phone: organization?.phone || "",
                officeNumber: organization?.officeNumber || "",
                institutoinType: organization?.institutoinType || "",
                pan: organization?.pan || "",
                city: organization?.city || "",
                state: organization?.state || "",
                country: organization?.country || "",
                zipCode: organization?.zipCode || "",
                address: organization?.address || "",
            });



            if (organization?.banner !== null) {
                console.log("organization?.banner", organization?.banner);

                setImgPreview1(`${import.meta.env.VITE_API_URL}/institute/${organization?.banner}`)
            }

            if (organization?.logo !== null) {
                setImgPreview2(`${import.meta.env.VITE_API_URL}/institute/${organization?.logo}`)

            }

        }
    }, [organization]);

    return (
        <div className="max-w-7xl mx-auto mt-4 mb-10 px-0 sm:px-6 lg:px-8">


            {/* Main Content */}
            <div className="bg-white dark:bg-cardBgDark shadow-custom-light rounded-lg overflow-hidden">
                {/* Banner Image */}
                <div className="relative h-48 sm:h-64">
                    <img
                        src={imgPreview1 || defaultBanner}
                        alt="Organization Banner"
                        className="w-[100%] h-[100%] object-cover"
                    />
                    {isEditing && (
                        <div className="absolute md:bottom-4 bottom-14 right-4 flex flex-col items-end gap-1 z-30">
                            <input
                                type="file"
                                name="banner"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={handleFileChange1}
                                className="cursor-pointer bg-white dark:bg-cardBgDark text-sm md:px-4 px-2 py-2 rounded-md shadow-sm"
                                disabled={isLoading}
                            />
                            {imgErr1 && (
                                <span className="text-red-500 text-xs">{imgErr1}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Organization Info */}
                <div className="md:p-6 p-2">
                    <div className="flex flex-col">
                        {/* Logo */}
                        <div className="relative -mt-16 sm:-mt-20">
                            <img
                                src={imgPreview2 || defaultLogo}
                                alt="Organization Logo"
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-upperCardBgDark object-cover"
                            />
                            {isEditing && (
                                <div className="mt-2 flex flex-col gap-1">
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/jpeg,image/png,image/gif"
                                        onChange={handleFileChange2}
                                        className="text-sm cursor-pointer"
                                        disabled={isLoading}
                                    />
                                    {imgErr2 && (
                                        <span className="text-red-500 text-xs">{imgErr2}</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="mt-8">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="w-[100%]">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Basic Information Section */}
                                        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                            <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Basic Information</span>
                                            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block input-label">Institute Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.name && <span className="text-red-500 text-xs">{formDataErr.name}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Institution Code</label>
                                                    <input
                                                        type="text"
                                                        name="institutionCode"
                                                        value={formData.institutionCode}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.institutionCode && <span className="text-red-500 text-xs">{formDataErr.institutionCode}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Institution Type</label>
                                                    <input
                                                        type="text"
                                                        name="institutoinType"
                                                        value={formData.institutoinType}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.institutoinType && <span className="text-red-500 text-xs">{formDataErr.institutoinType}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Founder Name</label>
                                                    <input
                                                        type="text"
                                                        name="founderName"
                                                        value={formData.founderName}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.founderName && <span className="text-red-500 text-xs">{formDataErr.founderName}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Affiliation</label>
                                                    <input
                                                        type="text"
                                                        name="affiliation"
                                                        value={formData.affiliation}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.affiliation && <span className="text-red-500 text-xs">{formDataErr.affiliation}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">PAN</label>
                                                    <input
                                                        type="text"
                                                        name="pan"
                                                        value={formData.pan}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.pan && <span className="text-red-500 text-xs">{formDataErr.pan}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Details Section */}
                                        <div className=" relative rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                                            <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Contact Details</span>
                                            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block input-label">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.email && <span className="text-red-500 text-xs">{formDataErr.email}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Alternative Email</label>
                                                    <input
                                                        type="email"
                                                        name="alternativeEmail"
                                                        value={formData.alternativeEmail}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.alternativeEmail && <span className="text-red-500 text-xs">{formDataErr.alternativeEmail}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.phone && <span className="text-red-500 text-xs">{formDataErr.phone}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Office Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="officeNumber"
                                                        value={formData.officeNumber}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.officeNumber && <span className="text-red-500 text-xs">{formDataErr.officeNumber}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address Section */}
                                        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm md:col-span-2">
                                            <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Address</span>
                                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block input-label">Country</label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.country && <span className="text-red-500 text-xs">{formDataErr.country}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">State</label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.state && <span className="text-red-500 text-xs">{formDataErr.state}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.city && <span className="text-red-500 text-xs">{formDataErr.city}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Zip Code</label>
                                                    <input
                                                        type="text"
                                                        name="zipCode"
                                                        value={formData.zipCode}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.zipCode && <span className="text-red-500 text-xs">{formDataErr.zipCode}</span>}
                                                </div>
                                                <div>
                                                    <label className="block input-label">Address</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        className="input-base"
                                                        disabled={isLoading}
                                                    />
                                                    {formDataErr.address && <span className="text-red-500 text-xs">{formDataErr.address}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <button
                                            type="submit"
                                            className="twoD-style-button-three"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Updating..." : "Update"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={toggleEditMode}
                                            className="twoD-style-button-cancel"
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="mt-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                                <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Basic Information</span>
                                                <div className="space-y-3">
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Institute Name:</span> {formData?.name || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Institute Code:</span> {formData?.institutionCode || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Institute Type:</span> {formData?.institutoinType || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Founder Name:</span> {formData?.founderName || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Affiliation:</span> {formData?.affiliation || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">PAN:</span> {formData?.pan || 'Not provided'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                                <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Contact Details</span>
                                                <div className="space-y-3">
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Email:</span> {email || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Alternative Email:</span> {formData?.alternativeEmail || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Phone:</span> {formData?.phone || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Office Phone:</span> {formData?.officeNumber || 'Not provided'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative border  border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm md:col-span-2">
                                                <span className="text-base absolute  top-[-1rem] left-2 px-2 py-1 rounded-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border bg-white dark:bg-cardBgDark border-gray-200 dark:border-gray-700">Address</span>
                                                <div className="space-y-3">
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Address:</span> {formData?.address || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">City:</span> {formData?.city || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">State:</span> {formData?.state || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Country:</span> {formData?.country || 'Not provided'}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">Zip Code:</span> {formData?.zipCode || 'Not provided'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleEditMode}
                                        className="twoD-style-button-three flex justify-center gap-1 mt-4"
                                        disabled={isLoading}
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizationDetail;