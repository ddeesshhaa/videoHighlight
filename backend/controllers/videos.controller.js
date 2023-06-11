const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");
const user = require("../models/user.model");
const videoModel = require("../models/video.model");

exports.getAllVideos = async (req, res, next) => {
  try {
    await videoModel
      .find()
      .populate("owner")
      .then((videos) => {
        res.status(200).send(videos);
      });
  } catch (error) {
    logger.error(`Videos Controller - getAllVideos - Error ${error}`);
    next(apiError.intErr("Error on loading videos"));
  }
};

exports.getUserVideos = async (req, res, next) => {
  try {
    await user.findById(req.params.id).then((userData) => {
      let doneVideosIds = userData.doneVideos;
      videoModel
        .find({ _id: { $in: doneVideosIds } })
        .exec()
        .then((videos) => {
          res.status(200).send({ user: userData, videoData: videos });
        });
    });
  } catch (error) {
    logger.error(`Videos Controller - getUserVideos - Error ${error}`);
    next(apiError.badReq("User not found"));
  }
};
