const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default: "user.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    uploadedVideos: {
      type: Array,
      default: [],
    },
    favVideos: {
      type: Array,
      default: [],
    },
    doneVideos: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
