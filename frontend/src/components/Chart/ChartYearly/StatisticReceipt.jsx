import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    year: "2023",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    year: "2024",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    year: "2025",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    year: "2026",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    year: "2027",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    year: "2028",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    year: "2029",
  },
];

const chartSetting = {
  xAxis: [
    {
      label: "Total money (VNĐ)",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value} VNĐ`;

const StatisticReceipt = () => {
  return (
    <>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "year" }]}
        series={[
          { dataKey: "seoul", label: "Statistic Receipt", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </>
  );
};

export default StatisticReceipt;
