


import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import clientService from "../../services/clientService";
import common from "../../helper/common";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const CreateOrganization = () => {
    const { state } = useLocation();
    const client = state?.client;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        clientId: "",
    });

    console.log("formData", formData);

    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState(null);
    const [roles, setRoles] = useState([]);

    const [clients, setClients] = useState([])


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // Initialize form with client data if editing
    useEffect(() => {
        if (client) {
            setFormData({
                role: client?.role || "",
                firstName: client?.firstName || "",
                lastName: client?.lastName || "",
                email: client?.email || "",
                phone: client?.phone || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [client]);

    // Fetch roles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await clientService.getClientRole();
                setRoles(response?.data?.data || []);
            } catch (error) {
                console.error("Error fetching roles:", error);
                setResponseError("Failed to load roles. Please try again.");
            }
        };
        // fetchRoles();
        fetchClientDoNotHaveOrganization()
    }, []);

    const fetchClientDoNotHaveOrganization = async () => {
        try {
            const response = await clientService.getClientDoNotHaveOrganization();
            setClients(response?.data?.data);
        } catch (error) {
            console.error("Error fetching client:", error);
            setResponseError("Failed to load client. Please try again.");
        }
    };

    // Form validation
    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.clientId) newErrors.clientId = "ClientId is required";
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number (e.g., 123-456-7890)";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, client]);

    // Handle form input changes
    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            let newErrors = { ...errors };
            switch (name) {
                case "clientId":
                    if (!value) newErrors.clientId = "ClientId is required";
                    else delete newErrors.clientId;
                    break;
                case "name":
                    if (!value.trim()) newErrors[name] = `Name is required`;
                    else delete newErrors[name];
                    break;
                case "email":
                    if (!value.trim()) newErrors.email = "Email is required";
                    else if (!emailRegex.test(value)) newErrors.email = "Please enter a valid email address";
                    else delete newErrors.email;
                    break;
                case "phone":
                    if (!value.trim()) newErrors.phone = "Phone number is required";
                    else if (!phoneRegex.test(value)) newErrors.phone = "Please enter a valid phone number (e.g., 123-456-7890)";
                    else delete newErrors.phone;
                    break;
                default:
                    break;
            }
            setErrors(newErrors);
        },
        [errors, formData, client]
    );

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const dataObject = {
                clientId: formData.clientId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            };
            const response = client
                ? await clientService.updateClient({ ...dataObject, clientId: client._id })
                : await clientService.createOrganization(dataObject);
            setFormData({
                clientId: "",
                name: "",
                email: "",
                phone: "",
            });
            setErrors({});
            Swal.fire({
                position: "center",
                icon: "success",
                title: response?.data?.message || (client ? "Organization updated successfully" : "Organization created successfully"),
                showConfirmButton: false,
                timer: 2000,
            });
            navigate("/list/organization");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred. Please try again.";
            setResponseError(errorMessage);
            Swal.fire({
                position: "center",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 2000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-8 mb-10 px-4 sm:px-6 lg:px-8">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <li>
                        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li>
                        <Link to="/list/clients" className="hover:text-blue-600 transition-colors">Organizations</Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-gray-700">{client ? "Update" : "Create"}</li>
                </ol>
            </nav>
            <h2 className="md:text-2xl text-1xl font-semibold text-formHeadingLight dark:text-orangeBorder mb-4 text-start">{`${client ? "Update Organization" : "Create Organization"}`}</h2>
            <div className="h-[1.8px] bg-formHeadingLight dark:bg-orangeBorder mb-4"></div>
            <div className="bg-white dark:bg-cardBgDark rounded-3xl shadow-custom-light p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block input-label">Client</label>
                        <select
                            name="clientId"
                            value={formData.clientId}
                            onChange={handleChange}
                            className="input-base"            >
                            <option value="">Select a client</option>
                            {clients.map((client) => (
                                <option key={client._id} value={client._id}>
                                    {client.email}
                                </option>
                            ))}
                        </select>
                        {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>}
                    </div>
                    <div>
                        <label className="block input-label">Organization Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-base" placeholder="Enter first name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block input-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-base" placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block input-label">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onKeyPress={common.handleKeyPress}
                            className="input-base" placeholder="Enter phone number (e.g., 123-456-7890)"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                </form>
                {responseError && (
                    <div className="mt-4 p-4 bg-red-100 rounded-lg">
                        <p className="text-red-700 text-sm">{responseError}</p>
                    </div>
                )}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="twoD-style-button-three flex justify-center gap-1"          >
                        <span><MdOutlineCreateNewFolder className='text-[1.3rem]' /></span>

                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4…" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            client ? "Update Organization" : "Create Organization"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrganization;