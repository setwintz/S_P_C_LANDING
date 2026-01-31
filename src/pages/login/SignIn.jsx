
import React from 'react';
import "./SignIn.css";

import images from '../../constant/images';

function SignIn() {
  return (

    // 1
    <>
      {/* Top Logo */}
      <header className="fixed top-0 left-0 w-[100%] z-[10000] px-6 py-4">
        <img
          src={images.setwintzLight} // replace with your actual logo path
          alt="Company Logo"
          className="h-8 sm:h-20"
        />
      </header>

      <div className="grid-wrapper">
        <div className="grid-background"></div>
        {form()}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-[100%] text-center py-4 text-xs sm:text-sm text-gray-500 z-[10000]">
        © 2026, Setwintz Pvt. Ltd. All Rights Reserved.
      </footer>
    </>

    // 2
    // <>
    //   <div class="dark-circuit-wrapper">
    //     <div class="dark-circuit-background"></div>
    //     {form()}
    //   </div>
    // </>

    // 3
    // <>
    //   <div class="circuit-wrapper">
    //     <div class="circuit-background"></div>
    //     {form()}
    //   </div>
    // </>
  );
}

export default SignIn;

function form() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="w-[100%] max-w-md bg-white rounded-lg shadow-lg p-8 md:p-10 z-[9999]">
        
        {/* Title & Subtitle */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            to continue with Setwintz Acad
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Email / Mobile Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email or Mobile Number
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className="input-base-static"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="input-base-static"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary/70 transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[100%] py-3 px-4 bg-primary hover:bg-primary/80 
                       text-white font-medium rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       transition duration-150 shadow-sm"
          >
            Sign In
          </button>
        </form>

        {/* Alternative sign in */}
        <div className="mt-6 text-center text-sm text-gray-600">
          or{' '}
          <a
            href="#"
            className="font-medium text-primary hover:text-primary/70 transition"
          >
            Sign in another way
          </a>
        </div>
      </div>
    </div>
  );
}
