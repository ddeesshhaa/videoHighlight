const videoModel = require("../models/video.model");
const slugify = require("slugify");
const path = require("path");
const modelFunctions = require("../modelFunctions/callingFunctions");
const fs = require("fs");
const os = require("os");
const fsExtra = require("fs-extra");

const { promisify } = require("util");
const { runModel } = require("../modelFunctions/runModel");
const mkdtemp = promisify(fs.mkdtemp);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const userModel = require("../models/user.model");

exports.uploadVideo = (req, res) => {
  // if (req.files) {
  //   let video = req.files.video;
  //   let videoBaseName = (video.name);
  // videoBaseNameArray = videoBaseName.split(".");
  // FolderName = videoBaseNameArray.slice(0, videoBaseNameArray.length - 1);
  // ext = videoBaseNameArray[videoBaseNameArray.length - 1];
  // rootFolderName = FolderName.join(".");
  //   video
  //     .mv(path.join(__dirname, "../assets/uploads/videos/",rootFolderName, videoName))
  //     .then((video) => {
  //       console.log("Uploaded successfully " + video);
  //     })
  //     .catch((err) => {
  //       console.error("Video Upload Error: " + err);
  //     });
  //   let data = {
  //     title: req.body.title,
  //     owner: req.body.owner,
  //   };
  //   res.send(videoName);
  // }
  let data = {
    title: req.body.title,
    owner: req.body.owner,
  };
  videoModel.create(data);
  res.status(201).send("Success");
};

exports.generateVideo = async (req, res) => {
  let video = await videoModel.findById(req.body.id);
  let userId = req.body.owner;
  // // videoName = "england-chelsea.mkv";
  // // videoName = "englandeplBournemouthChelsea2sts7.mkv";
  // // videoName = "englandeplArsenalLeicester1stc0.mkv";
  videoName = video.title;
  videoArray = videoName.split(".");
  rootFolderName = videoArray.slice(0, videoArray.length - 1);
  ext = videoArray[videoArray.length - 1];
  rootFolderName = rootFolderName.join(".");
  // res.send(rootFolderName);

  const classIndPath = path.join(
    __dirname,
    "../",
    "assets",
    "generate",
    "classInd.txt"
  );
  highlightPath = path.join(
    __dirname,
    "../",
    "assets",
    "uploads",
    "videos",
    rootFolderName
  );
  const tempDir = await mkdtemp(path.join(os.tmpdir(), rootFolderName));
  await Promise.all([
    mkdir(path.join(tempDir, "clips")),
    mkdir(path.join(tempDir, "jpgs")),
    mkdir(path.join(tempDir, "json")),
    mkdir(path.join(tempDir, "result")),
    copyFile(classIndPath, path.join(tempDir, "json", "classInd.txt")),
  ]);

  await modelFunctions.callingFunctions(videoName, tempDir, highlightPath);
  fsExtra.remove(tempDir),
    // await userModel.findByIdAndUpdate(
    //   { userId },
    //   { $addToSet: { doneVideos: { $each: [req.body.id] } } }
    // );
    res.send(highlightPath);
};
