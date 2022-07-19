//external lib import
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//internal lib import
const PostModel = require("../model/PostModel");

//createPost
exports.createPost = (req, res) => {
  let { categories, tags, body, title } = req.body;

  if (categories) {
    categories = categories.split(",").map((item) => item.trim());
  } else {
    categories = [];
  }

  if (tags) {
    tags = tags.split(",").map((item) => item.trim());
  } else {
    tags = [];
  }

  const newPost = {
    body,
    title,
    slug: title.replaceAll(" ", "_").toLowerCase(),
    categories,
    tags,
    user: req.userName,
  };

  PostModel.aggregate([{ $match: { slug: newPost.slug } }], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "there was a server side error" });
    } else {
      if (data && data.length > 0) {
        res.status(409).json({ message: "Post Already Created" });
      } else {
        PostModel.create(newPost, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "there was a server side error" });
          } else {
            res.status(201).json(data);
          }
        });
      }
    }
  });
};

//selectPost
exports.selectPost = (req, res) => {
  PostModel.aggregate(
    [
      { $match: { slug: req.params.slug } },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "categories",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "tags",
          as: "tags",
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        res.json(data);
      }
    },
  );
};

//updatePost
exports.updatePost = (req, res) => {
  PostModel.aggregate(
    [
      {
        $match: {
          user: req.userName,
          slug: req.params.slug,
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          PostModel.updateOne(
            { slug: req.params.slug, user: req.userName },
            { ...req.body },
            { new: true },
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  message: "there was a server side error",
                });
              } else {
                res.json({ message: "post update successful" });
              }
            },
          );
        } else {
          res.status(400).json({ message: "You Only Update Your Post" });
        }
      }
    },
  );
};

//deletePost
exports.deletePost = (req, res) => {
  PostModel.aggregate(
    [
      {
        $match: {
          user: req.userName,
          slug: req.params.slug,
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          PostModel.deleteOne({ slug: req.params.slug }, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "there was a server side error",
              });
            } else {
              res.json({ message: "post delete successful" });
            }
          });
        } else {
          res.status(400).json({ message: "You only remove your Post" });
        }
      }
    },
  );
};

//selectAllPost
exports.selectAllPost = (req, res) => {
  const { user } = req.query;
  const { category } = req.query;
  const { tag } = req.query;

  PostModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "there was a server side error",
      });
    } else {
      if (user) {
        PostModel.aggregate(
          [
            { $match: { user } },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "categoryId",
                as: "categories",
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tagId",
                foreignField: "tagId",
                as: "tags",
              },
            },
          ],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "there was a server side error",
              });
            } else {
              res.json(data);
            }
          },
        );
      } else if (category) {
        PostModel.aggregate(
          [
            { $match: { category: { $in: [category] } } },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "categoryId",
                as: "categories",
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tagId",
                foreignField: "tagId",
                as: "tags",
              },
            },
          ],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "there was a server side error",
              });
            } else {
              res.json(data);
            }
          },
        );
      } else if (tag) {
        PostModel.aggregate(
          [
            { $match: { tag: { $in: [tag] } } },
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "categoryId",
                as: "categories",
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tagId",
                foreignField: "tagId",
                as: "tags",
              },
            },
          ],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json(data);
            } else {
              res.json(data);
            }
          },
        );
      } else {
        PostModel.aggregate(
          [
            {
              $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "categoryId",
                as: "categories",
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tagId",
                foreignField: "tagId",
                as: "tags",
              },
            },
          ],
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json(data);
            } else {
              res.json(data);
            }
          },
        );
      }
    }
  });
};
