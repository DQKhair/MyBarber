import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { EmployeesTable } from "../../components/TableList";

const EmployeesPage = () => {
  const titleName = "Employees management";
  const breadcrumb = "Employees";
  const itemBreadcrumb = "List Employees";
  
  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <EmployeesTable />
      </div>
    </>
  );
};

export default EmployeesPage;
