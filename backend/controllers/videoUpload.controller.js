const videoModel = require("../models/video.model");
const slugify = require("slugify");
const path = require("path");
const { splitVideo } = require("../modelFunctions/splitVideo");
const { clipToJpg } = require("../modelFunctions/clipToJpg");
const { jpgToJson } = require("../modelFunctions/jpgToJson");
const { getVideoName } = require("../modelFunctions/getVideoName");

exports.uploadVideo = (req, res) => {
  if (req.files) {
    let video = req.files.video;
    let videoName = slugify(video.name);
    video
      .mv(path.join(__dirname, "../assets/uploads/videos/", videoName))
      .then((video) => {
        console.log("Uploaded successfully " + video);
      })
      .catch((err) => {
        console.error("Video Upload Error: " + err);
      });
    let data = {
      title: req.body.title,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      score: req.body.score,
      type: req.body.type,
      owner: req.body.owner,
    };
    res.send(videoName);
  }
};

exports.test = async (videoName) => {
  //   await splitVideo("1_224p.mkv");
  //   await clipToJpg("1_224p.mkv");
  await jpgToJson("1_224");
  //   await getVideoName("1_224p");
  console.log("Done");
};
