const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../errorHandler/apiError");

exports.login = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await user.findOne({ email: email });
    if (userData !== null) {
      if (await bcrypt.compare(password, userData.password)) {
        const token = jwt.sign(
          { id: userData._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
          }
        );
        // res.send(userData._id);
        res.status(200).json({ userData, token });
      } else {
        next(apiError.er(400, "Wrong Password"));
        // res.status(400).send("Wrong Password");
      }
    } else {
      next(apiError.er(400, "Wrong email"));
      // res.status(400).send("Wrong email");
    }
  } catch (error) {
    next(apiError.intErr("Error"));
  }
};
