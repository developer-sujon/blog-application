//external import
const { Schema, model } = require("mongoose");

const categoryScheme = Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const CategoryModel = new model("Category", categoryScheme);

module.exports = CategoryModel;
