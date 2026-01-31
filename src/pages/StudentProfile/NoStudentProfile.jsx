

import React from "react";
import images from "../../constant/images";
import { PlusCircle, Upload } from "lucide-react";

function NoStudentProfile() {
  return (
    <div className="flex flex-col justify-center  items-center bg-white dark:bg-cardBgDark rounded-b-xl shadow-md p-6 h-[80vh] text-center transition-all duration-300">

      {/* Heading */}
      <h2 className="text-xl md:text-3xl font-semibold mt-10 text-gray-800 dark:text-white mb-3">
        It’s time to create your first student
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-lg mb-6 leading-relaxed">
        You currently don’t have any student added. Start by creating a new student or import existing ones to manage your organization efficiently.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <button className="twoD-style-button-three  w-fit flex  items-center gap-1">
          <PlusCircle className="w-5 h-5" />
          New Student
        </button>

        <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-5 py-2 rounded-lg transition">
          <Upload className="w-5 h-5" />
          Import Students
        </button>
      </div>

      {/* Illustration / Logo */}
       <div className="flex flex-col justify-center items-center">
             <p className="text-sm">Life cycle of student</p>
             <img
               src={images.nodata2}
               alt="No Student"
               className="w-[80%] md:w-[60%] object-contain opacity-90"
             />
           </div>
    </div>
  );
}

export default NoStudentProfile;
