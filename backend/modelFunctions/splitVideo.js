const { spawn } = require("child_process");
const path = require("path");

exports.splitVideo = (videoName, ext, tempDir) => {
  return new Promise((resolve, reject) => {
    splitPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "split.py"
    );
    const splitVideo = spawn("python", [splitPyPath, videoName, tempDir, ext]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on step 1");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve({ videoName, tempDir, ext });
    });
  });
};
