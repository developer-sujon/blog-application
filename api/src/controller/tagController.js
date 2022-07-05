//external lib import
const ObjectId = require("mongodb").ObjectID;

//internal lib import
const Tag = require("../model/Tag");

//createTag
exports.createTag = async (req, res) => {
  try {
    const newTag = new Tag({ ...req.body, user: req.userName });
    await newTag.save();
    res.status(201).json({ status: "success", data: "Tag create successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectTag
exports.selectTag = async (req, res) => {
  console.log(req.params.tagId);

  try {
    const tag = await Tag.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.tagId),
          user: req.userName,
        },
      },
    ]);

    if (tag && tag.length > 0) {
      res.json({ status: "success", data: tag });
    } else {
      res.status(404).json({ status: "fail", data: "Tag not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//updateTag
exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.tagId),
          user: req.userName,
        },
      },
    ]);

    if (tag && tag.length > 0) {
      await Tag.updateOne({ _id: req.params.tagId }, req.body, {
        new: true,
      });
      res.json({ status: "success", data: "Tag update success" });
    } else {
      res.status(404).json({ status: "fail", data: "Tag not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//deleteTag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.tagId),
          user: req.userName,
        },
      },
    ]);

    if (tag && tag.length > 0) {
      await Tag.deleteOne({ _id: req.params.tagId });
      res.json({ status: "success", data: "Tag detele success" });
    } else {
      res.status(404).json({ status: "fail", data: "Tag not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};

//selectAllTag
exports.selectAllTag = async (req, res) => {
  try {
    const tag = await Tag.find({});
    if (tag && tag.length > 0) {
      res.json({ status: "success", data: tag });
    } else {
      res.status(404).json({ status: "fail", data: "Tag not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", data: error });
  }
};
