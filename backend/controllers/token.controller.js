const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const apiError = require("../errorHandler/apiError");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //check token
  if (authHeader == null) {
    // return res.status(401).json({ error: "Access-denied" });
    next(apiError.er(401, "Access Denied"));

    // req.user = null;
    // next();
  }

  //check validity
  try {
    const verified = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
    userId = { _id: verified.id }; //if verified the token will be decoded and the username of the user will be extracted and passed.
    user
      .findOne({ _id: userId._id })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        // res.send(false);
        // req.user = null;
        next(apiError.er(401, "Access Denied"));
        // next();
      });
  } catch (e) {
    next(apiError.er(401, "Invalid-token")); // res.status(401).json({ error: "Invalid-token" });
    // req.user = null;
    // next();
  }
};
