import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ApiRequest from "../../APIRequest/ApiRequest";
import SessionHelper from "../../helper/SessionHelper";
import { setProfile } from "../../redux/features/profileSlice";
import store from "../../redux/store/store";
import "./topbar.css";

const Topbar = () => {
  const profile = useSelector((state) => state.profile.value);
  const accessToken = SessionHelper.getToken();

  const selectProfile = () => {
    accessToken &&
      ApiRequest.getRequest("/user/selectUser").then((response) => {
        if (response) {
          store.dispatch(setProfile(response.data[0]));
        }
      });
  };

  useEffect(() => {
    selectProfile();
  }, []);

  const logout = () => {
    SessionHelper.removeToken();
    window.location.href = "/login";
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {accessToken && (
            <li className="topListItem" onClick={logout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {accessToken ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={profile.photo}
              alt={profile.userName}
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
