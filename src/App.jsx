import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";

import AuthLayout from "./layout/AuthLayout";



// before login pages
const Login = lazy(() => import("../src/pages/login/Login"));
const SignUp = lazy(() => import("../src/pages/signup/SignUp"));
const LandingLayout = lazy(() => import("../src/components/Home"));
const Section = lazy(() => import("../src/pages/Landing/Section"))
const Section2 = lazy(() => import("../src/pages/Landing/Section2"));
const Section2A = lazy(() => import("../src/pages/Landing/Section2A"));
const SchoolErpSolution = lazy(() => import("../src/pages/Landing/SchoolErpSolution"))


const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("../src/pages/home/Home"));
const CreateCustomField = lazy(() => import("../src/pages/demo/customField/CreateCustomField"));
const CreateCompany = lazy(() => import("../src/pages/company/CreateCompany"));
const CreateClients = lazy(() => import("../src/pages/clients/CreateClients"));
const ListClients = lazy(() => import("../src/pages/clients/ListClients"));

const Dashboard = lazy(() => import("../src/pages/dashboard/Dashboard"));

const ListOrganization = lazy(() => import("../src/pages/Organization/ListOrganization"));
const CreateOrganization = lazy(() => import("../src/pages/Organization/CreateOrganization"));



const NotFound = lazy(() => import("../src/pages/404NotFound/NotFound"));


const ListCompany = lazy(() => import("../src/pages/company/ListCompany"));
const ListSubscriptionPlan = lazy(() => import("../src/pages/subscriptionPlan/ListSubscriptionPlan"));
const CreateSubscriptionPlan = lazy(() => import("../src/pages/subscriptionPlan/CreateSubscriptionPlan"));


// new start
const Setting = lazy(() => import("../src/pages/setting/Setting"));
const StudentCustomFieldSettings = lazy(() => import("../src/pages/setting/StudentCustomFieldSettings"));


const AcademicYearSetting = lazy(() => import("../src/pages/setting/AcademicYearSetting"));
const OrganizationDetail = lazy(() => import("../src/pages/organizationDetail/OrganizationDetail"));
const Medium = lazy(() => import("../src/pages/medium/Medium"));
const Unit = lazy(() => import("../src/pages/unit/Unit"));
const CreateUnit = lazy(() => import("../src/pages/unit/CreateUnit"));
const CreateAdmin = lazy(() => import("../src/pages/admin/CreateAdmin"));
const Admin = lazy(() => import("../src/pages/admin/Admin"));
const Years = lazy(() => import("../src/pages/years/Years"));
const AcademicShiftType = lazy(() => import("../src/pages/academicShiftType/academicShiftType"));
const Classes = lazy(() => import("../src/pages/class/Class"));
const Curriculum = lazy(() => import("../src/pages/curriculumn/Curriculum"));
const AcademicYear = lazy(() => import("../src/pages/academicYear/AcademicYear"));
const CreateAcademicYear = lazy(() => import("../src/pages/academicYear/CreateAcademicYear"));


// student information
const StudentProfile = lazy(() => import("../src/pages/StudentProfile/StudentProfile"));
const CreateStudentProfile = lazy(() => import("../src/pages/StudentProfile/CreateStudentProfile"));
const StudentOverview = lazy(() => import("../src/pages/StudentProfile/StudentOverview"));


// time table
const ClassTimetable = lazy(() => import("../src/pages/timeTable/ClassTimeTable"));
const ClassTimetable2 = lazy(() => import("../src/pages/timeTable/ClassTimeTable2"));


// organizations
const ListOrganizations = lazy(() => import("../src/pages/organizations/ListOrganizations"));







// import Home from "./pages/home/Home";
import useDarkmode from "./Hooks/useDarkMode";
import { useSelector } from "react-redux";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Example from "./components/Example";
import SignIn from "./pages/login/SignIn";
import Login2 from "./pages/login/Login2";

export default function App() {

  // const { isAuth: isLoggedIn } = useSelector((state) => state?.authCustomerSlice);

  const hasRefereshToekn = localStorage.getItem("SAAS_ERP1_CLIENT_TACCESS_TOKEN")
  const [isDark] = useDarkmode();
  const storedData = useSelector((state) => state);

  // console.log("storedData", storedData);

  useEffect(() => {

    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }, []);


  return (
    <main
      className={`${isDark ? "bg-fullBackgroungDark text-white" : "bg-fullBackgroungLight"}`}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <Routes>
        <Route path="/" element={<AuthLayout />}>

          <Route element={<PublicRoute isLogin={hasRefereshToekn ? true : false} />} >
            <Route path="/" element={<Login2 />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/landing" element={<LandingLayout />} >

              <Route index element={<Section />} />
              <Route path="schoolerp" element={<Section2 />} >
                <Route index element={<Section2A />} />
                <Route path="solution" element={<SchoolErpSolution />} />


              </Route>

            </Route>

          </Route>

          <Route element={<PrivateRoute isLogin={hasRefereshToekn ? true : false} />} >



            {/* organizations */}

            <Route path="organizations" element={<ListOrganizations />} />
            <Route path="example" element={<Example />} />
            {/* <Route path="sss" element={<Login2 />} /> */}






            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="list/clients" element={<ListClients />} />
              <Route path="create/clients" element={<CreateClients />} />
              <Route path="list/organization" element={<ListOrganization />} />
              <Route path="create/organization" element={<CreateOrganization />} />
              <Route path="list/unit" element={<Unit />} />
              <Route path="create/unit" element={<CreateUnit />} />
              <Route path="list/admin" element={<Admin />} />
              <Route path="create/admin" element={<CreateAdmin />} />


              {/* student Info */}
              <Route path="list/profile" element={<StudentProfile />} />
              <Route path="create/student/profile" element={<CreateStudentProfile />} />
              <Route path="student/overview" element={<StudentOverview />} />
              <Route path="class/timetable" element={<ClassTimetable />} />
              <Route path="class/timetable/2" element={<ClassTimetable2 />} />




              {/* new start */}

              <Route path="organization" element={<OrganizationDetail />} />
              <Route path="system/setting" element={<Setting />} />
              <Route path="settings/custom/field/student/create" element={<StudentCustomFieldSettings />} />
              <Route path="system/setting/academic/year" element={<AcademicYearSetting />} />
              <Route path="settings/academic/medium" element={<Medium />} />
              <Route path="settings/academic/years" element={<Years />} />
              <Route path="settings/academic/shift-type" element={<AcademicShiftType />} />
              <Route path="settings/class" element={<Classes />} />
              <Route path="settings/academic/curriculum" element={<Curriculum />} />
              <Route path="settings/academic/year" element={<AcademicYear />} />
              <Route path="settings/academic/year/create" element={<CreateAcademicYear />} />



              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>





        </Route>
      </Routes>
    </main>
  );
}
