const { spawn } = require("child_process");
const path = require("path");
exports.getVideoName = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    // video = videoName.split(".");
    // v = video.slice(0, video.length - 1);
    // vName = v.join(".");
    splitPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "getVideoName.py"
    );
    const splitVideo = spawn("python", [splitPyPath, videoName, tempPath]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("Error on step 3");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve({ videoName, tempPath });
    });
  });
};
