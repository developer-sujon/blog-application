//external lib import
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//internal lib import
const TagModel = require("../model/TagModel");

//createTag
exports.createTag = (req, res) => {
  TagModel.create({ ...req.body, user: req.userName }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "there was a server side error" });
    } else {
      res.status(201).json(data);
    }
  });
};

//selectTag
exports.selectTag = (req, res) => {
  TagModel.aggregate(
    [{ $match: { _id: ObjectId(req.params.tagId) } }],
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

//updateTag
exports.updateTag = (req, res) => {
  TagModel.aggregate(
    [
      {
        $match: {
          user: req.userName,
          _id: ObjectId(req.params.tagId),
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        TagModel.updateOne(
          { _id: req.params.tagId, user: req.userName },
          { ...req.body },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "there was a server side error",
              });
            } else {
              res.json(result);
            }
          },
        );
      }
    },
  );
};

//deleteTag
exports.deleteTag = (req, res) => {
  TagModel.aggregate(
    [
      {
        $match: {
          user: req.userName,
          _id: ObjectId(req.params.tagId),
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was a server side error" });
      } else {
        TagModel.deleteOne({ _id: req.params.tagId }, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              message: "there was a server side error",
            });
          } else {
            res.json(result);
          }
        });
      }
    },
  );
};

//selectAllTag
exports.selectAllTag = (req, res) => {
  TagModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "there was a server side error",
      });
    } else {
      res.json(data);
    }
  });
};
