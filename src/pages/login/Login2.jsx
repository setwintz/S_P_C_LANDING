import React, { useState } from 'react';
import "./Login2.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';

import images from '../../constant/images';
import authSrvice from '../../services/authSrvice';

import { setClientUser } from '../../store/reducer/auth/authCustomerSlice';
import { setCapability } from '../../store/reducer/capability/capabilitySlice';
import { setOrganization } from '../../store/reducer/organization/organizationSlice';
import { setTenant } from '../../store/reducer/tenant/tenantSlice';

function Login2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* ---------------- STATE ---------------- */
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ---------------- VALIDATION ---------------- */
    const validateForm = () => {
        const newErrors = {};

        if (!formData.identifier) {
            newErrors.identifier = 'Email or Phone is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier) &&
            !/^\d{10}$/.test(formData.identifier)
        ) {
            newErrors.identifier = 'Invalid email or 10-digit phone number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ---------------- HANDLERS ---------------- */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await authSrvice.login({
                identifier: formData.identifier,
                password: formData.password,
                rememberMe: formData.rememberMe,
            });

            dispatch(setClientUser(response.adminInfo));
            dispatch(setCapability(response.adminInfo.tenant_role.capability));
            dispatch(setOrganization(response.organization));
            dispatch(setTenant(response.organization));

            Swal.fire({
                icon: 'success',
                title: response.message,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate('/dashboard');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error?.message || 'Login failed',
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Top Logo */}
            <header className="fixed top-0 left-0 w-[100%] z-[10000] px-6 py-4">
                <img src={images.setwintzLight} alt="Company Logo" className="h-8 sm:h-20" />
            </header>


            <div className="grid-wrapper">
                <div className="grid-background"></div>
                <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative z-10">
                    <div className="w-[100%] max-w-md bg-white rounded-lg shadow-lg p-8 md:p-10">
                        <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600 mb-8">
                            to continue with Setwintz Acad
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            {/* Identifier */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email or Mobile Number
                                </label>
                                <input
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    className="input-base-static"
                                    placeholder='abc@example.com - 9800235423'
                                />
                                {errors.identifier && (
                                    <p className="text-xs text-red-500 mt-1">{errors.identifier}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-base-static"
                                    placeholder='***********'
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    Remember me
                                </label>

                                <a href="#" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                  w-[100%] py-3 rounded-lg
                  bg-primary text-white font-medium
                  hover:bg-primary/90 transition
                  flex items-center justify-center
                "
                            >
                                {isSubmitting ? (
                                    <>
                                        <ImSpinner9 className="animate-spin mr-2" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            or{' '}
                            <a href="#" className="text-primary font-medium hover:underline">
                                Sign in another way
                            </a>
                        </div>
                    </div>
                </div>
            </div>





            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-[100%] text-center py-4 text-xs text-gray-500 z-[10000]">
                © 2026, Setwintz Pvt. Ltd. All Rights Reserved.
            </footer>
        </>
    );
}

export default Login2;
