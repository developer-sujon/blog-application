//external lib import
const userRoutes = require("express").Router();
const {
  registrationUser,
  loginUser,
  updateUser,
  selectUser,
  deleteUser,
} = require("../controller/userControllers");
const { checkLogin } = require("../middleware/authVerify");

//registrationUser
userRoutes.post("/registrationUser", registrationUser);

//loginUser
userRoutes.post("/loginUser", loginUser);

//selectUser
userRoutes.get("/selectUser", checkLogin, selectUser);

//updateUser
userRoutes.patch("/updateUser", checkLogin, updateUser);

//deleteUser
userRoutes.delete("/deleteUser", checkLogin, deleteUser);

module.exports = userRoutes;
