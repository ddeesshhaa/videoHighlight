const apiError = require("../errorHandler/apiError");
const videoModel = require("../models/video.model");

exports.getAllVideos = async (req, res, next) => {
  try {
    let allVideos = await videoModel.find();
    res.send(allVideos);
  } catch (error) {
    next(apiError.intErr("Error on loading videos"));
  }
};
