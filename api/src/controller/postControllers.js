//external lib import
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//internal lib import
const PostModel = require("../model/PostModel");

//createPost
exports.createPost = (req, res) => {
  let { tagId, categoryId, body, title, photo } = req.body;

  if (tagId) {
    tagId = tagId.split(",").map((item) => item.trim());
  } else {
    tagId = [];
  }

  if (categoryId) {
    categoryId = categoryId.split(",").map((item) => item.trim());
  } else {
    categoryId = [];
  }

  const newPost = {
    body,
    title,
    photo,
    slug: title.replaceAll(" ", "_").toLowerCase(),
    tagId,
    categoryId,
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
      { $sort: { _id: -1 } },
      { $match: { slug: req.params.slug } },
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
            { $sort: { _id: -1 } },
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
            { $sort: { _id: -1 } },
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
            { $sort: { _id: -1 } },
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
            { $sort: { _id: -1 } },
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
