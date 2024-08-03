import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "../../components/ButtonPage/Button";
import StyleLogin from "./Login.module.css"

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      isChecked? alert('Unchecked') : alert('Checked')
    };

    const handleTextPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleTextPasswordChange = (e) => {
        setPassword(e.target.value);

    }


    const navigation = useNavigate();
    const handleLogin = () =>{
        navigation("/");
        alert(`Login success! phone number: ${phoneNumber} & password: ${password}`);
    }
  return (
    <div className="row flex-grow">
      <div className="col-lg-4 mx-auto">
        <div className="auth-form-light text-left p-5">
          <div className="brand-logo">
            <h1>My Barber</h1>
          </div>
          <h4>Hello guy!</h4>
          <h6 className="font-weight-light">Sign in to continue.</h6>
          <form className="pt-3">
            <div className="form-group">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handleTextPhoneNumberChange}
                className="form-control form-control-lg"
                id="inputPhoneNumber"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={handleTextPasswordChange}
                className="form-control form-control-lg"
                id="inputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="mt-3">
              <Button nameButton={"SIGN IN"} colorButton={"blue"} sizeButton={"md"} handleOnclick={handleLogin} className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" />
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input checked={isChecked} onChange={handleCheckboxChange} type="checkbox" name="savePassword" className={`form-check-input ${StyleLogin.formChecked}`} /> Keep me signed in
                </label>
              </div>
              <Link to="/login/forgotpassword" className="auth-link text-black">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
