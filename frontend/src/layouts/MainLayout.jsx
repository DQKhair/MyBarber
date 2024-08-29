import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const MainLayout = () => (
  <div className="container-scroller">
    {/* Navbar top */}
    <Navbar />
    {/* end navbar */}
    {/* body main */}
    <div className="container-fluid page-body-wrapper">
      {/* sidebar */}
      <SideBar />
      {/* end sidebar */}
      <div className="main-panel">
        <div className="content-wrapper">
          <div>
            <Outlet />
          </div>
        </div>
        {/* footer */}
        <Footer />
        {/* end footer */}
      </div>
    </div>
    {/* end body main */}
  </div>
);

export default MainLayout;
