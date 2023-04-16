const { spawn } = require("child_process");
const path = require("path");

exports.clipToJpg = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    video = videoName.split(".");
    v = video.slice(0, video.length - 1);
    vName = v.join(".");
    jpgPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "jpg.py"
    );
    const splitVideo = spawn("python3", [jpgPyPath, vName, tempPath]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on step 2");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve({ vName, tempPath });
    });
  });
};
