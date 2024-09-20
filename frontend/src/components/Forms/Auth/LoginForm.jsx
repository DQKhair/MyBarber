import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../../../components/ButtonPage/Button";
import StyleLogin from "../../../pages/Login/Login.module.css";

import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/userAction";

const initialValues = {
  email: "",
  password: "",
};

const authSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .max(50, "Password must be at most 50 characters")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    isChecked ? alert("Unchecked") : alert("Checked");
  };

  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const navigation = useNavigate();

  useEffect(() => {
    if(userInfo)
    {
      if(userInfo.success)
      {
        navigation("/");
      }
    }
  },[userInfo,navigation]);

  const handleLogin = (values) => {
    console.log(values);
    dispatch(loginUser({emailUser: values.email, passwordUser: values.password}))
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
            <p style={{textAlign:"center", color:"red"}}>{error}</p>
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
              <Link to="/login/reset_password" className="auth-link text-black">
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
