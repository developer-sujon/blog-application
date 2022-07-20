//external import
const { Schema, model } = require("mongoose");

const tagScheme = Schema(
  {
    tagId: {
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

const TagModel = new model("Tag", tagScheme);

module.exports = TagModel;
