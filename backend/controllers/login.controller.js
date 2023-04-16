const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let x = await user.findOne({ email: email });
  if (x !== null) {
    if (await bcrypt.compare(password, x.password)) {
      const token = jwt.sign({ data: x }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      res.status(200).send(token);
    } else {
      res.status(200).send("Wrong Password");
    }
  } else {
    res.status(404).send("Wrong email");
  }
};
