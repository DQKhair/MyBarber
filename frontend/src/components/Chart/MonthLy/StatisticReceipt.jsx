import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "Jun",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Jul",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Aug",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Sep",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Oct",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Nov",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "Dec",
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
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
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
