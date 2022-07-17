//external lib import
const postRoutes = require("express").Router();

const checkLogin = require("../middleware/authVerify");
const {
  selectPost,
  updatePost,
  deletePost,
  createPost,
  selectAllPost,
} = require("../controller/postControllers");

//createPost
postRoutes.post("/createPost", checkLogin, createPost);

//selectPost
postRoutes.get("/selectPost/:postId", selectPost);

//updatePost
postRoutes.patch("/updatePost/:postId", checkLogin, updatePost);

//deletePost
postRoutes.delete("/deletePost/:postId", checkLogin, deletePost);

//selectAllPost
postRoutes.get("/selectAllPost", selectAllPost);

module.exports = postRoutes;
