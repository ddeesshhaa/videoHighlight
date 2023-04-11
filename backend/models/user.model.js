const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default: ""
    },
    priv: {
      type: Boolean,
      default: false,
    },
    videos: {
      type: Array,
      default: [],
    },
  })

const user = mongoose.model("User",userSchema)
module.exports = user