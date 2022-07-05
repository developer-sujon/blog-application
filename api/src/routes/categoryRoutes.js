//external lib import
const categoryRoutes = require("express").Router();

//internal lib import
const {
  createCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
  selectAllCategory,
} = require("../controller/categoryController");
const { checkLogin } = require("../middleware/authVerify");

//createcategory
categoryRoutes.post("/createcategory", checkLogin, createCategory);

//selectcategory
categoryRoutes.get("/selectcategory/:categoryId", checkLogin, selectCategory);

//updatecategory
categoryRoutes.patch("/updatecategory/:categoryId", checkLogin, updateCategory);

// //deletecategory
categoryRoutes.delete(
  "/deletecategory/:categoryId",
  checkLogin,
  deleteCategory,
);

//selectAllcategory
categoryRoutes.get("/selectAllcategory", checkLogin, selectAllCategory);

module.exports = categoryRoutes;
