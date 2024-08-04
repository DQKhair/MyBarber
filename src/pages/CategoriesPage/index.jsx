import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { CategoriesTable } from "../../components/TableList";

const CategoriesPage = () => {
  const titleName = "Categories management";
  const breadcrumb = "Categories";
  const itemBreadcrumb = "list categories";

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <CategoriesTable />
      </div>
    </>
  );
};

export default CategoriesPage;
