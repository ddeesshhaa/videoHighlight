const apiError = require("../errorHandler/apiError");
const user = require("../models/user.model");
const videoModel = require("../models/video.model");

exports.getAllVideos = async (req, res, next) => {
  try {
    let allVideos = await videoModel.find();
    res.send(allVideos);
  } catch (error) {
    next(apiError.intErr("Error on loading videos"));
  }
};

exports.getUserVideos = async (req, res, next) => {
  try {
    let videos = [];
    let userData = await user.findById(req.params.id);
    for (let videoIdx of userData.doneVideos) {
      await videoModel.find({ _id: videoIdx }).then((vid) => {
        videos.push(...vid);
      });
    }
    res.status(200).json({ user: userData, videoData: videos });
  } catch (error) {
    next(apiError.badReq("User not found"));
  }
};
