import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ServicesTable } from "../../components/TableList";
import DecodeToken from "../../utils/DecodeToken";

const ServicesPage = () => {
  const titleName = "Services management";
  const breadcrumb = "Services management";
  const itemBreadcrumb = "list Services";

  const userInfo = DecodeToken(localStorage.getItem("accessToken"));
  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
       <ServicesTable userInfo={userInfo} />
      </div>
    </>
  );
};

export default ServicesPage;
