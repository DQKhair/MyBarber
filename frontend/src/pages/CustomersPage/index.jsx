import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import {CustomersTable} from "../../components/TableList/index";

const CustomersPage = () => {
  const titleName = "Customers management";
  const breadcrumb = "Customers";
  const itemBreadcrumb = "list Customers";

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      
      <div className={`${stylesPage.main_body} row`}>
        <CustomersTable />
      </div>
    </>
  );
};

export default CustomersPage;
