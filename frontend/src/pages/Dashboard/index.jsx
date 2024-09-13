import React from "react";
import {
  HeaderDashBoard,
  DashboardImage,
} from "../../components/DashBoardDetail";
import {
  StatisticReceipt,
  StatisticServicesAndProducts,
} from "../../components/Chart/MonthLy";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const accessToken = localStorage.getItem("accessToken")
  const navigate = useNavigate()
  if (accessToken === null || accessToken === "null")
  {
    navigate("/login");
  }
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-info text-white me-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Dashboard
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span></span>Overview{" "}
              <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
            </li>
          </ul>
        </nav>
      </div>
      {/* Header dashboard */}
      <HeaderDashBoard />
      {/* End header dashboard */}
      {/* Chart dashboard */}
      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card" style={{ overflowX: "auto" }}>
            <div className="card-body" style={{ margin: "auto" }}>
              <div className="clearfix text-center">
                <h4 className="card-title float-left">
                  Total amount per month
                </h4>
              </div>
              <StatisticReceipt />
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card" style={{ overflowX: "auto" }}>
            <div className="card-body text-center" style={{ margin: "auto" }}>
              <h4 className="card-title my-5">
                Number of products and services this month
              </h4>
              <StatisticServicesAndProducts />
            </div>
          </div>
        </div>
      </div>
      {/* End Chart dashboard */}
      {/* Image app */}
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <DashboardImage />
          </div>
        </div>
      </div>
      {/* End image app */}
      {/* bottom dashboard */}
      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Project Status</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> # </th>
                      <th> Name </th>
                      <th> Due Date </th>
                      <th> Progress </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 1 </td>
                      <td> Herman Beck </td>
                      <td> May 15, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-success"
                            role="progressbar"
                            style={{ width: "25%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> 2 </td>
                      <td> Messsy Adam </td>
                      <td> Jul 01, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-danger"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> 3 </td>
                      <td> John Richards </td>
                      <td> Apr 12, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-warning"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow="90"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> 4 </td>
                      <td> Peter Meggik </td>
                      <td> May 15, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-primary"
                            role="progressbar"
                            style={{ width: "50%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> 5 </td>
                      <td> Edward </td>
                      <td> May 03, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-danger"
                            role="progressbar"
                            style={{ width: "35%" }}
                            aria-valuenow="35"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td> 5 </td>
                      <td> Ronald </td>
                      <td> Jun 05, 2024 </td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-gradient-info"
                            role="progressbar"
                            style={{ width: "65%" }}
                            aria-valuenow="65"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white">Todo</h4>
              <div className="add-items d-flex">
                <input
                  type="text"
                  className="form-control todo-list-input"
                  placeholder="What do you need to do today?"
                />
                <button
                  className="add btn btn-gradient-primary font-weight-bold todo-list-add-btn"
                  id="add-task"
                >
                  Add
                </button>
              </div>
              <div className="list-wrapper">
                <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                  <li>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Meeting
                        with Alisa{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li className="completed">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultChecked
                        />{" "}
                        Call John{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Create
                        invoice{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Print
                        Statements{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li className="completed">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="checkbox"
                          type="checkbox"
                          defaultChecked
                        />{" "}
                        Prepare for presentation{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                  <li>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Pick up
                        kids from school{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End bottom dashboard */}
    </>
  );
};
export default Dashboard;
