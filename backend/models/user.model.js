const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: "String", required: true },
  lastName: { type: "String", required: true },
  email: { type: "String", unique: true, required: true },
  password: { type: "String", required: true },
  pic: {
    type: "String",
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },
  priv: {
    type: Boolean,
    default: false,
  },
  favVideos: {
    type: Array,
    default: [],
  },
  doneVideos: {
    type: Array,
    default: [],
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
