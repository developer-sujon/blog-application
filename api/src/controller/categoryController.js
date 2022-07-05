//external lib import
const ObjectId = require("mongodb").ObjectID;

//internal lib import
const Category = require("../model/Category");

//createCategory
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category({ ...req.body, user: req.userName });
    await newCategory.save();
    res
      .status(201)
      .json({ status: "success", data: "Category create successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectCategory
exports.selectCategory = async (req, res) => {
  console.log(req.params.categoryId);

  try {
    const category = await Category.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.categoryId),
          user: req.userName,
        },
      },
    ]);

    if (category && category.length > 0) {
      res.json({ status: "success", data: category });
    } else {
      res.status(404).json({ status: "fail", data: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//updateCategory
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.categoryId),
          user: req.userName,
        },
      },
    ]);

    if (category && category.length > 0) {
      await Category.updateOne({ _id: req.params.categoryId }, req.body, {
        new: true,
      });
      res.json({ status: "success", data: "Category update success" });
    } else {
      res.status(404).json({ status: "fail", data: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//deleteCategory
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.categoryId),
          user: req.id,
        },
      },
    ]);

    if (category && category.length > 0) {
      await Category.deleteOne({ _id: req.params.categoryId });
      res.json({ status: "success", data: "Category detele success" });
    } else {
      res.status(404).json({ status: "fail", data: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectAllCategory
exports.selectAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (category && category.length > 0) {
      res.json({ status: "success", data: category });
    } else {
      res.status(404).json({ status: "fail", data: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};
