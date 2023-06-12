const { spawn } = require("child_process");
const path = require("path");
exports.getVideoName = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    // video = videoName.split(".");
    // v = video.slice(0, video.length - 1);
    // vName = v.join(".");
    let vN = videoName;
    let tD = tempPath;
    splitPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "getVideoName.py"
    );
    const splitVideo = spawn(process.env.PYTHON_VERSION, [splitPyPath, vN, tD]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("Error on getting Video Names: " + data);
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
