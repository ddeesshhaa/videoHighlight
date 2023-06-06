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
const copyFile = promisify(fs.copyFile);

exports.callingFunctions = async (
  videoName,
  ext,
  tempDir,
  highlightPath,
  next
) => {
  console.log("Working on => " + videoName);

  try {
    const video = await splitVideo(videoName, ext, tempDir);
    console.log("1- Creating Clips Done");

    const video2 = await clipToJpg(videoName, video.tempDir, video.ext);
    console.log("2- Clips to JPG Done");

    const video3 = await getVideoName(videoName, video2.tempPath);
    console.log("3- Making Video Names Done");

    const video4 = await jpgToJson(videoName, video3.tempPath);
    console.log("4- Json Created Successfully");

    const video5 = await runModel(video4.tempPath);
    console.log("5- Model Done");

    const video6 = await ExtractJson(videoName, tempDir);
    console.log("6- Extract Json Done");

    await merge(tempDir, videoName, ext);
    console.log("7- Merge Done, Path: " + tempDir);

    const highlightFilePath = path.join(
      tempDir,
      videoName + "-Highlight." + ext
    );
    await copyFile(
      highlightFilePath,
      path.join(highlightPath, videoName + "-Highlight." + ext)
    );

    let url = await uploadToCloud(videoName, highlightFilePath);

    return url;
  } catch (error) {
    throw error;

    // next(apiError.intErr("error"));
  }
};
