import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ServiceById } from "../../components/ItemDetail";
import useItemCategories from "../../hook/useItemCategories";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const ServiceDetail = ({ mainPage }) => {
  const { loading, error, getItemCategoryByIdHook } = useItemCategories();
  const { id } = useParams();
  const [service, setService] = useState();

  useEffect(() => {
    const getService = async () => {
      const serviceData = await getItemCategoryByIdHook(id);
      setService(serviceData);
    };
    getService();
  }, [id]);
  
  const titleName = "Information about service";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Service details`;

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
        <ServiceById service={service} />
      </div>
    </>
  );
};

export default ServiceDetail;
