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
      res
        .status(500)
        .json({ status: "fail", data: "there was a server side error" });
    } else {
      res.status(201).json({ status: "success", data });
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
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          res.json({ status: "success", data });
        } else {
          res.status(404).json({ status: "fail", data: "post not found" });
        }
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
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          TagModel.updateOne(
            { _id: req.params.tagId, user: req.userName },
            { ...req.body },
            { new: true },
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  status: "fail",
                  data: "there was a server side error",
                });
              } else {
                res.json({ status: "success", data: result });
              }
            },
          );
        } else {
          res.status(404).json({ status: "fail", data: "post not found" });
        }
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
        res
          .status(500)
          .json({ status: "fail", data: "there was a server side error" });
      } else {
        if (data && data.length > 0) {
          TagModel.deleteOne({ _id: req.params.tagId }, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                status: "fail",
                data: "there was a server side error",
              });
            } else {
              res.json({ status: "success", data: result });
            }
          });
        } else {
          res.status(404).json({ status: "fail", data: "post not found" });
        }
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
        status: "fail",
        data: "there was a server side error",
      });
    } else {
      if (data && data.length > 0) {
        res.json({
          status: "success",
          data,
        });
      } else {
        res.status(404).json({ status: "fail", data: "tag not found" });
      }
    }
  });
};
