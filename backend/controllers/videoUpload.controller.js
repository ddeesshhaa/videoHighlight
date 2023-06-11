const videoModel = require("../models/video.model");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const user = require("../models/user.model");
const ObjectId = require("mongo-objectid");
const mkdir = promisify(fs.mkdir);
const multer = require("multer");
const apiError = require("../errorHandler/apiError");
const { checkVideo } = require("../modelFunctions/checkVideoType");
const mkdtemp = promisify(fs.mkdtemp);
const os = require("os");
const { default: mongoose } = require("mongoose");
const logger = require("../errorHandler/logger");

exports.uploadVideo = async (req, res, next) => {
  try {
    let video = req.files.video;
    let videoBaseName = video.name;
    videoBaseNameArray = videoBaseName.split(".");
    let vn = videoBaseNameArray.slice(0, videoBaseNameArray.length - 1);
    vn = vn.join(".");
    ext = videoBaseNameArray[videoBaseNameArray.length - 1];
    var myId = new ObjectId();
    req.body.id = myId;
    videoNewName = "Video-" + myId.toString();

    rootPath = path.join(
      __dirname,
      "../",
      "assets",
      "uploads",
      "videos",
      videoNewName
    );
    mkdir(rootPath);
    video.mv(path.join(rootPath, videoNewName + "." + ext));

    const tempDir = await mkdtemp(path.join(os.tmpdir(), videoNewName));

    let videoType = await checkVideo(videoNewName, ext, tempDir);
    if (videoType) {
      let data = {
        _id: myId,
        title: vn,
        ext: ext,
        owner: req.user._id,
        videoName: videoNewName,
      };
      myVid = new videoModel(data);
      await myVid.save();
      await user.findByIdAndUpdate(
        req.user._id,
        {
          $push: { uploadedVideos: myId },
        },
        { new: true }
      );
      req.tempDir = tempDir;
      next();
    } else {
      res.status(400).send("Not Soccer Video");
    }
  } catch (error) {
    logger.error(
      `USER : ${req.user._id} - Video Upload Controller - uploadVideo - Error ${error}`
    );
    next(apiError.intErr("Error on uploadVideo"));
  }
};
