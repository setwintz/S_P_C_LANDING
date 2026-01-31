
import { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Sign-up successful!'); // Replace with actual API call
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient-bright-blue2 dark:bg-fullBackgroungDark ">
      <div className="w-[100%]   backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Image Section - Hidden on small screens */}
        <div className="hidden md:block md:w-1/2 relative">
          <div
            className="w-[100%] h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(33,187,253,0.7)] to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">Setwintz Private Ltd</h2>
              <p className="text-sm">Experience a world of connection and creativity</p>
            </div>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-[100%] md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-[100%] max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Setwintz Private Ltd</h1>
              <p className="text-white/80">Create your account</p>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-[100%] px-4 py-2 bg-white/50 border border-custo rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />

                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-[100%] px-4 py-2 bg-white/50 border border-custo rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-[100%] px-4 py-2 bg-white/50 border border-custo rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>
              <div className="flex items-center">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[rgb(138,167,180)] rounded"
                />
                <label htmlFor="termsAccepted" className="ml-2 text-sm text-white/80">
                  I agree to the <a href="#" className="text-white hover:underline">Terms & Conditions</a>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-red-400">{errors.termsAccepted}</p>}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='twoD-style-button-three w-[100%]'              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Already have an account? <a href="#" className="text-white hover:underline">Log in</a>
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
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

export default SignUpForm;