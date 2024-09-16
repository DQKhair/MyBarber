import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ReceiptById } from "../../components/ItemDetail";
import useReceipts from "../../hook/useReceipts";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const ReceiptDetail = ({ mainPage }) => {
  const { loading, error, getReceiptByIdHook } = useReceipts();
  const { id } = useParams();
  const [receipt,setReceipt] = useState();

  const titleName = "Information about receipt";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Receipt details`;

  useEffect(() => {
    const getReceipt = async () => {
      const receiptData = await getReceiptByIdHook(id);
      setReceipt(receiptData);
    }
    getReceipt();
  },[id]);
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
        <ReceiptById receipt={receipt} />
      </div>
    </>
  );
};

export default ReceiptDetail;
