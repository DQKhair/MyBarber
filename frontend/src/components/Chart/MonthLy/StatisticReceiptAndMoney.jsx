import React from "react";

import { LineChart } from "@mui/x-charts/LineChart";

const receiptData = [40, 30, 20, 27, 18, 23, 34,40, 30, 20, 27, 18];
const totalMoneyData = [2400, 1398, 9800, 3908, 4800, 3800, 4300,2400, 1398, 9800, 3908, 4800];
const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

const StatisticReceiptAndMoney = () => {
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
