

import React from "react";
import images from "../../constant/images";
import { PlusCircle, Upload } from "lucide-react";

function NoMedium() {
  return (
    <div className="flex flex-col justify-center  items-center bg-white dark:bg-cardBgDark rounded-b-xl shadow-md p-6 md:min-h-[70vh] min-h-[70vh] text-center transition-all duration-300">
       <div className="flex flex-col justify-center items-center">
             <img
               src={images.noData3}
               alt="No Admin"
               className="w-[50%] md:w-[50%] object-contain opacity-90"
             />
             <p className="text-sm text-gray-700">No Medium Found.</p>

           </div>
    </div>
  );
}

export default NoMedium;
