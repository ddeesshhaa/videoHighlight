const user = require("../models/user.model");
const users = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  if (Object.keys(req.body).length == 4) {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      pic: {
        name: req.file.originalname,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      },
    };
    if (!((await user.findOne({ email: req.body.email })) === null)) {
      res.status(500).send("failed");
    } else {
      await users.create(data);
      res.status(200).send("Done");
    }
  } else {
    res.status(500).send("Error");
  }
};

exports.check = (req, res) => {
  if (req.user != null) {
    res.status(404).send("Cant signup when logged in");
  }
};
