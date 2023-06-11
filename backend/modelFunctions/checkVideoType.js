const os = require("os");
const videoModel = require("../models/video.model");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const mkdtemp = promisify(fs.mkdtemp);
const mkdir = promisify(fs.mkdir);
const user = require("../models/user.model");
const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");

const { runClassificationModel, extractFrames } = require("./runCheckModel");

exports.checkVideo = async (videoName, ext, tempDir, next) => {
  try {
    await Promise.all([
      mkdir(path.join(tempDir, "frames")).then(() => {
        mkdir(path.join(tempDir, "frames", "class1"));
      }),
    ]);
    let framesPath = path.join(tempDir, "frames");
    let classPath = path.join(tempDir, "frames", "class1");
    await extractFrames(tempDir, classPath, videoName, ext);
    let res = await runClassificationModel(framesPath).then((result) => {
      if (result == true) {
        return true;
      } else {
        return false;
      }
    });
    return res;
  } catch (error) {
    logger.error(`Model Functions - checkVideo - Error ${error}`);
    next(apiError.intErr("Error on checkVideo"));
  }
};
