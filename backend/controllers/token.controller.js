const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader == null) {
    next(apiError.er(401, "Access Denied"));
  }

  try {
    const verified = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
    user
      .findOne({ _id: verified.id })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        logger.error(`Token Controller - auth - Error ${err}`);
        next(apiError.er(401, "Access Denied"));
      });
  } catch (e) {
    logger.error(`Token Controller - auth - Error ${e}`);
    next(apiError.er(401, "Invalid-token")); // res.status(401).json({ error: "Invalid-token" });
  }
};
