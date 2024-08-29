import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorTextPage, ColorButtonForm } from "../../../constants/constants";
import useCategories from "../../../hook/useCategories";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const initialValues = {
  itemCategoryName: "",
  itemCategoryPrice: "",
  itemCategoryDescription: "",
  itemCategoryImage: null,
  category_ID: "",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const categorySchema = yup.object({
  itemCategoryName: yup
    .string()
    .required("Item category name is required")
    .min(3, "Item category name must be at least 3 characters")
    .max(50, "Item category name must be at most 50 characters"),
  itemCategoryPrice: yup
    .number()
    .required("Price number is required")
    .positive("Price must be a positive number")
    .min(0, "Price cannot be negative")
    .max(100000000, "Price must be at most 100.000.000 VNĐ"),
  itemCategoryDescription: yup
    .string()
    .required("Item category description is required")
    .min(3, "Item category description must be at least 3 characters")
    .max(100, "Item category description must be at most 100 characters"),
  itemCategoryImage: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value.size <= MAX_FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    ),
  category_ID: yup.string().required("Category is required"),
});

const AddForm = ({ openAdd, handleClose }) => {
  const { categories } = useCategories();
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
                Add new item
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
                      label="Name"
                      onBlur={(e) => {
                        setFieldValue(
                          "itemCategoryName",
                          e.target.value.trim()
                        );
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerName}
                      name="itemCategoryName"
                      error={
                        !!touched.itemCategoryName && !!errors.itemCategoryName
                      }
                      helperText={
                        touched.itemCategoryName && errors.itemCategoryName
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      variant="outlined"
                      type="number"
                      label="Price"
                      onBlur={(e) => {
                        setFieldValue(
                          "itemCategoryPrice",
                          e.target.value.trim()
                        );
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.CustomerPhone}
                      name="itemCategoryPrice"
                      error={
                        !!touched.itemCategoryPrice &&
                        !!errors.itemCategoryPrice
                      }
                      helperText={
                        touched.itemCategoryPrice && errors.itemCategoryPrice
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={8} md={12}>
                    <TextField
                     multiline
                     maxRows={4}
                      variant="outlined"
                      type="text"
                      label="Description"
                      onBlur={(e) => {
                        setFieldValue(
                          "itemCategoryDescription",
                          e.target.value.trim()
                        );
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.EmployeeAddress}
                      name="itemCategoryDescription"
                      error={
                        !!touched.itemCategoryDescription &&
                        !!errors.itemCategoryDescription
                      }
                      helperText={
                        touched.itemCategoryDescription &&
                        errors.itemCategoryDescription
                      }
                      sx={{ gridColumn: "span 2", width: "100%" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="category_ID-label">Category</InputLabel>
                      <Select
                        labelId="category_ID-label"
                        id="category_ID"
                        name="category_ID"
                        value={values.category_ID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Category ID"
                        error={!!touched.category_ID && !!errors.category_ID}
                      >
                        {categories.map((category) => (
                          <MenuItem
                            key={category.Category_ID}
                            value={category.Category_ID}
                          >
                            {category.CategoryName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.category_ID}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={4} sm={8} md={12}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue(
                          "itemCategoryImage",
                          e.currentTarget.files[0]
                        );
                      }}
                      style={{ width: "100%" }}
                    />
                    {touched.itemCategoryImage && errors.itemCategoryImage && (
                      <div style={{ color: "red" }}>
                        {errors.itemCategoryImage}
                      </div>
                    )}
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

export default AddForm;
