import React, { useEffect } from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import { Alert, Box, CircularProgress } from "@mui/material";

const StatisticServicesAndProducts = ({
  loading,
  error,
  quantityProAndSer,
  getStatisticsQuantityProductsAndServices,
}) => {
  useEffect(() => {
    const loadChart = async (dateTime) => {
      await getStatisticsQuantityProductsAndServices(dateTime);
    };
    loadChart("daily");
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
      <PieChart
        series={[
          {
            data: quantityProAndSer,
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

export default StatisticServicesAndProducts;
