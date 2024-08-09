import React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from '@mui/material/Typography';

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    day: "Mo",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    day: "Tu",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    day: "We",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    day: "Th",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    day: "Fr",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    day: "Sa",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    day: "Su",
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

// line chart
const receiptData = [40, 30, 20, 27, 18, 23, 34];
const totalMoneyData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Mon", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const Chart = () => {
  return (
    <>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "day" }]}
        series={[
          { dataKey: "seoul", label: "Statistic Receipt", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />

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

export default Chart;
