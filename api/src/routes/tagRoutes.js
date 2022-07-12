//external lib import
const tagRoutes = require("express").Router();

//internal lib import
const { checkLogin } = require("../middleware/authVerify");
const {
  createTag,
  selectTag,
  updateTag,
  deleteTag,
  selectAllTag,
} = require("../controller/TagController");

//createTag
tagRoutes.post("/createTag", checkLogin, createTag);

//selectTag
tagRoutes.get("/selectTag/:tagId", selectTag);

//updateTag
tagRoutes.patch("/updateTag/:tagId", checkLogin, updateTag);

// //deleteTag
tagRoutes.delete("/deleteTag/:tagId", checkLogin, deleteTag);

//selectAllTag
tagRoutes.get("/selectAllTag", selectAllTag);

module.exports = tagRoutes;
