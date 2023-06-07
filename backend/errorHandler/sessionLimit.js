const user = require("../models/user.model");

exports.requestLimitMiddleware = async (req, res, next) => {
  const now = new Date();

  const userData = await user.findById(req.user._id); // Assuming session is used to store user data
  let userRequest = userData["lastRequest"];

  if (userRequest && now - userRequest < 24 * 60 * 60 * 1000) {
    // Request has already been made within the past 24 hours
    // return res.status(429).send("Request limit exceeded");
    console.log("ddev");
    next();
  } else {
    // Update the user's session or database with the current request time
    await user.findByIdAndUpdate(
      req.user._id,
      { lastRequest: now },
      { new: true }
    );
    next();
  }
};
