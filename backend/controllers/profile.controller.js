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
  res.status(200).send(req.user);
};

exports.addToFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $push: { favVideos: req.body.videoId },
    });
    res.status(200).send(req.user._id);
  } else {
    res.status(401).send(" The user is not authorized");
  }
};

exports.removeFromFav = async (req, res) => {
  if (req.user !== undefined) {
    await user.findByIdAndUpdate(req.user._id, {
      $pull: { favVideos: req.body.videoId },
    });
    res.status(200).send(req.user._id);
  } else {
    res.status(401).send(" The user is not authorized");
  }
};

exports.uploadProfilePic = async (req, res) => {
  pict = {
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  };
  await user.findByIdAndUpdate(req.user._id, {
    pic: pict,
  });

  res.status(200).send("done");
};
