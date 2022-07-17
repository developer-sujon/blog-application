//external lib import
const userRoutes = require("express").Router();
const {
  registrationUser,
  loginUser,
  updateUser,
  selectUser,
  deleteUser,
} = require("../controller/userControllers");
const checkLogin = require("../middleware/authVerify");

//registrationUser
userRoutes.post("/registrationUser", registrationUser);

//loginUser
userRoutes.post("/loginUser", loginUser);

//selectUser
userRoutes.get("/selectUser/:userName", selectUser);

//updateUser
userRoutes.patch("/updateUser/:userName", checkLogin, updateUser);

//deleteUser
userRoutes.delete("/deleteUser/:userName", checkLogin, deleteUser);

module.exports = userRoutes;
