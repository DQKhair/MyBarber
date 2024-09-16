import React from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ColorTextPage } from "../../constants/constants";

const ReceiptById = ({ receipt }) => {
  if (!receipt) {
    return <div></div>;
  }

  return (
    <>
      <Container maxWidth="sm">
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          Receipt Detail
        </h3>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={6}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Receipt id"
                defaultValue={receipt.receipt_ID}
                id="receipt_ID"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={6}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Customer id"
                defaultValue={receipt.customer_ID}
                id="customer_ID"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Customer name"
                defaultValue={receipt.customerName}
                id="customerName"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Total Price"
                defaultValue={receipt.totalPrice}
                id="totalPrice"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Total Quantity "
                defaultValue={receipt.totalQuantity}
                id="totalQuantity"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Status"
                defaultValue={receipt.statusName}
                id="statusName"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Method"
                defaultValue={receipt.methodName}
                id="methodName"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <TextField
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                type="text"
                label="Receipt Date"
                defaultValue={receipt.receiptDate}
                id="receiptDate"
                sx={{ gridColumn: "span 2" }}
              />
            </Grid>
          </Grid>
        </Box>
        <div
          style={{
            width: "100%",
            backgroundColor: "#000",
            height: "2px",
            margin: "2% 0 2% 0",
          }}
        ></div>
        <h3 style={{ color: ColorTextPage }} className="text-center">
          Order
        </h3>
        <div
          style={{
            width: "100%",
            backgroundColor: "#000",
            height: "2px",
            margin: "2% 0 2% 0",
          }}
        ></div>
        <Box sx={{ flexGrow: 1 }}>
          {receipt.listReceiptDetailsVM.map((rd) => (
            <Grid
              key={rd.receiptDetail_ID}
              container
              sx={{ margin: "20px 0 20px 0" }}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Name"
                  defaultValue={rd.productName}
                  id="productName"
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>

              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Quantity"
                  defaultValue={rd.productQuantity}
                  id="productQuantity"
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>

              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Price"
                  defaultValue={new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(rd.productPrice)}
                  id="productPrice"
                  sx={{ gridColumn: "span 2" }}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default ReceiptById;
