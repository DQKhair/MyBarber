import React from "react";
import { useParams } from "react-router-dom";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ProductById } from "../../components/ItemDetail";
import useItemCategories from "../../hook/useItemCategories";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";


const ProductDetail = ({ mainPage }) => {
  const { loading, error, getItemCategoryById } = useItemCategories();
  const { id } = useParams();

  const product = getItemCategoryById(id);

  const titleName = "Information about product";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Product details`;

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
        <ProductById product={product} />
      </div>
    </>
  );
};

export default ProductDetail;
