import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ProductsTable } from "../../components/TableList";

const ProductsPage = () => {
  const titleName = "Products management";
  const breadcrumb = "Products management";
  const itemBreadcrumb = "list Products";
  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsPage;
