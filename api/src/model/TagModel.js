//external import
const { Schema, model } = require("mongoose");

const tagScheme = Schema(
  {
    tagId: {
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

const TagModel = new model("Tag", tagScheme);

module.exports = TagModel;
