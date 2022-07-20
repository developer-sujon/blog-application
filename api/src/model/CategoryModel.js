//external import
const { Schema, model } = require("mongoose");

const categoryScheme = Schema(
  {
    categoryId: {
      type: Number,
      default: function () {
        return Math.floor(Date.now() / 1000);
      },
      unique: true,
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
