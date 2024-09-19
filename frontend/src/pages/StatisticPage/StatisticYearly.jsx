import React, { useEffect } from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import {
  StatisticReceipt,
  StatisticReceiptAndMoney,
  StatisticServicesAndProducts,
} from "../../components/Chart/ChartYearly";
import useStatistics from "../../hook/useStatistics";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const StatisticYearly = () => {
  const {
    loading,
    error,
    receiptMoney,
    quantityProAndSer,
    quantityReceiptAndTotalMoney,
    getStatisticsReceiptMoneyHook,
    getStatisticsQuantityProductsAndServicesHook,
    getStatisticsQuantityReceiptAndTotalMoneyHook,
  } = useStatistics();

  // alert
  useEffect(() => {
    if (error != null) {
      alert(error.response.data.message);
    }
  }, [error]);
  return (
    <>
      <PageHeader
        titleName={"Statistic"}
        breadcrumb={"Statistic"}
        itemBreadcrumb={"statistic yearly"}
      />
      <div className={stylesPage.main_body}>
        <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={4}>
              <StatisticReceipt
                loading={loading}
                error={error}
                receiptMoney={receiptMoney}
                getStatisticsReceiptMoney={getStatisticsReceiptMoneyHook}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <StatisticReceiptAndMoney
                loading={loading}
                error={error}
                quantityReceiptAndTotalMoney={quantityReceiptAndTotalMoney}
                getStatisticsQuantityReceiptAndTotalMoney={
                  getStatisticsQuantityReceiptAndTotalMoneyHook
                }
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <StatisticServicesAndProducts
                loading={loading}
                error={error}
                quantityProAndSer={quantityProAndSer}
                getStatisticsQuantityProductsAndServices={
                  getStatisticsQuantityProductsAndServicesHook
                }
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default StatisticYearly;
