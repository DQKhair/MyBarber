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
  categoryName: "",
};

const categorySchema = yup.object({
  categoryName: yup.string().required("Category name required"),
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
                Add new category
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
                      label="Category name"
                      onBlur={(e) => {
                        setFieldValue("categoryName", e.target.value.trim());
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.categoryName}
                      name="categoryName"
                      error={!!touched.categoryName && !!errors.categoryName}
                      helperText={touched.categoryName && errors.categoryName}
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
