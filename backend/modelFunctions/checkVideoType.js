const os = require("os");
const videoModel = require("../models/video.model");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const mkdtemp = promisify(fs.mkdtemp);
const mkdir = promisify(fs.mkdir);
const user = require("../models/user.model");
const apiError = require("../errorHandler/apiError");

const { runClassificationModel, extractFrames } = require("./runCheckModel");

exports.checkVideo = async (videoName, ext, tempDir) => {
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
      //do some shit
      //   return result;
      if (result == true) {
        return true;
      } else {
        return false;
      }
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
