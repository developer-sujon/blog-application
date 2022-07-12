//external import
const { Schema, model } = require("mongoose");

const tagScheme = Schema(
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

const TagModel = new model("Tag", tagScheme);

module.exports = TagModel;
