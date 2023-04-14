const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const { user } = require("../models/user.model");
dotenv.config({ path: ".env" });
const DB_URL = process.env.DB_URL;

exports.dbConnect = async () => {
  await mongoose.connect(DB_URL);
  console.log("DB Connected");
};

exports.dbDisconnect = async () => {
  await mongoose.disconnect();
  console.log("DB Disconnect");
};

exports.checkData = async (model, key, value) => {
  if ((await model.findOne({ email: value }).exec()) === null) return true;
};
