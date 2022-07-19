import { useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar/Sidebar";
import ApiRequest from "../../APIRequest/ApiRequest";
import store from "../../redux/store/store";
import { setProfile } from "../../redux/features/profileSlice";
import "./settings.css";
import { useRef } from "react";
import GetBase64 from "../../helper/GetBase64";
import FormValidation from "../../helper/FormValidation";
import ToastMessage from "../../helper/ToastMessage";
import SessionHelper from "../../helper/SessionHelper";
const SettingsPage = () => {
  let nameRef,
    userNameRef,
    emailRef,
    imgInputRef,
    numberRef,
    imgViewRef = useRef();

  const profile = useSelector((state) => state.profile.value);

  const selectProfile = () => {
    ApiRequest.getRequest("/user/selectUser").then((response) => {
      if (response) {
        store.dispatch(setProfile(response.data[0]));
      }
    });
  };

  useEffect(() => {
    selectProfile();
    window.scroll(0, 0);
  }, []);

  const changeImgView = () => {
    const imgFile = imgInputRef.files[0];
    GetBase64(imgFile).then((img) => {
      imgViewRef.src = img;
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: nameRef.value,
      email: emailRef.value,
      phone: numberRef.value,
      photo: imgViewRef.src,
    };

    if (FormValidation.isEmpty(nameRef.value)) {
      ToastMessage.errorMessage("Name is Required");
    } else if (!FormValidation.isEmail(emailRef.value)) {
      ToastMessage.errorMessage("Invalid Email Address");
    } else if (!FormValidation.isMobile(numberRef.value)) {
      ToastMessage.errorMessage("Invalid Phone Number");
    } else {
      ApiRequest.updateRequest(
        "/user/updateUser/" + profile.userName,
        updatedProfile,
      ).then((result) => {
        if (result) {
          ToastMessage.successMessage("User Update Successful");
          selectProfile();
        }
      });
    }
  };

  const deleteAccout = () => {
    if (window.confirm("Are You Sure")) {
      ApiRequest.deleteRequest("/user/deleteUser/" + profile.userName).then(
        (result) => {
          if (result) {
            SessionHelper.removeToken();
            ToastMessage.successMessage("User Delete Successful");
            window.location.href = "/login";
          }
        },
      );
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={deleteAccout}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={updateProfile}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={profile.photo}
              alt={profile.userName}
              ref={(input) => (imgViewRef = input)}
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              ref={(input) => (imgInputRef = input)}
              onChange={changeImgView}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            defaultValue={profile.name}
            ref={(input) => (nameRef = input)}
          />
          <label>User Name</label>
          <input
            type="text"
            defaultValue={profile.userName}
            disabled
            ref={(input) => (userNameRef = input)}
          />
          <label>Email</label>
          <input
            type="email"
            defaultValue={profile.email}
            ref={(input) => (emailRef = input)}
          />
          <label>Phone</label>
          <input
            type="number"
            defaultValue={profile.phone}
            min="1"
            ref={(input) => (numberRef = input)}
          />
          <label>Password</label>
          <input type="password" placeholder="Password" disabled />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default SettingsPage;
