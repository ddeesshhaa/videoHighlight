const user = require("../models/user.model");
const db = require("../utils/db.util");
const users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.addUser = async (req, res) => {
  if (Object.keys(req.body).length == 4) {
    await db.dbConnect();
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };
    const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
    if (!(await db.checkData(users, "email", req.body.email)) === true) {
      res.status(500).send("failed");
    } else {
      await users.create(data);
      res.status(200).send(token);
    }
    db.dbDisconnect();
  } else {
    res.status(500).send("Error");
  }
};
