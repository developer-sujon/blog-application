//external lib import
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.getItem("accessToken");

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class ApiRequest {
  static getRequest(url) {
    return axios
      .get(url)
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

  static postRequest(url, postJson) {
    return axios
      .post(url, postJson)
      .then((response) => {
        if (response.status === 201) {
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
        return false;
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
