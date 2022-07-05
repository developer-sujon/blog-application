//external lib import
const tagRoutes = require("express").Router();

//internal lib import
const {
  createTag,
  selectTag,
  updateTag,
  deleteTag,
  selectAllTag,
} = require("../controller/TagController");
const { checkLogin } = require("../middleware/authVerify");

//createTag
tagRoutes.post("/createTag", checkLogin, createTag);

//selectTag
tagRoutes.get("/selectTag/:tagId", checkLogin, selectTag);

//updateTag
tagRoutes.patch("/updateTag/:tagId", checkLogin, updateTag);

// //deleteTag
tagRoutes.delete("/deleteTag/:tagId", checkLogin, deleteTag);

//selectAllTag
tagRoutes.get("/selectAllTag", checkLogin, selectAllTag);

module.exports = tagRoutes;
