
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setClientUser } from '../../store/reducer/auth/authCustomerSlice';
import { setCapability } from '../../store/reducer/capability/capabilitySlice';
import { setOrganization } from '../../store/reducer/organization/organizationSlice';
import authSrvice from '../../services/authSrvice';
import images from '../../constant/images';
import { ImSpinner9 } from 'react-icons/im';
import { setTenant } from '../../store/reducer/tenant/tenantSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error in login:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const backgroundImage = images?.loginBg
    ? `url(${images.loginBg})`
    : 'ur[](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#21BBFD] to-[#2BC0FF]">
      <div className="w-[100%]  bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section (Hidden on Mobile) */}
        <div className="hidden md:block md:w-1/2 relative">
          <div
            className="w-[100%] h-full bg-cover bg-center"
            style={{ backgroundImage }}
            role="img"
            aria-label="Background image for Setwintz Private Ltd"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#21BBFD]/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl sm:text-2xl font-bold">Setwintz Private Ltd</h2>
              <p className="text-xs sm:text-sm">Connect and create with us</p>
            </div>
            <div className="absolute top-4 right-4">
              <img
                src={images.companyLogo}
                className="w-16 sm:w-20 md:w-24"
                alt="Setwintz Private Ltd Logo"
              />
            </div>
          </div>
        </div>
        {/* Right Section (Form) */}
        <div className="w-[100%] md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center">
          <div className="w-[100%] max-w-md">
            <div className="text-center mb-6 sm:mb-8">
              <img
                src={images.companyLogo}
                className="w-20 sm:w-24 mx-auto mb-4"
                alt="Setwintz Private Ltd Logo"
              />
              <p className="text-white/80 text-sm sm:text-base">Log in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-white/80"
                >
                  Email or Phone
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="mt-1 w-[100%] px-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#2BC0FF] text-sm sm:text-base"
                  placeholder="Enter your email or phone"
                  aria-describedby="identifier-error"
                />
                {errors.identifier && (
                  <p
                    id="identifier-error"
                    className="mt-1 text-xs sm:text-sm text-red-400"
                  >
                    {errors.identifier}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/80"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-[100%] px-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#2BC0FF] text-sm sm:text-base"
                  placeholder="Enter your password"
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-1 text-xs sm:text-sm text-red-400"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#21BBFD] focus:ring-[#2BC0FF] border-gray-300 rounded"
                  aria-label="Remember Me"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-white/80"
                >
                  Remember Me
                </label>
              </div>
              <div className="flex justify-end">
                 <button
                  type="submit"
                  disabled={isSubmitting}
                  className='twoD-style-button-three w-[100%] flex justify-center items-center gap-1'
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <ImSpinner9 className="animate-spin mr-2" />
                      Submitting...
                    </span>

                  ) : (
                    'Log In'
                  )}
                </button>

              </div>
            </form>
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-white/80">
                Don't have an account?{' '}
                <a href="#" className="text-white hover:underline">
                  Sign up
                </a>
              </p>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-center space-x-4">
              <button
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Login with Google"
              >
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              <button
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Login with another service"
              >
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M8.41,16.59L7,15.17l4-4,4,4l-1.41,1.41L12,14.83L8.41,16.59z M15.59,9.41L17,8l-4-4l-4,4l1.41,1.41L12,7.83L15.59,9.41z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;