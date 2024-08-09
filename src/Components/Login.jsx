import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Login = ({ handleLoginSuccess, handleLoginFailure }) => {
  return (
    <div className="">
      <GoogleLogin
        type="icon"
        shape="pill"
        useOneTap={true}
        className="flex justify-center items-center rounded-lg shadow-md"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </div>
  );
};

export default Login;
