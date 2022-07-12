//external import
const { Schema, model } = require("mongoose");

const userScheme = Schema(
  {
    name: String,
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "disabled"],
      default: "active",
    },
    photo: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

const UserModel = new model("User", userScheme);

module.exports = UserModel;
