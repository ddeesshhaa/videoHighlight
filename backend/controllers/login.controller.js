const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let x = await user.findOne({ email: email });
  if (x !== null) {
    if (await bcrypt.compare(password, x.password)) {
      const token = jwt.sign({ id: x._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      // res.send(x._id);
      res.status(201).send(token);
    } else {
      res.status(200).send("Wrong Password");
    }
  } else {
    res.status(200).send("Wrong email");
  }
};

exports.check = async (req, res) => {
  if (req.user != null) {
    res.status(200).send("already logged in");
  }
};