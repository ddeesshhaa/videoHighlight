const os = require("os");
const videoModel = require("../models/video.model");
const path = require("path");
const fsExtra = require("fs-extra");
const fs = require("fs");
const { promisify } = require("util");
const mkdtemp = promisify(fs.mkdtemp);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const user = require("../models/user.model");
const modelFunctions = require("../modelFunctions/callingFunctions");
const apiError = require("../errorHandler/apiError");

exports.generateVideo = async (req, res, next) => {
  try {
    let video = await videoModel.findById(req.body.id);
    let userId = req.user._id;
    videoName = "Video-" + req.body.id;
    rootFolderName = videoName;
    let ext = video.ext;

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
      video.title
    );
    const tempDir = await mkdtemp(path.join(os.tmpdir(), video.title));
    await Promise.all([
      mkdir(path.join(tempDir, "clips")),
      mkdir(path.join(tempDir, "jpgs")),
      mkdir(path.join(tempDir, "json")),
      mkdir(path.join(tempDir, "result")),
      copyFile(classIndPath, path.join(tempDir, "json", "classInd.txt")),
    ]);

    await modelFunctions
      .callingFunctions(videoName, ext, tempDir, highlightPath)
      .then(() => {
        fsExtra.remove(tempDir);
        user.findByIdAndUpdate(userId, {
          $push: { doneVideos: req.body.id },
        });
        res.status(200).send("generated successfully");
      })
      .catch((err) => {
        next(apiError.intErr(err));
      });
  } catch (error) {
    next(apiError.intErr("Error on generating"));
  }
};
