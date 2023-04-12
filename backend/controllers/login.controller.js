const user = require("../models/user.model");
const { dbConnect, dbDisconnect } = require("../utils/db.util");
const bcrypt = require("bcrypt");
const bp = require("body-parser").urlencoded({ extended: true });
const request = require("request-promise");

exports.login = async (req, res) => {
  await dbConnect();
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // console.log(email,password,hash)
  let x = await user.findOne({ email: email });
  if (x !== null) {
    if (await bcrypt.compare(password, x.password)) {
      res.status(200).send(x);
    } else {
      res.status(200).send("Wrong Password");
    }
  } else {
    res.status(404).send("Wrong email");
  }
  dbDisconnect();
};
