import React from "react";
import { Link } from "react-router-dom";
import useFunctions from "../../hook/useFunctions";

const ItemFunction = () =>{
  const { functions } = useFunctions();

    return (
        <>
            {functions.map((item) => {
          if (item.functionName === "Accounts Management") {
            return (
              <li className="nav-item" key={item.function_ID}>
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-title">{item.functionName}</span>
                  <i className="menu-arrow"></i>
                  <i className={`mdi ${item.functionIcon} menu-icon`}></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link className="nav-link" to="/customers">
                        Customers management
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link className="nav-link" to="/employees">
                        Employees management
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            );
          } else if (item.functionName === "Statistic Management") {
            return (
              <li className="nav-item" key={item.function_ID}>
                <Link
                  className="nav-link"
                  data-bs-toggle="collapse"
                  to="#general-pages"
                  aria-expanded="false"
                  aria-controls="general-pages"
                >
                  <span className="menu-title">{item.functionName}</span>
                  <i className="menu-arrow"></i>
                  <i className={`mdi ${item.functionIcon} menu-icon`}></i>
                </Link>
                <div className="collapse" id="general-pages">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link className="nav-link" to="/statisticDaily">
                        {" "}
                        Daily{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link className="nav-link" to="/statisticMonthly">
                        {" "}
                        Monthly{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link className="nav-link" to="/statisticYearly">
                        {" "}
                        Yearly{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            );
          } else {
            return (
              <li className="nav-item" key={item.function_ID}>
                <Link className="nav-link" to={`${item.functionRoute}`}>
                  <span className="menu-title">{item.functionName}</span>
                  <i className={`mdi ${item.functionIcon} menu-icon`}></i>
                </Link>
              </li>
            );
          }
        })}
        </>
    );
}

export default ItemFunction;