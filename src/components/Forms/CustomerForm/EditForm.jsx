import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
};

const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const customerSchema = yup.object({
  customerName: yup.string().required("required"),
  customerPhone: yup
    .string()
    .required("required")
    .matches(regexPhone, "Phone number is not valid"),
  customerEmail: yup.string().email("invalid email").required("required"),
  // age: yup.number().required().positive().integer(),
  // website: yup.string().url().nullable(),
  // createdOn: yup.date().default(() => new Date()),
});

const EditForm = ({ openEdit, handleClose }) => {
  const handleFormSubmit = (values) => {
    console.log(values);
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
          handleSubmit,
        }) => (
            <Dialog open={openEdit} onClose={handleClose} PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>

                <Box
                  display={"grid"}
                  gap={"30px"}
                >
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="Customer name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customerName}
                    name="customerName"
                    error={!!touched.customerName && !!errors.customerName}
                    helperText={touched.customerName && errors.customerName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="Customer email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customerEmail}
                    name="customerEmail"
                    error={!!touched.customerEmail && !!errors.customerEmail}
                    helperText={touched.customerEmail && errors.customerEmail}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    label="Customer phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customerPhone}
                    name="customerPhone"
                    error={!!touched.customerPhone && !!errors.customerPhone}
                    helperText={touched.customerPhone && errors.customerPhone}
                    sx={{ gridColumn: "span 2" }}
                  />
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
