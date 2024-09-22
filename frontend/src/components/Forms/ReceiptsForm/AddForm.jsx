import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ColorButtonForm } from "../../../constants/constants";
import useItemCategories from "../../../hook/useItemCategories";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import useCustomers from "../../../hook/useCustomers";
import useReceipts from "../../../hook/useReceipts";
import DecodeToken from "../../../utils/DecodeToken";
import { Alert } from "@mui/material";

const initialValues = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  servicesInput: [],
  productsInput: [],
  productsQuantityInput: [],
};

const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const receiptSchema = yup.object({
  customerName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  customerAddress: yup
    .string()
    .required("Address is required")
    .min(3, "Address must be at least 3 characters")
    .max(50, "Address must be at most 50 characters"),
  customerPhone: yup
    .string()
    .required("Phone number is required")
    .matches(regexPhone, "Phone number is not valid"),
  servicesInput: yup.array().of(yup.object()).nullable(),
  productsInput: yup
    .array()
    .of(
      yup.object().shape({
        itemCategoryName: yup.string().required("Not empty"),
      })
    )
    .nullable(),
  productsQuantityInput: yup
    .array()
    .of(
      yup
        .number()
        .positive("Quantity must be a positive number")
        .min(1, "Quantity must be at least 1")
        .max(99, "Quantity must be at most 99")
    )
    .nullable(),
});

const AddForm = () => {
  const { error, addReceiptHook } = useReceipts();
  const [productQuantity, setProductQuantity] = useState(0);
  const [serviceQuantity, setServiceQuantity] = useState(0);
  const { itemCategories } = useItemCategories();
  const { customers } = useCustomers();
  const services = itemCategories.filter((i) => i.category_ID === 1);
  const products = itemCategories.filter((i) => i.category_ID !== 1);

  const listAddress = [...new Set(customers.map((c) => c.customerAddress))];
  const listCustomerName = [...new Set(customers.map((c) => c.customerName))];

  const handleChangeNumSer = (event, setFieldValue, values) => {
    const newQuantity = event.target.value;
    setServiceQuantity(newQuantity);

    const updatedServiceInput = [...values.servicesInput];
    if (newQuantity > updatedServiceInput.length) {
      for (let i = updatedServiceInput.length; i < newQuantity; i++) {
        updatedServiceInput.push(null);
      }
    } else if (newQuantity < updatedServiceInput.length) {
      updatedServiceInput.length = newQuantity;
    }

    setFieldValue("servicesInput", updatedServiceInput);
  };

  const handleChangeNumPro = (event, setFieldValue, values) => {
    const newQuantity = event.target.value;
    setProductQuantity(newQuantity);

    const updatedProductInput = [...values.productsInput];
    const updatedProductsQuantityInput = [...values.productsQuantityInput];

    if (newQuantity > updatedProductInput.length) {
      for (let i = updatedProductInput.length; i < newQuantity; i++) {
        updatedProductInput.push(null);
        updatedProductsQuantityInput.push(null);
      }
    } else if (newQuantity < updatedProductInput.length) {
      updatedProductInput.length = newQuantity;
      updatedProductsQuantityInput.length = newQuantity;
    }

    setFieldValue("productsQuantityInput", updatedProductsQuantityInput);
    setFieldValue("productsInput", updatedProductInput);
  };
  const handleFormSubmit = async (values, { resetForm }) => {
    const userInfo = DecodeToken(localStorage.getItem("accessToken"));
    const response = await addReceiptHook(userInfo.User_ID, values);
    if (response) {
      toast.success("Successfully created new receipt!", {
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
    //reset form
    resetForm();
  };

   // alert
   useEffect(() => {
    if (error != null) {
      toast.error(`${error.response.data.message}!`, {
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
  }, [error]);

  if (error)
    if (error.status === 403) {
      return (
        <div>
          <Alert severity="error">
            Error: You don't have permission to do this
          </Alert>
        </div>
      );
    } else if (error.status === 400) {
      return (
        <div>
          <Alert severity="error">Error: {error.message}</Alert>
        </div>
      );
    }

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={receiptSchema}
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
          <form onSubmit={handleSubmit}>
            <Container maxWidth="md">
              <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                Create new receipt
              </h3>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    <Autocomplete
                      id="customerName_auto"
                      freeSolo
                      options={listCustomerName}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          type="text"
                          label="Customer name"
                          onBlur={(e) => {
                            setFieldValue(
                              "customerName",
                              e.target.value.trim()
                            );
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.customerName}
                          name="customerName"
                          error={
                            !!touched.customerName && !!errors.customerName
                          }
                          helperText={
                            touched.customerName && errors.customerName
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <Autocomplete
                      id="CustomerPhone_auto"
                      freeSolo
                      options={customers.map((option) => option.customerPhone)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          type="text"
                          label="Customer phone"
                          onBlur={(e) => {
                            setFieldValue(
                              "customerPhone",
                              e.target.value.trim()
                            );
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.customerPhone}
                          name="customerPhone"
                          error={
                            !!touched.customerPhone && !!errors.customerPhone
                          }
                          helperText={
                            touched.customerPhone && errors.customerPhone
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={4} sm={4} md={4}>
                    <Autocomplete
                      id="CustomerAddress_auto"
                      freeSolo
                      options={listAddress}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          type="text"
                          label="Customer address"
                          onBlur={(e) => {
                            setFieldValue(
                              "customerAddress",
                              e.target.value.trim()
                            );
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.customerAddress}
                          name="customerAddress"
                          error={
                            !!touched.customerAddress &&
                            !!errors.customerAddress
                          }
                          helperText={
                            touched.customerAddress && errors.customerAddress
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      )}
                    />
                  </Grid>

                  {/* select service quantity */}
                  <Grid item xs={4} sm={4} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Service quantity
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={serviceQuantity}
                        label="Service quantity"
                        onChange={(e) =>
                          handleChangeNumSer(e, setFieldValue, values)
                        }
                      >
                        {Array.from({ length: 11 }).map((_, i) => (
                          <MenuItem key={i} value={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* select product quantity */}
                  <Grid item xs={4} sm={4} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Product quantity
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={productQuantity}
                        label="Product quantity"
                        onChange={(e) =>
                          handleChangeNumPro(e, setFieldValue, values)
                        }
                      >
                        {Array.from({ length: 11 }).map((_, i) => (
                          <MenuItem key={i} value={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* arr service */}
                  {Array.from({ length: serviceQuantity }).map((_, i) => (
                    <Grid key={i} item xs={4} sm={4} md={8}>
                      <Autocomplete
                        clearOnBlur
                        options={services}
                        getOptionLabel={(option) =>
                          option.itemCategoryName || ""
                        }
                        value={values.servicesInput[i] || null}
                        onChange={(event, newValue) => {
                          const updateServiceInput = [...values.servicesInput];
                          updateServiceInput[i] = newValue;
                          setFieldValue("servicesInput", updateServiceInput);
                        }}
                        id={`clear-on-product-${i}`}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            name={`servicesInput[${i}]`}
                            label={`Service ${i + 1}`}
                            error={
                              !!touched.servicesInput?.[i] &&
                              !!errors.servicesInput?.[i]
                            }
                            helperText={
                              touched.servicesInput?.[i] &&
                              errors.servicesInput?.[i]
                            }
                          />
                        )}
                      />
                    </Grid>
                  ))}
                  {/* Divider */}
                  <div
                    style={{
                      backgroundColor: "#000",
                      height: "1px",
                      width: "100%",
                      margin: "3% 0 0 3%",
                    }}
                  ></div>
                  {/* arr product */}
                  {Array.from({ length: productQuantity }).map((_, i) => (
                    <React.Fragment key={i}>
                      <Grid item xs={4} sm={4} md={8}>
                        <Autocomplete
                          clearOnBlur
                          options={products}
                          getOptionLabel={(option) =>
                            option.itemCategoryName || ""
                          }
                          value={values.productsInput[i] || null}
                          onChange={(event, newValue) => {
                            const updatedProductsInput = [
                              ...values.productsInput,
                            ];
                            updatedProductsInput[i] = newValue;
                            setFieldValue(
                              "productsInput",
                              updatedProductsInput
                            );
                          }}
                          id={`clear-on-product-${i}`}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              type="text"
                              name={`productsInput[${i}]`}
                              label={`Product ${i + 1}`}
                              error={
                                !!touched.productsInput?.[i] &&
                                !!errors.productsInput?.[i]
                              }
                              helperText={
                                touched.productsInput?.[i] &&
                                errors.productsInput?.[i]
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={4}>
                        <TextField
                          variant="outlined"
                          type="number"
                          label="Quantity"
                          inputProps={{ min: 1, max: 99 }}
                          onBlur={(e) => {
                            const newQuantity = Number(e.target.value);
                            const updatedProductsQuantityInput = [
                              ...values.productsQuantityInput,
                            ];
                            updatedProductsQuantityInput[i] = newQuantity;
                            setFieldValue(
                              "productsQuantityInput",
                              updatedProductsQuantityInput
                            );
                            handleBlur(e);
                          }}
                          onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            const updatedProductsQuantityInput = [
                              ...values.productsQuantityInput,
                            ];
                            updatedProductsQuantityInput[i] = newQuantity;
                            setFieldValue(
                              "productsQuantityInput",
                              updatedProductsQuantityInput
                            );
                          }}
                          value={values.productsQuantityInput[i] || 0}
                          name={`productsQuantityInput[${i}]`}
                          error={
                            !!touched.productsQuantityInput?.[i] &&
                            !!errors.productsQuantityInput?.[i]
                          }
                          helperText={
                            touched.productsQuantityInput?.[i] &&
                            errors.productsQuantityInput?.[i]
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
              <Button
                variant="contained"
                sx={{ bgcolor: ColorButtonForm, margin: "10px 0 10px 0" }}
                type="submit"
              >
                Add new
              </Button>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddForm;
