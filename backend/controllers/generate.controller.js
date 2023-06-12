const videoModel = require("../models/video.model");
const path = require("path");
const fsExtra = require("fs-extra");
const user = require("../models/user.model");
const modelFunctions = require("../modelFunctions/callingFunctions");
const logger = require("../errorHandler/logger");
const fs = require("fs");
const apiError = require("../errorHandler/apiError");
const { promisify } = require("util");
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

const activeRequests = {};

exports.generateVideo = async (req, res, next) => {
  try {
    let reqId = req.body.requestId;
    activeRequests[reqId] = true;
    console.log(reqId);
    let video = await videoModel.findById(req.body.id);
    let userId = req.user._id;
    videoName = "Video-" + req.body.id;
    rootFolderName = videoName;
    let ext = video.ext;

    const classIndPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "classInd.txt"
    );
    let highlightPath = path.join(
      __dirname,
      "../",
      "assets",
      "uploads",
      "videos",
      videoName
    );
    tempDir = req.tempDir;
    await Promise.all([
      mkdir(path.join(tempDir, "clips")),
      mkdir(path.join(tempDir, "jpgs")),
      mkdir(path.join(tempDir, "json")),
      mkdir(path.join(tempDir, "result")),
      copyFile(classIndPath, path.join(tempDir, "json", "classInd.txt")),
    ]);
    if (!activeRequests[reqId]) {
      fsExtra.remove(tempDir);
      fsExtra.remove(highlightPath);
      return res.status(201).json({ message: "Request canceled" });
    }
    let url = await modelFunctions.callingFunctions(
      videoName,
      ext,
      tempDir,
      activeRequests,
      reqId,
      next
    );
    if (!activeRequests[reqId]) {
      fsExtra.remove(tempDir);
      fsExtra.remove(highlightPath);
      return res.status(201).json({ message: "Request canceled" });
    }
    await user.findByIdAndUpdate(
      userId,
      {
        $push: { doneVideos: req.body.id },
      },
      { new: true }
    );

    if (url) {
      res.status(200).json({ urlH: url });
      fsExtra.remove(tempDir);
      fsExtra.remove(highlightPath);
    } else {
      res.status(201).send("cancelled");
      fsExtra.remove(tempDir);
      fsExtra.remove(highlightPath);
    }
    delete activeRequests[reqId];
  } catch (error) {
    logger.error(`User ${req.user._id} - Generate Controller - Error ${error}`);
    next(apiError.intErr("Error on generating"));
    delete activeRequests[reqId];
  }
};

exports.cancelRequest = async (req, res, next) => {
  const requestId = req.body.requestId;

  activeRequests[requestId] = false;

  res.status(200).json({ message: "Request canceled" });
};
