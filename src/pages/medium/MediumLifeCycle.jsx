

import React from "react";
import images from "../../constant/images";
import { PlusCircle, Upload } from "lucide-react";

function MediumLifeCycle() {
  return (
    <div className="flex flex-col justify-center  items-center bg-white dark:bg-cardBgDark  min:h-[80vh] text-center transition-all duration-300">
       <div className="flex flex-col justify-center items-center">
             {/* <p className="text-sm">Life cycle of medium</p> */}
             <img
               src={images.nodata2}
               alt="No Admin"
               className="w-[100%]  md:w-[90%] object-contain  opacity-90"
             />
           </div>
    </div>
  );
}

export default MediumLifeCycle;
