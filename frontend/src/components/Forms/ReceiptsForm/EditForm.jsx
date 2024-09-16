import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorButtonForm, ColorTextPage } from "../../../constants/constants";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const EditForm = ({ receipt, openEdit, handleClose }) => {
  console.log(receipt);
  // initial values
  const initialValues = {
    receipt_ID: receipt.receipt_ID,
    totalQuantity: receipt.totalQuantity,
    totalPrice: receipt.totalPrice,
    receiptDate: receipt.receiptDate,
    customer_ID: receipt.customer_ID,
    customerName: receipt.customerName,
    statusName: receipt.statusName,
    methodName: receipt.methodName,
  };

  // schema
  const employeeSchema = yup.object({
    receipt_ID: yup
      .string()
      .required("Receipt id is required")
      .min(6, "Receipt id must be at least 6 characters")
      .max(50, "Receipt id must be at most 50 characters"),
    totalQuantity: yup.number().required("Phone number is required"),
    totalPrice: yup.number().required("Receipt address is required"),
    receiptDate: yup.date().required("Receipt email is required"),
    customer_ID: yup.string().required(),
    customerName: yup.string().required(`Receipt is active is required`),
    statusName: yup.string().required("Status is required"),
    methodName: yup.string().required("Method is required"),
  });

  const handleFormSubmit = async (values) => {
    // const result = await updateEmployee(receipt.receipt_ID, values);
    // if (result) {
    //   alert("Update successful");
    // }
    handleClose();
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={employeeSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
        }) => (
          <Dialog
            maxWidth={"md"}
            open={openEdit}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: handleSubmit,
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: ColorTextPage,
              }}
            >
              Fill in
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ margin: "20px 0px" }}>
                Modify information about receipt
              </DialogContentText>
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
                      onBlur={(e) => {
                        setFieldValue("receipt_ID", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.receipt_ID}
                      id="receipt_ID"
                      error={!!touched.receipt_ID && !!errors.receipt_ID}
                      helperText={touched.receipt_ID && errors.receipt_ID}
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
                      onBlur={(e) => {
                        setFieldValue("customer_ID", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.customer_ID}
                      id="customer_ID"
                      error={!!touched.customer_ID && !!errors.customer_ID}
                      helperText={touched.customer_ID && errors.customer_ID}
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
                      onBlur={(e) => {
                        setFieldValue("customerName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.customerName}
                      id="customerName"
                      error={!!touched.customerName && !!errors.customerName}
                      helperText={touched.customerName && errors.customerName}
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
                      onBlur={(e) => {
                        setFieldValue("totalPrice", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.totalPrice}
                      id="totalPrice"
                      error={!!touched.totalPrice && !!errors.totalPrice}
                      helperText={touched.totalPrice && errors.totalPrice}
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
                      onBlur={(e) => {
                        setFieldValue("totalQuantity", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.totalQuantity}
                      id="totalQuantity"
                      error={!!touched.totalQuantity && !!errors.totalQuantity}
                      helperText={touched.totalQuantity && errors.totalQuantity}
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
                      onBlur={(e) => {
                        setFieldValue("statusName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.statusName}
                      id="statusName"
                      error={!!touched.statusName && !!errors.statusName}
                      helperText={touched.statusName && errors.statusName}
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
                      onBlur={(e) => {
                        setFieldValue("methodName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.methodName}
                      id="methodName"
                      error={!!touched.methodName && !!errors.methodName}
                      helperText={touched.methodName && errors.methodName}
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
                      onBlur={(e) => {
                        setFieldValue("receiptDate", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.receiptDate}
                      id="receiptDate"
                      error={!!touched.receiptDate && !!errors.receiptDate}
                      helperText={touched.receiptDate && errors.receiptDate}
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
                    sx={{margin: "20px 0 20px 0"}}
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
                        onBlur={(e) => {
                          setFieldValue("productName", e.target.value.trim());
                          handleBlur(e);
                        }}
                        onChange={handleChange}
                        value={rd.productName}
                        id="productName"
                        error={!!touched.productName && !!errors.productName}
                        helperText={touched.productName && errors.productName}
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
                        onBlur={(e) => {
                          setFieldValue("productQuantity", e.target.value.trim());
                          handleBlur(e);
                        }}
                        onChange={handleChange}
                        value={rd.productQuantity}
                        id="productQuantity"
                        error={!!touched.productQuantity && !!errors.productQuantity}
                        helperText={touched.productQuantity && errors.productQuantity}
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
                        onBlur={(e) => {
                          setFieldValue("productPrice", e.target.value.trim());
                          handleBlur(e);
                        }}
                        onChange={handleChange}
                        value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rd.productPrice)}
                        id="productPrice"
                        error={!!touched.productPrice && !!errors.productPrice}
                        helperText={touched.productPrice && errors.productPrice}
                        sx={{ gridColumn: "span 2" }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: ColorButtonForm }}
                type="submit"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default EditForm;
