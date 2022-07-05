//external lib import
const userRoutes = require("express").Router();

//internal lib import
const {
  registratonUser,
  loginUser,
  selectUser,
  updateUser,
  deleteUser,
} = require("../controller/userControllers");
const { checkLogin } = require("../middleware/authVerify");

//registratonUser
userRoutes.post("/registratonUser", registratonUser);

//loginUser
userRoutes.post("/loginUser", loginUser);

//selectUser
userRoutes.get("/selectUser/:userName", checkLogin, selectUser);

//updateUser
userRoutes.patch("/updateUser/:userName", checkLogin, updateUser);

//deleteUser
userRoutes.delete("/deleteUser/:userName", checkLogin, deleteUser);

module.exports = userRoutes;
