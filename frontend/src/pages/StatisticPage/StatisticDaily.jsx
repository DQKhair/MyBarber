import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import {
  StatisticReceipt,
  StatisticReceiptAndMoney,
  StatisticServicesAndProducts,
} from "../../components/Chart/ChartDaily";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const StatisticDayly = () => {
  return (
    <>
      <PageHeader
        titleName={"Statistic"}
        breadcrumb={"Statistic"}
        itemBreadcrumb={"Statistic daily"}
      />
      <div className={stylesPage.main_body}>
        <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={4}>
              <StatisticReceipt />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <StatisticReceiptAndMoney />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <StatisticServicesAndProducts />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default StatisticDayly;
