import React from "react";
import { useParams } from "react-router-dom";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { EmployeeById } from "../../components/ItemDetail";
import useEmployees from "../../hook/useEmployees";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const EmployeeDetail = ({ mainPage }) => {
  const { loading, error, getEmployeeById } = useEmployees();
  const { id } = useParams();

  const employee = getEmployeeById(id);

  const titleName = "Information about employee";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Employee details`;

 //load page

 if (loading)
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress /> Loading...
        </Box>
      </div>
    );

  if (error)
    return (
      <div>
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <EmployeeById employee={employee} />
      </div>
    </>
  );
};

export default EmployeeDetail;
