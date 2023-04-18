const videoModel = require("../models/video.model");

exports.getVideosById = (req, res) => {
  videoModel
    .find({ owner: req.body.id })
    .then((videos) => {
      res.send(videos);
    })
    .catch((err) => {
      res.send(err);
    });
};
