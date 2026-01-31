import { Spinner } from "@material-tailwind/react";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className=" mt-1 font-medium  text-sm flex justify-center items-center flex-col py-5">
        
        <LoadingSpinner />
        
      </span>
    </div>
  );
};

export default Loading;
