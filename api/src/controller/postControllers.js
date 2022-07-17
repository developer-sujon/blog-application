//external lib import
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//internal lib import
const PostModel = require("../model/PostModel");

//createPost
exports.createPost = (req, res) => {
  PostModel.create({ ...req.body, user: req.userName }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "there was a server side error" });
    } else {
      res.status(201).json(data);
    }
  });
};

//selectPost
exports.selectPost = (req, res) => {
  PostModel.aggregate(
    [
      { $match: { _id: ObjectId(req.params.postId) } },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
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
          _id: ObjectId(req.params.postId),
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
            { _id: req.params.postId, user: req.userName },
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
          res.status(404).json({ message: "post not found" });
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
          _id: ObjectId(req.params.postId),
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          PostModel.deleteOne({ _id: req.params.postId }, (err, result) => {
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
          res.status(404).json({ message: "post not found" });
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
      if (data && data.length > 0) {
        if (user) {
          PostModel.aggregate(
            [
              { $match: { user } },
              {
                $lookup: {
                  from: "categories",
                  localField: "categories",
                  foreignField: "_id",
                  as: "categories",
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
                  localField: "categories",
                  foreignField: "_id",
                  as: "categories",
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
                  localField: "categories",
                  foreignField: "_id",
                  as: "categories",
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
                  localField: "categories",
                  foreignField: "_id",
                  as: "categories",
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
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    }
  });
};
