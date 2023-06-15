const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const videoModel = require("../models/video.model");
const { promisify } = require("util");
const apiError = require("../errorHandler/apiError");
const logger = require("../errorHandler/logger");

exports.uploadToCloud = async (videoName, path) => {
  var x = "";
  cloudinary.config({
    cloud_name: "dbc3nc7vb",
    api_key: "991987112235953",
    api_secret: "y90XLdfxRWgjXoVBHZA1dSjPUMQ",
  });

  const uploadToCloudinary = promisify(cloudinary.uploader.upload);

  async function uploadVideoToCloudinary(path) {
    try {
      const result = await uploadToCloudinary(path, { resource_type: "video" });

      return result.secure_url;
    } catch (error) {
      throw error;
    }
  }

  async function updateVideoHighlightUrl(videoName, highlightUrl) {
    try {
      await videoModel.findOneAndUpdate(
        { videoName },
        { highlightUrl },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async function processVideo(path, videoName) {
    try {
      const x = await uploadVideoToCloudinary(path);
      await updateVideoHighlightUrl(videoName, x);
      return x;
    } catch (error) {
      throw error;
    }
  }
  return new Promise((resolve, reject) => {
    processVideo(path, videoName)
      .then((x) => {
        resolve(x);
      })
      .catch((error) => {
        logger.error(`Upload to cloud Controller - promise - Error ${error}`);
                reject(error);

      });
  });
};
