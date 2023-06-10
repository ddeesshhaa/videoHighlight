const videoModel = require("../models/video.model");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const user = require("../models/user.model");
const ObjectId = require("mongo-objectid");
const mkdir = promisify(fs.mkdir);
const multer = require("multer");
const apiError = require("../errorHandler/apiError");

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
    // FolderName = "Video-" + myId.toString();
    videoNewName = "Video-" + myId.toString();
    // videoNewName = FolderName + "." + ext;

    rootPath = path.join(
      __dirname,
      "../",
      "assets",
      "uploads",
      "videos",
      videoNewName
    );
    mkdir(rootPath);
    video
      .mv(path.join(rootPath, videoNewName + "." + ext))
      .then(() => {
        console.log("Uploaded successfully " + videoNewName);
      })
      .catch((err) => {
        console.error("Video Upload Error: " + err);
        // next(apiError.intErr("Video Upload Error"));
      });
    let data = {
      _id: myId,
      title: vn,
      ext: ext,
      owner: {
        id: req.user._id,
        firstName: req.user.firstName,
        pic: req.user.pic,
      },
      videoName: videoNewName,
    };
    myVid = new videoModel(data);
    await myVid.save();

    await user.findByIdAndUpdate(
      req.user._id,
      {
        $push: { uploadedVideos: myId.toString() },
      },
      { new: true }
    );
    next();

    // res.status(200).send("Video Uploaded");
  } catch (error) {
    // console.log(error);
    next(apiError.intErr("Error on Uploading"));
  }
};

// exports.uploadVideo = async (req, res) => {
//   if (!req.file) {
//     res.status(400).send("No file uploaded");
//     return;
//   }
//   cloudinary.config({
//     cloud_name: "dbc3nc7vb",
//     api_key: "991987112235953",
//     api_secret: "y90XLdfxRWgjXoVBHZA1dSjPUMQ",
//   });
//   cloudinary.uploader.upload(
//     filePath,
//     { resource_type: "video" },
//     (error, result) => {
//       if (error) {
//         console.error("Error uploading video to Cloudinary:", error);
//         res.status(500).send("Error uploading video");
//         return;
//       }

//       // Do something with the Cloudinary result, such as saving the URL to a database
//       console.log("Video URL:", result.secure_url);

//       res.status(200).send("Video uploaded to Cloudinary");
//     }
//   );
// };
