const user = require("../models/user.model");
const apiError = require("./apiError");
const logger = require("../errorHandler/logger");


exports.requestLimitMiddleware = async (req, res, next) => {
  try {
    const now = new Date();

    const userData = await user.findById(req.user._id); // Assuming session is used to store user data
    let userRequest = userData["lastRequest"];

    if (userRequest && now - userRequest < 6 * 60 * 60 * 1000) {
      // return res
      //   .status(429)
      //   .send("Request limit exceeded - 1 Video Every 6 Hours");
      console.log("Request Limit Disabled");
      next();
    } else {
      await user.findByIdAndUpdate(
        req.user._id,
        { lastRequest: now },
        { new: true }
      );
      next();
    }
  } catch (error) {
    logger.error(
      `USER : ${req.user._id} - session Limiter - requestLimitMiddleware - Error ${error}`
    );
    next(apiError.intErr("Error on Request Limiter"));
  }
};
