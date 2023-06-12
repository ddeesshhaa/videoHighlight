const { splitVideo } = require("./splitVideo");
const { clipToJpg } = require("./clipToJpg");
const { getVideoName } = require("./getVideoName");
const { jpgToJson } = require("./jpgToJson");
const { runModel } = require("./runModel");
const { merge } = require("./merge");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { ExtractJson } = require("./jsonExtract");
const { uploadToCloud } = require("./uploadToCloud");
const videoModel = require("../models/video.model");
const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");
const copyFile = promisify(fs.copyFile);

exports.callingFunctions = async (videoName, ext, tempDir, reqId, next) => {
  console.log("Working on => " + videoName);

  try {
    if (!global.activeRequests[reqId]) {
      return;
    }
    await splitVideo(videoName, ext, tempDir);
    console.log("1- Creating Clips Done");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await clipToJpg(videoName, tempDir, ext);
    console.log("2- Clips to JPG Done");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await getVideoName(videoName, tempDir);
    console.log("3- Making Video Names Done");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await jpgToJson(videoName, tempDir);
    console.log("4- Json Created Successfully");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await runModel(tempDir);
    console.log("5- Model Done");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await ExtractJson(videoName, tempDir);
    console.log("6- Extract Json Done");

    if (!global.activeRequests[reqId]) {
      return;
    }
    await merge(tempDir, videoName, ext);
    console.log("7- Merge Done, Path: " + tempDir);

    if (!global.activeRequests[reqId]) {
      return;
    }
    const highlightFilePath = path.join(
      tempDir,
      videoName + "-Highlight." + ext
    );
    // await copyFile(
    //   highlightFilePath,
    //   path.join(highlightPath, videoName + "-Highlight." + ext)
    // );
    let url = await uploadToCloud(videoName, highlightFilePath);
    console.log("8- Upload Done, Url: " + url);
    if (!global.activeRequests[reqId]) {
      return;
    }

    return url;
  } catch (error) {
    logger.error(`Generate Controller - callingFunctions - Error ${error}`);
    next(apiError.intErr("Error on Model Functions"));
  }
};
