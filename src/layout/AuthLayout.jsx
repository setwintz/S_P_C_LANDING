import React, {  Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import Loading from "@/components/Loading";
import Loading from "../components/Loading/Loading";
import LoadingTwo from "../components/Loading/LoadingTwo";



const AuthLayout = () => {

  return (
    <>
      <Suspense fallback={<LoadingTwo />}>
        {<Outlet />}
      </Suspense>
    </>
  );
};

export default AuthLayout;
