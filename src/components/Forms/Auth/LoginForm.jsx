import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../../../components/ButtonPage/Button";
import StyleLogin from "../../../pages/Login/Login.module.css";

import TextField from "@mui/material/TextField";

const initialValues = {
  phoneNumber: "",
  password: "",
};
const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const authSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(regexPhone, "Phone number is not valid")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .max(50, "Password must be at most 50 characters")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    isChecked ? alert("Unchecked") : alert("Checked");
  };

  const handleTextPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleTextPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigation = useNavigate();
  const handleLogin = (values) => {
    console.log(values)

    if (values.phoneNumber === "0000000000" && values.password === "000000") {
      alert(
        `Login success! phone number: ${values.phoneNumber} & password: ${values.password} & is checked: ${isChecked}`
      );
      navigation("/");
    } else {
      alert(`Login false`);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleLogin}
        initialValues={initialValues}
        validationSchema={authSchema}
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
            <div className="form-group">
              <TextField
                variant="outlined"
                type="tel"
                label="Phone number"
                onBlur={(e) => {
                  setFieldValue("phoneNumber", e.target.value.trim());
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.phoneNumber}
                id="inputPhoneNumber"
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-group">
              <TextField
                type="password"
                label="Password"
                onBlur={(e) => {
                  setFieldValue("password", e.target.value.trim());
                  handleBlur(e);
                }}
                onChange={handleChange}
                value={values.password}
                id="inputPassword1"
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                className="form-control form-control-lg"
              />
            </div>
            <div className="mt-3">
              <Button
                type={"submit"}
                nameButton={"SIGN IN"}
                colorButton={"blue"}
                sizeButton={"md"}
                className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
              />
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    name="savePassword"
                    className={`form-check-input ${StyleLogin.formChecked}`}
                  />{" "}
                  Keep me signed in
                </label>
              </div>
              <Link to="/login/forgotpassword" className="auth-link text-black">
                Forgot password?
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
