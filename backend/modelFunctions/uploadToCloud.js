const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const videoModel = require("../models/video.model");

exports.uploadToCloud = async (videoName, path) => {
  var x = "";
  cloudinary.config({
    cloud_name: "dbc3nc7vb",
    api_key: "991987112235953",
    api_secret: "y90XLdfxRWgjXoVBHZA1dSjPUMQ",
  });
  await cloudinary.uploader.upload(
    path,
    { resource_type: "video" },
    (error, result) => {
      if (error) {
        console.error("Error uploading video to Cloudinary:", error);
      }

      // Do something with the Cloudinary result, such as saving the URL to a database
      // console.log("Video URL:", result.secure_url);
      x = result.secure_url;
    }
  );
  await videoModel.findOneAndUpdate(
    { videoName: videoName },
    { highlightUrl: x }
  );
  return new Promise((resolve, reject) => {
    resolve();
  });
};
