//external import
const { Schema, model } = require("mongoose");

const categoryScheme = Schema(
  {
    categoryId: {
      type: String,
      default: Math.round(new Date().getTime() / 1000),
    },
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
