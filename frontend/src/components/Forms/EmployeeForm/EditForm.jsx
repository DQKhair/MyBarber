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
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const EditForm = ({ updateEmployee, employee, openEdit, handleClose }) => {
  // initial values
  const initialValues = {
    employeeName: employee.employeeName,
    employeePhone: employee.employeePhone,
    employeeAddress: employee.employeeAddress,
    employeeEmail: employee.employeeEmail,
    employeePassword: employee.employeePassword,
    employeeIsActive: employee.employeeIsActive,
  };

  // schema
  const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const employeeSchema = yup.object({
    employeeName: yup
      .string()
      .required("Employee name is required")
      .min(6, "Employee name must be at least 6 characters")
      .max(50, "Employee name must be at most 50 characters"),
    employeePhone: yup
      .string()
      .required("Phone number is required")
      .matches(regexPhone, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 characters")
      .max(12, "Phone number must be at most 12 characters"),
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
    employeeIsActive: yup.boolean().required(`Employee is active is required`),
  });

  const handleFormSubmit = async (values) => {
    const result = await updateEmployee(employee.employee_ID, values);
    console.log(result);
    if (result) {
      alert("Update successful");
    }
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
                Modify information about employee
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
                      label="Employee name"
                      onBlur={(e) => {
                        setFieldValue("employeeName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.employeeName}
                      name="employeeName"
                      error={!!touched.employeeName && !!errors.employeeName}
                      helperText={touched.employeeName && errors.employeeName}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Employee address"
                      onBlur={(e) => {
                        setFieldValue("employeeAddress", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.employeeAddress}
                      name="employeeAddress"
                      error={
                        !!touched.employeeAddress && !!errors.employeeAddress
                      }
                      helperText={
                        touched.employeeAddress && errors.employeeAddress
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Employee phone"
                      onBlur={(e) => {
                        setFieldValue("employeePhone", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.employeePhone}
                      name="employeePhone"
                      error={!!touched.employeePhone && !!errors.employeePhone}
                      helperText={touched.employeePhone && errors.employeePhone}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      disabled
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Email"
                      onBlur={(e) => {
                        setFieldValue("employeeEmail", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.employeeEmail}
                      name="employeeEmail"
                      error={!!touched.employeeEmail && !!errors.employeeEmail}
                      helperText={touched.employeeEmail && errors.employeeEmail}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        error={
                          !!touched.employeeIsActive &&
                          !!errors.employeeIsActive
                        }
                      >
                        <InputLabel id="employee-active-label">
                          Employee status
                        </InputLabel>
                        <Select
                          labelId="employee-active-label"
                          id="employee-active"
                          name="employeeIsActive"
                          value={values.employeeIsActive}
                          label="Active"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value={true}>Active</MenuItem>
                          <MenuItem value={false}>Block</MenuItem>
                        </Select>
                        {touched.employeeIsActive &&
                          errors.employeeIsActive && (
                            <FormHelperText>
                              {errors.employeeIsActive}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
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
