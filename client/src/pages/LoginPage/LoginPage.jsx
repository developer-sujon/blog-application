import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import ToastMessage from "../../helper/ToastMessage";
import "./login.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let userName,
    password = useRef();

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const postJson = {
      userName: userName.value,
      password: password.value,
    };

    ApiRequest.postRequest("/user/loginUser", postJson)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setLoading(false);
          ToastMessage.successMessage("Login Successfull");
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        ToastMessage.errorMessage("Login Failure");
      });

    // userName.value = "";
    // password.value = "";
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
      <button className="loginRegisterButton">Register</button>
    </div>
  );
};

export default LoginPage;
