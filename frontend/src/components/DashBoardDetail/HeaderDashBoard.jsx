import React from "react";
import { QuantityEmployee,QuantityCustomer,EmployeesOnline} from "./index"

const HeaderDashBoard = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src="assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Quantity employee{" "}
                <i className="mdi mdi-chart-line mdi-24px float-right"></i>
              </h4>
              <QuantityEmployee />
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img
                src="assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Quantity customer{" "}
                <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
              </h4>
              <QuantityCustomer />
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src="assets/images/dashboard/circle.svg"
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Employees Online{" "}
                <i className="mdi mdi-diamond mdi-24px float-right"></i>
              </h4>
              <EmployeesOnline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderDashBoard;
