const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const { user } = require("../models/user.model");

const DB_URL = process.env.DB_URL;

exports.dbConnect = () => {
  mongoose
    .connect(DB_URL)
    .then((connect) => {
      console.log("Connected to MongoDB: " + connect.connection.host);
    })
    .catch((err) => {
      console.error("Database Error: " + err);
    });
};

exports.dbDisconnect = async () => {
  mongoose
    .disconnect()
    .then((connect) => {
      console.log("Disconnected from MongoDB");
    })
    .catch((err) => {
      console.error("Database Error: " + err);
    });
};

exports.checkData = async (model, key, value) => {
  if ((await model.findOne({ email: value }).exec()) === null) return true;
};
