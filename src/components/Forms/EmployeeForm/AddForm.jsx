import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorTextPage, ColorButtonForm } from "../../../constants/constants";

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
  employeeName: "",
  employeePhone: "",
  employeeAddress: "",
  employeeEmail: "",
  employeePassword: "",
  employeeRepassword: ""
};

const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const categorySchema = yup.object({
  employeeName: yup
    .string()
    .required("Employee name is required")
    .min(6, "Employee name must be at least 6 characters")
    .max(50, "Employee name must be at most 50 characters"),
  employeePhone: yup
    .string()
    .required("Phone number is required")
    .matches(regexPhone, "Phone number is not valid"),
  employeeAddress: yup
    .string()
    .required("Employee address is required")
    .min(3, "Employee address must be at least 6 characters")
    .max(100, "Employee address must be at most 100 characters"),
  employeeEmail: yup
    .string()
    .required("Employee email is required")
    .email("Email is invalid")
    .min(3, "Employee email must be at least 3 characters")
    .max(50, "Employee email must be at most 50 characters"),
    employeePassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),
    employeeRepassword: yup
    .string()
    .oneOf([yup.ref('employeePassword'), null], "Passwords must match")
    .required("Confirm text is required")
});

const AddFrom = ({ openAdd, handleClose }) => {
  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    handleClose();
    //reset form
    resetForm();
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={categorySchema}
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
                      label="Employee name"
                      onBlur={(e) => {
                        setFieldValue("employeeName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerName}
                      name="employeeName"
                      error={!!touched.employeeName && !!errors.employeeName}
                      helperText={touched.employeeName && errors.employeeName}
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Employee phone"
                      onBlur={(e) => {
                        setFieldValue("employeePhone", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerPhone}
                      name="employeePhone"
                      error={!!touched.employeePhone && !!errors.employeePhone}
                      helperText={touched.employeePhone && errors.employeePhone}
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Employee address"
                      onBlur={(e) => {
                        setFieldValue("employeeAddress", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.EmployeeAddress}
                      name="employeeAddress"
                      error={
                        !!touched.employeeAddress && !!errors.employeeAddress
                      }
                      helperText={
                        touched.employeeAddress && errors.employeeAddress
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      label="Email"
                      onBlur={(e) => {
                        setFieldValue("employeeEmail", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.EmployeeEmail}
                      name="employeeEmail"
                      error={
                        !!touched.employeeEmail && !!errors.employeeEmail
                      }
                      helperText={
                        touched.employeeEmail && errors.employeeEmail
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="password"
                      label="Password"
                      onBlur={(e) => {
                        setFieldValue("employeePassword", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.EmployeePassword}
                      name="employeeAddress"
                      error={
                        !!touched.employeePassword && !!errors.employeePassword
                      }
                      helperText={
                        touched.employeePassword && errors.employeePassword
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="password"
                      label="Confirm password"
                      onBlur={(e) => {
                        setFieldValue("employeeRepassword", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerRepassword}
                      name="employeeRepassword"
                      error={
                        !!touched.employeeRepassword && !!errors.employeeRepassword
                      }
                      helperText={
                        touched.employeeRepassword && errors.employeeRepassword
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
