import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import {CustomersTable} from "../../components/TableList/index";
import DecodeToken from "../../utils/DecodeToken";

const CustomersPage = () => {
  const titleName = "Customers management";
  const breadcrumb = "Customers";
  const itemBreadcrumb = "list Customers";

  const userInfo = DecodeToken(localStorage.getItem("accessToken"));

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      
      <div className={`${stylesPage.main_body} row`}>
        <CustomersTable userInfo={userInfo} />
      </div>
    </>
  );
};

export default CustomersPage;
