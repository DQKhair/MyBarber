import React from "react";
import { LoginForm } from "../../components/Forms/Auth";

const Login = () => {
   
  return (
    <div className="row flex-grow">
      <div className="col-lg-4 mx-auto">
        <div className="auth-form-light text-left p-5">
          <div className="brand-logo">
            <h1>My Barber</h1>
          </div>
          <h4>Hello guy!</h4>
          <h6 className="font-weight-light">Sign in to continue.</h6>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
