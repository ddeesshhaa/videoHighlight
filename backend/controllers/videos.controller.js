const apiError = require("../errorHandler/apiError");
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
    // console.log(error);
    next(apiError.intErr("Error on loading videos"));
  }
};

exports.getUserVideos = async (req, res, next) => {
  try {
    // let videos = [];
    // let userData = await user.findById(req.params.id);
    // for (let videoIdx of userData.doneVideos) {
    //   await videoModel.find({ _id: videoIdx }).then((vid) => {
    //     videos.push(...vid);
    //   });
    // }
    // res.status(200).send({ user: userData, videoData: videos });

    await user
      .findById(req.params.id)

      .then((userData) => {
        let doneVideosIds = userData.doneVideos;
        videoModel
          .find({ _id: { $in: doneVideosIds } })
          .exec()
          .then((videos) => {
            // res.status(200).send(videos);
            res.status(200).send({ user: userData, videoData: videos });
          });
      });
  } catch (error) {
    next(apiError.badReq("User not found"));
  }
};
