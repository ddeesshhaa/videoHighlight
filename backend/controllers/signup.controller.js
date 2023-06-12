const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");
const user = require("../models/user.model");
const users = require("../models/user.model");
const bcrypt = require("bcrypt");

// const passwordRegex ='(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"';

exports.addUser = async (req, res, next) => {
  try {
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
      next(apiError.er(400, "Email is already exist"));
    } else {
      await users.create(data);
      res.status(200).send("Registered Successfully");
    }
  } catch (error) {
    logger.error(
      `User ${email} - Signup Controller - addUser - Error ${error}`
    );
    next(apiError.intErr("error"));
  }
};
