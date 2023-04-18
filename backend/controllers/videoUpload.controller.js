const videoModel = require("../models/video.model");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const user = require("../models/user.model");
const ObjectId = require("mongo-objectid");
const mkdir = promisify(fs.mkdir);

exports.uploadVideo = async (req, res) => {
  if (req.files) {
    let video = req.files.video;
    let videoBaseName = video.name;
    videoBaseNameArray = videoBaseName.split(".");
    ext = videoBaseNameArray[videoBaseNameArray.length - 1];
    var myId = new ObjectId();
    // FolderName = "Video-" + myId.toString();
    videoNewName = "Video-" + myId.toString();
    // videoNewName = FolderName + "." + ext;

    rootPath = path.join(
      __dirname,
      "../",
      "assets",
      "uploads",
      "videos",
      videoNewName
    );
    mkdir(rootPath),
      video
        .mv(path.join(rootPath, videoNewName + "." + ext))
        .then((video) => {
          console.log("Uploaded successfully " + videoNewName);
        })
        .catch((err) => {
          console.error("Video Upload Error: " + err);
        });
    let data = {
      _id: myId,
      title: videoNewName,
      ext: ext,
      owner: req.user._id,
    };
    myVid = new videoModel(data);
    await myVid.save();
    await user.findByIdAndUpdate(req.user._id, {
      $push: { uploadedVideos: myId.toString() },
    });
    res.send(data);
  }
};
