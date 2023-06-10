const { spawn } = require("child_process");
const path = require("path");

exports.runClassificationModel = (framesPath) => {
  return new Promise((resolve, reject) => {
    mainPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "ClassificationModel",
      "main.py"
    );
    const runClassificationModel = spawn(process.env.PYTHON_VERSION, [
      mainPyPath,
      path.join(framesPath, "/"),
    ]);
    runClassificationModel.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    runClassificationModel.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on step 1");
    });

    runClassificationModel.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code == 0) {
        resolve(true);
      } else {
        resolve(false);
      }
      // resolve(code);
    });
  });
};

exports.extractFrames = (tempDir, framesPath, videoName, ext) => {
  return new Promise((resolve, reject) => {
    extractFramesPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "ClassificationModel",
      "utils",
      "extractFrames.py"
    );
    videoPath = path.join(
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
      framesPath,
    ]);
    extractFrames.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    extractFrames.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on step 1");
    });

    extractFrames.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve(tempDir, framesPath);
    });
  });
};
