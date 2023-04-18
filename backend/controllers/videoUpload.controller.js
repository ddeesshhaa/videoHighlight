const videoModel = require("../models/video.model");
const slugify = require("slugify");
const path = require("path");

exports.uploadVideo = (req, res) => {
  if (req.files) {
    let video = req.files.video;
    let videoBaseName = video.name;
    videoBaseNameArray = videoBaseName.split(".");
    FolderName = videoBaseNameArray.slice(0, videoBaseNameArray.length - 1);
    ext = videoBaseNameArray[videoBaseNameArray.length - 1];
    rootFolderName = FolderName.join(".");
    video
      .mv(
        path.join(
          __dirname,
          "../assets/uploads/videos/",
          rootFolderName,
          videoName
        )
      )
      .then((video) => {
        console.log("Uploaded successfully " + video);
      })
      .catch((err) => {
        console.error("Video Upload Error: " + err);
      });
    let data = {
      title: req.body.title,
      owner: req.body.owner,
    };
    res.send(videoName);
  }
  let data = {
    title: req.body.title,
    owner: req.body.owner,
  };
  videoModel.create(data);
  res.status(201).send("Success");
};
