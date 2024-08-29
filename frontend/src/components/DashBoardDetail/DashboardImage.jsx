import React from "react";

const DashboardImage = () => {
  return (
    <>
      <div className="card-body">
        <h4 className="card-title">My photo</h4>
        <div className="d-flex">
          <div className="d-flex align-items-center me-4 text-muted font-weight-light">
            <i className="mdi mdi-account-outline icon-sm me-2"></i>
            <span>K02</span>
          </div>
          <div className="d-flex align-items-center text-muted font-weight-light">
            <i className="mdi mdi-clock icon-sm me-2"></i>
            <span>Jul 23th, 2024</span>
          </div>
        </div>
        {/* Grid Image */}
        <div className="row mt-3">
          <div className="col-6 pe-1">
            <img
              src="assets/images/dashboard/dashboardImg1.jpg"
              className="mb-2 mw-100 w-100 rounded"
              alt="img"
            />
            <img
              src="assets/images/dashboard/dashboardImg2.jpg"
              className="mw-100 w-100 rounded"
              alt="img"
            />
          </div>
          <div className="col-6 ps-1">
            <img
              src="assets/images/dashboard/dashboardImg3.jpg"
              className="mb-2 mw-100 w-100 rounded"
              alt="img"
            />
            <img
              src="assets/images/dashboard/dashboardImg4.jpg"
              className="mw-100 w-100 rounded"
              alt="img"
            />
          </div>
        </div>
        {/* Grid Image */}
        <div className="d-flex mt-5 align-items-top">
          <img
            src="assets/images/faces/faceAdmin.jpg"
            className="img-sm rounded-circle me-3"
            alt="img"
          />
          <div className="mb-0 flex-grow">
            <h5 className="me-2 mb-2">Admin Website - K02.</h5>
            <p className="mb-0 font-weight-light">This is my new project.</p>
          </div>
          <div className="ms-auto">
            <i className="mdi mdi-heart-outline text-muted"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardImage;
