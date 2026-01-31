


import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import clientService from "../../services/clientService";
import common from "../../helper/common";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const CreateClients = () => {
    const { state } = useLocation();
    const client = state?.client;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [responseError, setResponseError] = useState(null);
    const [roles, setRoles] = useState([]);
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
        fetchRoles();
    }, []);

    // Form validation
    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
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
        if (!client || formData.password) {
            if (!formData.password.trim()) {
                newErrors.password = "Password is required";
            } else if (!passwordRegex.test(formData.password)) {
                newErrors.password =
                    "Password must be at least 8 characters long and include a letter, number, and special character";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
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
                case "role":
                    if (!value) newErrors.role = "Role is required";
                    else delete newErrors.role;
                    break;
                case "firstName":
                case "lastName":
                    if (!value.trim()) newErrors[name] = `${name === "firstName" ? "First" : "Last"} name is required`;
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
                case "password":
                    if (!value.trim() && (!client || formData.password)) {
                        newErrors.password = "Password is required";
                    } else if (value && !passwordRegex.test(value)) {
                        newErrors.password =
                            "Password must be at least 8 characters long and include a letter, number, and special character";
                    } else {
                        delete newErrors.password;
                    }
                    if (formData.confirmPassword && value !== formData.confirmPassword) {
                        newErrors.confirmPassword = "Passwords do not match";
                    } else if (formData.confirmPassword) {
                        delete newErrors.confirmPassword;
                    }
                    break;
                case "confirmPassword":
                    if (!value.trim() && (!client || formData.password)) {
                        newErrors.confirmPassword = "Confirm password is required";
                    } else if (formData.password !== value) {
                        newErrors.confirmPassword = "Passwords do not match";
                    } else {
                        delete newErrors.confirmPassword;
                    }
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
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                ...(formData.password && { password: formData.password }),
            };
            const response = client
                ? await clientService.updateClient({ ...dataObject, clientId: client._id })
                : await clientService.createClient(dataObject);
            setFormData({
                role: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });
            setErrors({});
            Swal.fire({
                position: "center",
                icon: "success",
                title: response?.data?.message || (client ? "Client updated successfully" : "Client created successfully"),
                showConfirmButton: false,
                timer: 2000,
            });
            navigate("/list/clients");
        } catch (error) {
            const errorMessage = error || "An error occurred. Please try again.";
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
                        <Link to="/list/clients" className="hover:text-blue-600 transition-colors">Clients</Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-formHeadingLight dark:text-orangeBorder">{client ? "Update" : "Create"}</li>
                </ol>
            </nav>
            <h2 className="md:text-2xl text-1xl font-semibold text-formHeadingLight dark:text-orangeBorder mb-4 text-start">{`${client ? "Update Client" : "Create Client"}`}</h2>
            <div className="h-[1.8px] bg-formHeadingLight dark:bg-orangeBorder mb-4"></div>
            <div className="bg-white dark:bg-cardBgDark rounded-lg shadow-custom-light p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block input-label ">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input-base"            >
                            <option value="">Select a role</option>
                            {roles.map((role) => (
                                <option key={role._id} value={role._id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>
                    <div>
                        <label className="block input-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-base" placeholder="Enter first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block input-label ">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input-base" placeholder="Enter last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label className="block input-label ">Email</label>
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
                        <label className="block  input-label">Phone</label>
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
                    <div className="relative">
                        <label className="block input-label ">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-base" placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray95-00"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="relative">
                        <label className="block input-label ">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input-base" placeholder="Confirm password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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
                        className="twoD-style-button-three flex justify-center gap-1" >
                        {
                            isSubmitting ? "" :
                                <span><MdOutlineCreateNewFolder className='text-[1.3rem]' /></span>
                        }
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
                            client ? "Update Client" : "Create Client"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateClients;