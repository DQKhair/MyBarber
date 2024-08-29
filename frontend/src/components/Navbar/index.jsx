import React from "react";
import { Link } from "react-router-dom";
import { ColorTextPage } from "../../constants/constants";

import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const userName = "Khải";
  const charAvata = userName[0].toUpperCase();

  return (
    <>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/">
            <h1>My Barber</h1>
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input
                  type="text"
                  className="form-control bg-transparent border-0"
                  placeholder="Search projects"
                />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="profileDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="nav-profile-img">
                  <Avatar sx={{ bgcolor: ColorTextPage }}>{charAvata}</Avatar>
                  <span className="availability-status online" style={{bottom: "-2px"}}></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">K02</p>
                </div>
              </a>
              <div
                className="dropdown-menu navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <Link className="dropdown-item" to="/info">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity
                  Log{" "}
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/login">
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout{" "}
                </Link>
              </div>
            </li>
            <li className="nav-item nav-logout d-none d-lg-block">
              <Link className="nav-link" to="/login">
                <i className="mdi mdi-power"></i>
              </Link>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-format-line-spacing"></i>
              </a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;