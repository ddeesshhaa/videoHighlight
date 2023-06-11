const { spawn } = require("child_process");
const path = require("path");

exports.runClassificationModel = (framesPath) => {
  return new Promise((resolve, reject) => {
    let frames = framesPath;
    let mainPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "ClassificationModel",
      "main.py"
    );
    const runClassificationModel = spawn(process.env.PYTHON_VERSION, [
      mainPyPath,
      path.join(frames, "/"),
    ]);
    runClassificationModel.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    runClassificationModel.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on classification model" + data);
    });

    runClassificationModel.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code == 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.extractFrames = (tempPath, framesPath, videoName, ext) => {
  return new Promise((resolve, reject) => {
    let frames = framesPath;

    let extractFramesPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "ClassificationModel",
      "utils",
      "extractFrames.py"
    );
    let videoPath = path.join(
      __dirname,
      "../",
      "assets",
      "uploads",
      "videos",
      videoName,
      videoName + "." + ext
    );
    const extractFrames = spawn("python", [
      extractFramesPyPath,
      videoPath,
      frames,
    ]);
    extractFrames.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    extractFrames.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on extracting frames : " + data);
    });

    extractFrames.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve(tempPath, frames);
    });
  });
};
