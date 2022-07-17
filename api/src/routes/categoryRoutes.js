//external lib import
const categoryRoutes = require("express").Router();

//internal lib import
const checkLogin = require("../middleware/authVerify");
const {
  createCategory,
  selectCategory,
  deleteCategory,
  selectAllCategory,
  updateCategory,
} = require("../controller/categoryController");

//createCategory
categoryRoutes.post("/createCategory", checkLogin, createCategory);

//selectCategory
categoryRoutes.get("/selectCategory/:tagId", selectCategory);

//updateCategory
categoryRoutes.patch("/updateCategory/:tagId", checkLogin, updateCategory);

// //deleteCategory
categoryRoutes.delete("/deleteCategory/:tagId", checkLogin, deleteCategory);

//selectAllCategory
categoryRoutes.get("/selectAllCategory", selectAllCategory);

module.exports = categoryRoutes;
