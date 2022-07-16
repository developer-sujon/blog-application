//external lib import
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//internal lib import
const CategoryModel = require("../model/CategoryModel");

//createCategory
exports.createCategory = (req, res) => {
  CategoryModel.create({ ...req.body, user: req.userName }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "there was a server side error" });
    } else {
      res.status(201).json(data);
    }
  });
};

//selectCategory
exports.selectCategory = (req, res) => {
  CategoryModel.aggregate(
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

//updateCategory
exports.updateCategory = (req, res) => {
  CategoryModel.aggregate(
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
        CategoryModel.updateOne(
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

//deleteCategory
exports.deleteCategory = (req, res) => {
  CategoryModel.aggregate(
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
        if (data && data.length > 0) {
          CategoryModel.deleteOne({ _id: req.params.tagId }, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "there was a server side error",
              });
            } else {
              res.json(result);
            }
          });
        } else {
          res.status(404).json({ message: "post not found" });
        }
      }
    },
  );
};

//selectAllCategory
exports.selectAllCategory = (req, res) => {
  CategoryModel.find({}, (err, data) => {
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
