import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import FormValidation from "../../helper/FormValidation";
import SessionHelper from "../../helper/SessionHelper";
import ToastMessage from "../../helper/ToastMessage";
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  let userName,
    password = useRef();

  const loginUser = (e) => {
    e.preventDefault();

    const postJson = {
      userName: userName.value,
      password: password.value,
    };

    if (FormValidation.isEmpty(userName.value)) {
      ToastMessage.errorMessage("Please Enter Your Your Username");
    } else if (FormValidation.isEmpty(password.value)) {
      ToastMessage.errorMessage("Please Enter Your Your Password");
    } else {
      ApiRequest.postRequest("/user/loginUser", postJson).then((response) => {
        if (response) {
          console.log(response);
          ToastMessage.successMessage("Login Successfull");
          SessionHelper.setToken(response.data.accessToken);
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={loginUser}>
        <label>User Name</label>
        <input
          ref={(input) => (userName = input)}
          className="loginInput"
          type="text"
          placeholder="Enter your user Name..."
        />
        <label>Password</label>
        <input
          ref={(input) => (password = input)}
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="loginButton">Login</button>
      </form>
      <Link to="/register" className="loginRegisterButton">
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
