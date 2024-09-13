import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { CustomerById } from "../../components/ItemDetail";
import useCustomers from "../../hook/useCustomers";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const CustomerDetail = ({ mainPage }) => {
  const { loading,error, getCustomerByIdHook } = useCustomers();
  const { id } = useParams();
  const [customer,setCustomer] = useState();

  useEffect(() => {
    const getCustomer = async () => {

     const customerData = await getCustomerByIdHook(id)
      setCustomer(customerData);
    }
    getCustomer();
  },[id]);

  const titleName = "Information about customer";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Customer details`;

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
        <CustomerById customer={customer} />
      </div>
    </>
  );
};

export default CustomerDetail;
