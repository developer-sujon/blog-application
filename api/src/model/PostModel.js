//external import
const { Schema, model } = require("mongoose");

const postScheme = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    photo: {
      type: String,
      default: "https://www.allbusiness.com/asset/2017/12/Blog-concept.jpg",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    user: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const PostModel = new model("Post", postScheme);

module.exports = PostModel;
