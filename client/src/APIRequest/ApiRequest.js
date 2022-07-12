//external lib import
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.getItem("token");

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
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  static postRequest(url, postJson) {
    return axios
      .post(url, postJson)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          return response;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  static updateRequest(url, postJson) {
    return axios
      .update(url, postJson)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          return null;
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
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}

export default ApiRequest;
