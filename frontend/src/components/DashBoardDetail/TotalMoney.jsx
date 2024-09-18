import React, { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import useReceipts from "../../hook/useReceipts";

const TotalMoney = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const { loading, error, receipts } = useReceipts();
  
  useEffect(() => {
    if (receipts !== null) {
      const listReceiptsByMonthAndYear = receipts.filter((e) => {
        const receiptDate = new Date(e.receiptDate);
        const currentDate = new Date();
        return (
          receiptDate.getMonth() === currentDate.getMonth() &&
          receiptDate.getFullYear() === currentDate.getFullYear()
        );
      });
      const totalMoneyReceipt = listReceiptsByMonthAndYear.reduce(
        (sum, receipt) => sum + receipt.totalPrice,
        0
      );
      setTotalMoney(totalMoneyReceipt);
    }
  }, [receipts]);

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
      <h2 className="mb-5">
        {" "}
        {`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(totalMoney)}`}
      </h2>
      <h6 className="card-text">Monthly</h6>
    </>
  );
};

export default TotalMoney;
