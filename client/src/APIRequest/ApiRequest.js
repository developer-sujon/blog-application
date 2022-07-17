//external lib import
import axios from "axios";
import SessionHelper from "../helper/SessionHelper";
import ToastMessage from "../helper/ToastMessage";
import { setLoading, removeLoading } from "../redux/features/settingSlice";
import store from "../redux/store/store";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + SessionHelper.getToken();

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class ApiRequest {
  static getRequest(url) {
    store.dispatch(setLoading());
    return axios
      .get(url)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        store.dispatch(setLoading());
        if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
        } else {
          ToastMessage.errorMessage(err.response.data.message);
        }
        return false;
      });
  }

  static postRequest(url, postJson) {
    store.dispatch(setLoading());
    return axios
      .post(url, postJson)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 201 || response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        console.log(err);
        if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
        } else {
          ToastMessage.errorMessage(err.response.data.message);
        }
        return false;
      });
  }

  static updateRequest(url, postJson) {
    return axios
      .update(url, postJson)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  static deleteRequest(url) {
    return axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}

export default ApiRequest;
