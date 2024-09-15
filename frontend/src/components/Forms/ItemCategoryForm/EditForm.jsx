import React, { useState } from "react";
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

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const EditForm = ({
  updateItemCategoryInformation,
  updateItemCategoryImage,
  itemCategory,
  openEdit,
  handleClose,
}) => {
  const { categories } = useCategories();
  const [isUpdateImage, setIsUpdateImage] = useState(false);

  // initial values
  const initialValues = {
    itemCategoryName: itemCategory.itemCategoryName,
    itemCategoryPrice: itemCategory.itemCategoryPrice,
    itemCategoryDescription: itemCategory.itemCategoryDescription,
    category_ID: itemCategory.category_ID,
    itemCategoryImage: null,
    isUpdateImage: false,
  };

  // schema

  const itemCategorySchema = yup.object({
    itemCategoryName: yup
      .string()
      .required("Item category name is required")
      .min(6, "Item category name must be at least 6 characters")
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
    category_ID: yup.string().required("Category is required"),

    isUpdateImage: yup.boolean(),

    // itemCategoryImage: yup
    //   .mixed()
    //   .required("Image is required")
    //   .test(
    //     "fileSize",
    //     "File size is too large",
    //     (value) => !value || value.size <= MAX_FILE_SIZE
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported file format",
    //     (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    //   ),
  });

  const handleFormSubmit = async (values) => {
    if (values.isUpdateImage) {
      const formData = new FormData();
      formData.append("itemCategoryName", values.itemCategoryName);
      formData.append("itemCategoryPrice", values.itemCategoryPrice);
      formData.append(
        "itemCategoryDescription",
        values.itemCategoryDescription
      );
      formData.append("itemCategoryImage", values.itemCategoryImage);
      formData.append("category_ID", values.category_ID);

      const result = await updateItemCategoryImage(
        itemCategory.itemCategory_ID,
        formData
      );
      if (result) {
        alert("Update successful!");
      }
    } else {
      const result = await updateItemCategoryInformation(
        itemCategory.itemCategory_ID,
        values
      );
      if (result) {
        alert("Update successful!");
      }
    }
    handleClose();
  };

  //validate img
  const validateImage = (file) => {
    if (!file) return "Image is required";
    if (file.size > MAX_FILE_SIZE) return "File size is too large";
    if (!SUPPORTED_FORMATS.includes(file.type))
      return "Unsupported file format";
    return null;
  };

  const validateFileImage = (values) => {
    const errors = {};

    // Validate image if isUpdateImage is true
    if (values.isUpdateImage) {
      const imageError = validateImage(values.itemCategoryImage);
      if (imageError) errors.itemCategoryImage = imageError;
    }

    return errors;
  };

  return (
    <>
      <Formik
        validate={validateFileImage}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={itemCategorySchema}
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
                Modify information about item
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
                      label="Name"
                      onBlur={(e) => {
                        setFieldValue(
                          "itemCategoryName",
                          e.target.value.trim()
                        );
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.itemCategoryName}
                      name="itemCategoryName"
                      error={
                        !!touched.itemCategoryName && !!errors.itemCategoryName
                      }
                      helperText={
                        touched.itemCategoryName && errors.itemCategoryName
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="text"
                      label="Price"
                      onBlur={(e) => {
                        setFieldValue(
                          "itemCategoryPrice",
                          e.target.value.trim()
                        );
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                      value={values.itemCategoryPrice}
                      name="itemCategoryPrice"
                      error={
                        !!touched.itemCategoryPrice &&
                        !!errors.itemCategoryPrice
                      }
                      helperText={
                        touched.itemCategoryPrice && errors.itemCategoryPrice
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Grid>

                  <Grid item xs={4} sm={8} md={12}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      variant="standard"
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
                      value={values.itemCategoryDescription}
                      name="itemCategoryDescription"
                      error={
                        !!touched.itemCategoryDescription &&
                        !!errors.itemCategoryDescription
                      }
                      helperText={
                        touched.itemCategoryDescription &&
                        errors.itemCategoryDescription
                      }
                      sx={{ gridColumn: "span 2" }}
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
                        label="Category"
                        error={!!touched.category_ID && !!errors.category_ID}
                      >
                        {categories.map((category) => (
                          <MenuItem
                            key={category.category_ID}
                            value={category.category_ID}
                          >
                            {category.categoryName}
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
                      id="isUpdateImage"
                      type="checkbox"
                      name="isUpdateImage"
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.checked) {
                          setIsUpdateImage(true);
                        } else {
                          setIsUpdateImage(false);
                        }
                      }}
                      onBlur={handleBlur}
                      checked={values.isUpdateImage}
                      style={{ margin: "0 10px 0 10px" }}
                    />
                    Update Image
                  </Grid>

                  {isUpdateImage && (
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
                      {touched.itemCategoryImage &&
                        errors.itemCategoryImage && (
                          <div style={{ color: "red" }}>
                            {errors.itemCategoryImage}
                          </div>
                        )}
                    </Grid>
                  )}
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
