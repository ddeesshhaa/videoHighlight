const videoModel = require("../models/video.model");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const user = require("../models/user.model");
const ObjectId = require("mongo-objectid");
const mkdir = promisify(fs.mkdir);
const apiError = require("../errorHandler/apiError");
const { checkVideo } = require("../modelFunctions/checkVideoType");
const mkdtemp = promisify(fs.mkdtemp);
const os = require("os");
const logger = require("../errorHandler/logger");
const {
  checkReqIsCanceled,
  checkReqIsCanceledAndDelPaths,
} = require("../errorHandler/reqCancel");
const ffmpeg = require("fluent-ffmpeg");
const fsExtra = require("fs-extra");

exports.uploadVideo = async (req, res, next) => {
  try {
    req.reqId = req.body.requestId;
    let reqId = req.reqId;
    global.activeRequests[reqId] = true;

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

    await mkdir(rootPath);
    let videoPath = path.join(rootPath, videoNewName + "." + ext);
    await video.mv(videoPath);

    const getVideoDuration = (videoPath) => {
      return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            const duration = metadata.format.duration; // Duration in seconds
            const minDuration = 30;
            if (duration < minDuration) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        });
      });
    };

    const tempDir = await mkdtemp(path.join(os.tmpdir(), videoNewName));
    if (checkReqIsCanceledAndDelPaths(tempDir, rootPath, reqId)) {
      return res.status(204).send("Request canceled");
    }
    let videoType = await checkVideo(videoNewName, ext, tempDir);
    if (videoType) {
      if (!(await getVideoDuration(videoPath))) {
        fsExtra.remove(rootPath);
        fsExtra.remove(tempDir);
        return res.status(401).send("The Video not at least 5 minutes");
      }
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
      fsExtra.remove(rootPath);
      fsExtra.remove(tempDir);
    }
  } catch (error) {
    logger.error(
      `USER : ${req.user._id} - Video Upload Controller - uploadVideo - Error ${error}`
    );
    next(apiError.intErr("Error on uploadVideo"));
  }
};
