import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ReportedComplaints from "./components/ReportedComplaints";
import "./index.css";
import StudentDashboard from "./pages/StudentDashboard";
import StudentLogin from "./pages/StudentLogin";
import HomePage from "./pages/HomePage";
import OfficialDashboard from "./pages/OfficialDashboard";
import OfficialLogin from "./pages/OfficialLogin";
import ReportComplaint from "./pages/ReportComplaint";
import Footer from "./components/footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <HomePage />
    <Footer/>
    </>,
  },
  {
    path: "/student-login",
    element: <>
    <StudentLogin />
    <Footer/>
    </>,
  },
  {
    path: "/official-login",
    element: <>
    <OfficialLogin />
    <Footer/>
    </>,
  },
  {
    path: "/student-dashboard",
    element: 
    <>
    <StudentDashboard />
    <Footer/>
    </>,
  },
  {
    path: "/official-dashboard",
    element: <>
    <OfficialDashboard />
    <Footer/>
    </>,
  },
  {
    path: "/report",
    element: <>
    <ReportComplaint />
    <Footer/>
    </>,
  },
  {
    path: "/track-complaints",
    element: (
      <>
        <Navbar />
        <ReportedComplaints />
        <Footer/>
      </>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

