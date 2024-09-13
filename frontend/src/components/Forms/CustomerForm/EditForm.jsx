import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorTextPage } from "../../../constants/constants";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const EditForm = ({ updateCustomer, customer, openEdit, handleClose }) => {
  // initial values
  const initialValues = {
    customerName: customer.customerName,
    customerPhone: customer.customerPhone,
    customerAddress: customer.customerAddress,
  };

  // schema
  const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const customerSchema = yup.object({
    customerName: yup.string().required("Customer name is required"),
    customerPhone: yup
      .string()
      .required("phone number is required")
      .matches(regexPhone, "Phone number is not valid"),
    customerAddress: yup.string().required("Customer address is required"),
    customerAddress: yup.string().required("Customer address is required"),
  });

  const handleFormSubmit = async (values) => {
    const result = await updateCustomer(customer.customer_ID,values)
    if(result)
    {
      alert('update success !')
    }
    handleClose();
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={customerSchema}
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
                Modify information about customer
              </DialogContentText>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
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
                      name="customerName"
                      error={!!touched.customerName && !!errors.customerName}
                      helperText={touched.customerName && errors.customerName}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Customer address"
                      onBlur={(e) => {
                        setFieldValue("customerAddress", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.customerAddress}
                      name="customerAddress"
                      error={
                        !!touched.customerAddress && !!errors.customerAddress
                      }
                      helperText={
                        touched.customerAddress && errors.customerAddress
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Customer phone"
                      onBlur={(e) => {
                        setFieldValue("customerPhone", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.customerPhone}
                      name="customerPhone"
                      error={!!touched.customerPhone && !!errors.customerPhone}
                      helperText={touched.customerPhone && errors.customerPhone}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default EditForm;
