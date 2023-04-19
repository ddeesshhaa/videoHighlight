const user = require("../models/user.model");
const { dbConnect, dbDisconnect } = require("../utils/db.util");
const bcrypt = require("bcrypt");
const bp = require("body-parser").urlencoded({ extended: true });
const request = require("request-promise");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  await dbConnect();
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // console.log(email,password,hash)
  let x = await user.findOne({ email: email });
  console.log(x);
  if (x !== null) {
    if (await bcrypt.compare(password, x.password)) {
      const token = jwt.sign({ data: x }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      res.status(200).json({email , token});
    } else {
      res.status(400).send("Wrong Password");
    }
  } else {
    res.status(400).send("Wrong email");
  }
  dbDisconnect();
};
