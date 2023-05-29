const { spawn } = require("child_process");
const path = require("path");

exports.clipToJpg = (videoName, tempPath, ext) => {
  return new Promise((resolve, reject) => {
    vName = videoName;
    ext = ext;
    jpgPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "jpg.py"
    );
    const splitVideo = spawn("python", [jpgPyPath, videoName, tempPath, ext]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on Making JPGs");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve({ vName, tempPath });
    });
  });
};
