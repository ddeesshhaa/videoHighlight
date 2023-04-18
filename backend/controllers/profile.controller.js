const user = require("../models/user.model");
const videoModel = require("../models/video.model");

exports.getVideosById = (req, res) => {
  videoModel
    .find({ owner: req.user._id })
    .then((videos) => {
      res.send(videos);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getData = (req, res) => {
  res.send(req.user);
};

exports.addToFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $push: { favVideos: req.body.videoId },
    });
    res.status(201).send(req.user._id);
  } else {
    res.redirect("/login");
  }
};

exports.removeFromFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $pull: { favVideos: req.body.videoId },
    });
    res.status(201).send(req.user._id);
  } else {
    res.redirect("/login");
  }
};
