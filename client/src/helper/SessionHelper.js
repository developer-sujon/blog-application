class SessionHelper {
  static setToken(accessToken) {
    sessionStorage.setItem("accessToken", accessToken);
  }
  static getToken() {
    return sessionStorage.getItem("accessToken");
  }
  static removeToken(key) {
    return sessionStorage.removeItem(key);
  }
  static setUserDetails(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  static getUserDetails() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
  static removeUserDetails(key) {
    return sessionStorage.removeItem(key);
  }
}

export default SessionHelper;
