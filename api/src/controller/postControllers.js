//external lib import
const ObjectId = require("mongodb").ObjectID;

//internal lib import
const Post = require("../model/Post");

//createPost
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, user: req.userName });
    await newPost.save();
    res.status(201).json({ status: "success", data: "post create successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectPost
exports.selectPost = async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $match: { _id: ObjectId(req.params.postId), user: ObjectId(req.id) },
      },
    ]);

    if (post && post.length > 0) {
      res.json({ status: "success", data: post });
    } else {
      res.status(404).json({ status: "fail", data: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//updatePost
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $match: { _id: ObjectId(req.params.postId), user: ObjectId(req.id) },
      },
    ]);

    if (post && post.length > 0) {
      await Post.updateOne({ _id: req.params.postId }, req.body, { new: true });
      res.json({ status: "success", data: "post update success" });
    } else {
      res.status(404).json({ status: "fail", data: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//deletePost
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $match: { _id: ObjectId(req.params.postId), user: ObjectId(req.id) },
      },
    ]);

    if (post && post.length > 0) {
      await Post.updateOne({ _id: req.params.postId });
      res.json({ status: "success", data: "post detele success" });
    } else {
      res.status(404).json({ status: "fail", data: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectAllPost
exports.selectAllPost = async (req, res) => {
  const category = req.query.category;
  const tag = req.query.tag;
  const userId = req.query.user;

  try {
    if (category) {
      const post = await Post.aggregate([
        {
          $match: { categories: { $in: [category] }, user: req.userName },
        },
      ]);
      if (post && post.length > 0) {
        res.json({ status: "success", data: post });
      } else {
        res.status(404).json({ status: "fail", data: "post not found" });
      }
    } else if (tag) {
      const post = await Post.aggregate([
        {
          $match: { tags: { $in: [tag] }, user: req.userName },
        },
      ]);
      if (post && post.length > 0) {
        res.json({ status: "success", data: post });
      } else {
        res.status(404).json({ status: "fail", data: "post not found" });
      }
    } else if (userId) {
      const post = await Post.aggregate([
        {
          $match: { user: userId },
        },
      ]);
      if (post && post.length > 0) {
        res.json({ status: "success", data: post });
      } else {
        res.status(404).json({ status: "fail", data: "post not found" });
      }
    } else {
      const post = await Post.find({});
      if (post && post.length > 0) {
        res.json({ status: "success", data: post });
      } else {
        res.status(404).json({ status: "fail", data: "post not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};
