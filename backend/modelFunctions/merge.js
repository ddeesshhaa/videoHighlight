const { spawn } = require("child_process");
const path = require("path");

exports.merge = (tempPath, ext) => {
  return new Promise((resolve, reject) => {
    jpgPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "merge.py"
    );
    const splitVideo = spawn("python", [jpgPyPath, tempPath, ext]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on step 2");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve(tempPath);
    });
  });
};
