import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorTextPage, ColorButtonForm } from "../../../constants/constants";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const initialValues = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
};

const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const customerSchema = yup.object({
  customerName: yup
    .string()
    .required("Customer name is required")
    .min(6, "Customer name must be at least 6 characters")
    .max(50, "Name must be at most 50 characters"),
  customerPhone: yup
    .string()
    .required("Phone number is required")
    .matches(regexPhone, "Phone number is not valid"),
  customerAddress: yup
    .string()
    .required("Customer address is required")
    .min(3, "Customer address must be at least 6 characters")
    .max(100, "Customer address must be at most 100 characters"),
});

const AddFrom = ({ addCustomer, openAdd, handleClose }) => {
  const handleFormSubmit = async (values, { resetForm }) => {
    const result = await addCustomer(values);
    if (result) {
      toast.success("Successfully added new customer!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    handleClose();
    //reset form
    resetForm();
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
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Dialog
            fullWidth
            maxWidth="md"
            open={openAdd}
            onClose={() => {
              handleClose();
            }}
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
                Add new customer
              </DialogContentText>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Customer name"
                      onBlur={(e) => {
                        setFieldValue("customerName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerName}
                      name="customerName"
                      error={!!touched.customerName && !!errors.customerName}
                      helperText={touched.customerName && errors.customerName}
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Customer phone"
                      onBlur={(e) => {
                        setFieldValue("customerPhone", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerPhone}
                      name="customerPhone"
                      error={!!touched.customerPhone && !!errors.customerPhone}
                      helperText={touched.customerPhone && errors.customerPhone}
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Customer address"
                      onBlur={(e) => {
                        setFieldValue("customerAddress", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerAddress}
                      name="customerAddress"
                      error={
                        !!touched.customerAddress && !!errors.customerAddress
                      }
                      helperText={
                        touched.customerAddress && errors.customerAddress
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: ColorButtonForm }}
                type="submit"
              >
                Add new
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default AddFrom;
