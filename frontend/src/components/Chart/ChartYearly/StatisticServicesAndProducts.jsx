import React from "react";

import { PieChart } from "@mui/x-charts/PieChart";

const StatisticServicesAndProducts = () => {
  return (
    <>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Services" },
              { id: 1, value: 15, label: "Products" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

export default StatisticServicesAndProducts;
