import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { ColorButtonForm, ColorTextPage } from "../../constants/constants";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Avatar, Box, Button, Grid, Stack, TextField } from "@mui/material";

const Profile = ({ updateInfoAdmin, updateInfoEmployee, user, role }) => {
  const initialValues = {
    user_ID: user.user_ID,
    userName: user.userName,
    userAddress: user.userAddress,
    userPhone: user.userPhone,
    userEmail: user.userEmail,
    userPassword: "",
    userRepassword: "",
  };
  // schema
  const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const userSchema = yup.object({
    user_ID: yup.string().required("ID is required"),
    userName: yup
      .string()
      .required("Name is required")
      .min(6, "User name must be at least 6 characters")
      .max(50, "User name must be at most 50 characters"),
    userPhone: yup
      .string()
      .required("Phone number is required")
      .matches(regexPhone, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 characters")
      .max(12, "Phone number must be at most 12 characters"),
    userAddress: yup
      .string()
      .required("User address is required")
      .min(3, "User address must be at least 6 characters")
      .max(100, "User address must be at most 100 characters"),
    userEmail: yup
      .string()
      .required("User email is required")
      .email("Email is invalid")
      .min(3, "User email must be at least 3 characters")
      .max(50, "User email must be at most 50 characters"),
    userPassword: yup
      .string()
      .required("User password is required")
      .min(3, "User password must be at least 3 characters")
      .max(50, "User password must be at most 50 characters"),
    userRepassword: yup
      .string()
      .oneOf([yup.ref("userPassword"), null], "Passwords must match")
      .required("Confirm Repassword is required"),
  });

  const handleFormSubmit = async (values) => {
    if (role.roleName === "Administrator") {
      const result = await updateInfoAdmin(values.user_ID, values);
      if (result) {
        toast.success("Update successful!", {
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
    } else {
      const result = await updateInfoEmployee(values.user_ID, values);
      if (result) {
        toast.success("Update successful!", {
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
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          sx={{ justifyContent: "center", alignItems: "center" }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={8} md={12}>
            <h4>My profile</h4>
            <div
              style={{
                height: "1px",
                backgroundColor: "#000",
                width: "100%",
              }}
            ></div>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2.5rem",
                  bgcolor: ColorTextPage,
                }}
              ></Avatar>
            </Stack>
            <h4 className="text-center" style={{ margin: "20px 0 20px 0" }}>
              {role.roleName}
            </h4>
          </Grid>

          <Grid item xs={4} sm={4} md={8}>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={userSchema}
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
                <form onSubmit={handleSubmit}>
                  <h4
                    className="text-center"
                    style={{ margin: "20px 0 20px 0" }}
                  >
                    General Info
                  </h4>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          disabled
                          fullWidth
                          variant="standard"
                          type="text"
                          label="ID"
                          onBlur={(e) => {
                            setFieldValue("user_ID", e.target.value.trim());
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.user_ID}
                          name="user_ID"
                          error={!!touched.user_ID && !!errors.user_ID}
                          helperText={touched.user_ID && errors.user_ID}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          disabled
                          fullWidth
                          variant="standard"
                          type="text"
                          label="role"
                          value={role.roleName}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label="User name"
                          onBlur={(e) => {
                            setFieldValue("userName", e.target.value.trim());
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userName}
                          name="userName"
                          error={!!touched.userName && !!errors.userName}
                          helperText={touched.userName && errors.userName}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label="User address"
                          onBlur={(e) => {
                            setFieldValue("userAddress", e.target.value.trim());
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userAddress}
                          name="userAddress"
                          error={!!touched.userAddress && !!errors.userAddress}
                          helperText={touched.userAddress && errors.userAddress}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          fullWidth
                          variant="standard"
                          type="text"
                          label="User phone"
                          onBlur={(e) => {
                            setFieldValue("userPhone", e.target.value.trim());
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userPhone}
                          name="userPhone"
                          error={!!touched.userPhone && !!errors.userPhone}
                          helperText={touched.userPhone && errors.userPhone}
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
                            setFieldValue("userEmail", e.target.value.trim());
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userEmail}
                          name="userEmail"
                          error={!!touched.userEmail && !!errors.userEmail}
                          helperText={touched.userEmail && errors.userEmail}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          variant="standard"
                          type="password"
                          label="Password"
                          onBlur={(e) => {
                            setFieldValue(
                              "userPassword",
                              e.target.value.trim()
                            );
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userPassword}
                          name="userPassword"
                          error={
                            !!touched.userPassword && !!errors.userPassword
                          }
                          helperText={
                            touched.userPassword && errors.userPassword
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={6}>
                        <TextField
                          variant="standard"
                          type="password"
                          label="Confirm password"
                          onBlur={(e) => {
                            setFieldValue(
                              "userRepassword",
                              e.target.value.trim()
                            );
                            handleBlur(e);
                          }}
                          onChange={handleChange}
                          value={values.userRepassword}
                          name="userRepassword"
                          error={
                            !!touched.userRepassword && !!errors.userRepassword
                          }
                          helperText={
                            touched.userRepassword && errors.userRepassword
                          }
                          sx={{ gridColumn: "span 2", width: "100%" }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={12}>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: ColorButtonForm }}
                          type="submit"
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
