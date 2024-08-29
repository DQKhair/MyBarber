import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ButtonPage/Button";
import ItemFunction from "./ItemFunction";
import { ColorTextPage } from "../../constants/constants";

import Avatar from "@mui/material/Avatar";

const SideBar = () => {
  const navigate = useNavigate();
  const userName = "Khải";
  const charAvata = userName[0].toUpperCase();

  const handleAddReceipt = (e) => {
    navigate("/receipts/add_new_receipt");
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <Link to="/" className="nav-link">
            <div className="nav-profile-image">
              <Avatar sx={{ bgcolor: ColorTextPage }}>{charAvata}</Avatar>
              <span className="login-status online"></span>
              {/* <!--change to offline or busy as needed--> */}
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">K02</span>
              <span className="text-secondary text-small">Administrator</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </Link>
        </li>
        <ItemFunction />
        <li className="nav-item sidebar-actions">
          <span className="nav-link">
            <div className="border-bottom">
              <h6 className="font-weight-normal mb-3">Receipt</h6>
            </div>
            <Button
              nameButton={"+ New Receipt"}
              colorButton={"blue"}
              sizeButton={"md"}
              handleOnclick={handleAddReceipt}
            />
          </span>
        </li>
      </ul>
    </nav>
  );
};
export default SideBar;
