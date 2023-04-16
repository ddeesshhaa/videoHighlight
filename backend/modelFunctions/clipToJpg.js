const { spawn } = require("child_process");
const path = require("path");

exports.clipToJpg = async (videoName) => {
  video = videoName.split(".");
  v = video.slice(0, video.length - 1);
  vName = v.join(".");
  jpgPyPath = path.join(
    __dirname,
    "../",
    "assets",
    "uploads",
    "generate",
    "model",
    "utils",
    "jpg.py"
  );
  const splitVideo = await spawn("python3", [jpgPyPath, vName]);
  splitVideo.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  splitVideo.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  splitVideo.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  //   next();
};
