const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const videoModel = require("../models/video.model");
const { promisify } = require("util");
const apiError = require("../errorHandler/apiError");

exports.uploadToCloud = async (videoName, path) => {
  var x = "";
  cloudinary.config({
    cloud_name: "dbc3nc7vb",
    api_key: "991987112235953",
    api_secret: "y90XLdfxRWgjXoVBHZA1dSjPUMQ",
  });
  // return new Promise((resolve, reject) => {

  // await cloudinary.uploader.upload(
  //   path,
  //   { resource_type: "video" },
  //   (error, result) => {
  //     if (error) {

  //       console.error("Error uploading video to Cloudinary:", error);
  //     }

  //     // Do something with the Cloudinary result, such as saving the URL to a database
  //     // console.log("Video URL:", result.secure_url);
  //     x = result.secure_url;
  //   }
  // );
  // await videoModel.findOneAndUpdate(
  //   { videoName: videoName },
  //   { highlightUrl: x }
  // );
  //   resolve();
  // });

  const uploadToCloudinary = promisify(cloudinary.uploader.upload);

  async function uploadVideoToCloudinary(path) {
    try {
      const result = await uploadToCloudinary(path, { resource_type: "video" });
      // Do something with the Cloudinary result, such as saving the URL to a database
      // console.log('Video URL:', result.secure_url);
      return result.secure_url;
    } catch (error) {
      reject(error);

      // console.error("Error uploading video to Cloudinary:", error);
      // next(apiError.er(500, "Error uploading video to Cloudinary"));
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
      reject(error);

      // next(apiError.er(500, "Error updating video highlight URL"));

      // console.error("Error updating video highlight URL:", error);
      throw error;
    }
  }

  async function processVideo(path, videoName) {
    try {
      const x = await uploadVideoToCloudinary(path);
      await updateVideoHighlightUrl(videoName, x);
      return x;
    } catch (error) {
      // Handle any errors that occur during the process
      // next(apiError.er(500, "An error occurred during video processing"));

      // console.error("An error occurred during video processing:", error);
      // Optionally, throw the error to propagate it further
      throw error;
    }
  }
  return new Promise((resolve, reject) => {
    processVideo(path, videoName)
      .then((x) => {
        resolve(x);
      })
      .catch((error) => {
        reject(error);
        // next(apiError.er(500, "Video processing failed"));

        console.error("Video processing failed:", error);
      });
  });
};
