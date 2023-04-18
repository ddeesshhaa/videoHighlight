const videoModel = require("../models/video.model");

exports.getAllVideos = async (req, res) => {
  let allVideos = await videoModel.find();
  res.send(allVideos);
};
