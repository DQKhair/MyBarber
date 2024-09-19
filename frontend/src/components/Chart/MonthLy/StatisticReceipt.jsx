import React, { useEffect } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { Alert, Box, CircularProgress } from "@mui/material";

const chartSetting = {
  xAxis: [
    {
      label: "Total money (VNĐ)",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) =>
  `${new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)} `;

const StatisticReceipt = ({
  loading,
  error,
  receiptMoney,
  getStatisticsReceiptMoney,
}) => {
  useEffect(() => {
    const loadChart = async (dateTime) => {
      await getStatisticsReceiptMoney(dateTime);
    };
    loadChart("monthly");
  }, []);

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
      <BarChart
        dataset={receiptMoney}
        yAxis={[{ scaleType: "band", dataKey: "dateTime" }]}
        series={[
          { dataKey: "data", label: "Statistic Receipt", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </>
  );
};

export default StatisticReceipt;
