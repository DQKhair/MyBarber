import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { CategoriesTable } from "../../components/TableList";
import DecodeToken from "../../utils/DecodeToken";

const CategoriesPage = () => {
  const titleName = "Categories management";
  const breadcrumb = "Categories";
  const itemBreadcrumb = "list categories";

  const userInfo = DecodeToken(localStorage.getItem("accessToken"));

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <CategoriesTable userInfo={userInfo} />
      </div>
    </>
  );
};

export default CategoriesPage;
