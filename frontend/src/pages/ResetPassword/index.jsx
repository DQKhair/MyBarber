import React from "react";
import { ResetPasswordForm } from "../../components/Forms/Auth";

const ResetPassword = () => {

  return (
    <div className="row flex-grow">
      <div className="col-lg-4 mx-auto">
        <div className="auth-form-light text-left p-5">
          <div className="brand-logo">
            <h1>My Barber</h1>
          </div>
          <h4>Reset password!</h4>
          <h6 className="font-weight-light">Please fill in your email</h6>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
