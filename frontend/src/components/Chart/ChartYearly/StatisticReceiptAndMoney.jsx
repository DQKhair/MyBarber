import React, { useEffect, useState } from "react";

import { LineChart } from "@mui/x-charts/LineChart";
import { Alert, Box, CircularProgress } from "@mui/material";

const StatisticReceiptAndMoney = ({
  loading,
  error,
  quantityReceiptAndTotalMoney,
  getStatisticsQuantityReceiptAndTotalMoney,
}) => {
  const [receiptData, setReceiptData] = useState([]);
  const [totalMoneyData, setTotalMoneyData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [loadChart, setLoadChart] = useState(true);

  useEffect(() => {
    const loadChart = async (dateTime) => {
      const result = await getStatisticsQuantityReceiptAndTotalMoney(dateTime);
      if (result) {
        setReceiptData(result.receiptData);
        setTotalMoneyData(result.totalMoneyData);
        setXLabels(result.labels);
        setLoadChart(false);
      }
    };
    loadChart("yearly");
  }, []);

  //load page
  if (loading === true || loadChart === true)
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
      <LineChart
        width={500}
        height={300}
        series={[
          { data: receiptData, label: "Receipt", yAxisId: "leftAxisId" },
          {
            data: totalMoneyData,
            label: "Total money",
            yAxisId: "rightAxisId",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
        rightAxis="rightAxisId"
      />
    </>
  );
};

export default StatisticReceiptAndMoney;
