import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import ToastMessage from "../../helper/ToastMessage";
import "./register.css";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let userName,
    email,
    password,
    phone = useRef();

  const registrationUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const postJson = {
      userName: userName.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };

    ApiRequest.postRequest("/user/registrationUser", postJson)
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          ToastMessage.successMessage("User Registration Successfull");
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        ToastMessage.errorMessage("User Registration Failure");
      });

    userName.value = "";
    email.value = "";
    phone.value = "";
    password.value = "";
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
        <button className="registerButton" disabled={loading}>
          {loading ? "Register .." : "Register"}
        </button>
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
};

export default RegisterPage;
