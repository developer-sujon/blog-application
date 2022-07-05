//external lib import
const postRoutes = require("express").Router();

//internal lib import
const {
  createPost,
  selectPost,
  updatePost,
  deletePost,
  selectAllPost,
} = require("../controller/postControllers");
const { checkLogin } = require("../middleware/authVerify");

//createPost
postRoutes.post("/createPost", checkLogin, createPost);

//selectPost
postRoutes.get("/selectPost/:postId", checkLogin, selectPost);

//updatePost
postRoutes.patch("/updatePost/:postId", checkLogin, updatePost);

// //deletePost
postRoutes.delete("/deletePost/:postId", checkLogin, deletePost);

//selectAllPost
postRoutes.get("/selectAllPost", checkLogin, selectAllPost);

module.exports = postRoutes;
