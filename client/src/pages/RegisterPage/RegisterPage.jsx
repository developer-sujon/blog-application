import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiRequest from "../../APIRequest/ApiRequest";
import ToastMessage from "../../helper/ToastMessage";
import "./register.css";

const RegisterPage = () => {
  const loder = useSelector((state) => state.setting.isLoading);

  const navigate = useNavigate();

  let userName,
    email,
    password,
    phone = useRef();

  const registrationUser = (e) => {
    e.preventDefault();

    const postJson = {
      userName: userName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };

    ApiRequest.postRequest("/user/registrationUser", postJson).then(
      (result) => {
        if (result) {
          ToastMessage.successMessage("User Registration Successfull");
          navigate("/login");
        } else {
          ToastMessage.errorMessage("User Registration Failure");
        }
      },
    );
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={registrationUser}>
        <label>Username</label>
        <input
          ref={(input) => (userName = input)}
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          ref={(input) => (email = input)}
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
        />
        <label>Phone</label>
        <input
          ref={(input) => (phone = input)}
          className="registerInput"
          type="number"
          placeholder="Enter your phone..."
        />
        <label>Password</label>
        <input
          ref={(input) => (password = input)}
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="registerButton" disabled={loder}>
          {loder ? "Register .." : "Register"}
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
};

export default RegisterPage;
