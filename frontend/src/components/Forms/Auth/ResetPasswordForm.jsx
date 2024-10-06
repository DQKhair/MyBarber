import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../../../components/ButtonPage/Button";
import { Box, CircularProgress, TextField } from "@mui/material";
import useAuthen from "../../../hook/useAuthen";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
};

const resetPasswordSchema = yup.object({
  email: yup.string().required("Email is required"),
});

const ResetPasswordForm = ({ resetForm }) => {
  const { error, loading, resetPasswordHook } = useAuthen();

  const handleSubmitReset = async (values) => {
    const result = await resetPasswordHook(values);
    if (result) {
      toast.success("Reset password successful!", {
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
    resetForm();
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmitReset}
        validationSchema={resetPasswordSchema}
        initialValues={initialValues}
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
          <form onSubmit={handleSubmit} className="pt-3">
            {loading === true ? (
              <div>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress /> Loading...
                </Box>
              </div>
            ) : (
              <></>
            )}

            <p style={{ textAlign: "center", color: "red" }}>
              {error && error.response.data.message}
            </p>
            <div className="form-group">
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                onBlur={(e) => {
                  setFieldValue("email", e.target.value.trim());
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.email}
                id="inputEmail"
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                className="form-control form-control-lg"
              />
            </div>
            <div className="mt-3">
              <Button
                isDisabled={loading}
                type={"submit"}
                nameButton={"Send"}
                colorButton={"blue"}
                sizeButton={"md"}
                className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
