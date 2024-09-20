import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ProductsTable } from "../../components/TableList";
import DecodeToken from "../../utils/DecodeToken";

const ProductsPage = () => {
  const titleName = "Products management";
  const breadcrumb = "Products management";
  const itemBreadcrumb = "list Products";

  const userInfo = DecodeToken(localStorage.getItem("accessToken"));
  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <ProductsTable userInfo={userInfo} />
      </div>
    </>
  );
};

export default ProductsPage;
