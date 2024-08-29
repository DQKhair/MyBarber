import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({titleName,breadcrumb,itemBreadcrumb }) => {
  return (
    <div className="page-header">
      <h3 className="page-title"> {titleName} </h3>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/${breadcrumb}`}>{breadcrumb}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {itemBreadcrumb}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
