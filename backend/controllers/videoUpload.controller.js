const videoModel = require("../models/video.model");
const slugify = require("slugify");
const path = require("path");
const modelFunctions = require("../modelFunctions/callingFunctions");
const fs = require("fs");
const os = require("os");

const { promisify } = require("util");
const { runModel } = require("../modelFunctions/runModel");
const mkdtemp = promisify(fs.mkdtemp);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

exports.uploadVideo = (req, res) => {
  if (req.files) {
    let video = req.files.video;
    let videoName = slugify(video.name);
    video
      .mv(path.join(__dirname, "../assets/uploads/videos/", videoName))
      .then((video) => {
        console.log("Uploaded successfully " + video);
      })
      .catch((err) => {
        console.error("Video Upload Error: " + err);
      });
    let data = {
      title: req.body.title,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      score: req.body.score,
      type: req.body.type,
      owner: req.body.owner,
    };
    res.send(videoName);
  }
};

exports.test = async (req, res) => {
  videoName = "england-chelsea.mkv";
  rootFolderName = videoName.split(".");
  rootFolderName = rootFolderName.slice(0, rootFolderName.length - 1);
  rootFolderName = rootFolderName.join(".");

  const classIndPath = path.join(
    __dirname,
    "../",
    "assets",
    "generate",
    "classInd.txt"
  );

  const tempDir = await mkdtemp(path.join(os.tmpdir(), rootFolderName));
  await Promise.all([
    mkdir(path.join(tempDir, "clips")),
    mkdir(path.join(tempDir, "jpgs")),
    mkdir(path.join(tempDir, "json")),
    mkdir(path.join(tempDir, "result")),
    copyFile(classIndPath, path.join(tempDir, "json", "classInd.txt")),
  ]);

  await modelFunctions.callingFunctions(videoName, tempDir);
  res.send(tempDir);
  // await fsExtra.remove(tempDir);
};
