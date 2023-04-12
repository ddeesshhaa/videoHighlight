const user = require("../models/user.model");
const db = require("../utils/db.util");
const users = require("../models/user.model");
const bcrypt = require("bcrypt");

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
    if (!(await db.checkData(users, "email", req.body.email)) === true) {
      res.status(500).send("failed");
    } else {
      await users.create(data);
      res.status(200).send("Done");
    }
    db.dbDisconnect();
  } else {
    res.status(500).send("Error");
  }
};
