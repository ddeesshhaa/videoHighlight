const { spawn } = require("child_process");
const path = require("path");

exports.splitVideo = async (videoName) => {
  splitPyPath = path.join(
    __dirname,
    "../",
    "assets",
    "uploads",
    "generate",
    "model",
    "utils",
    "split.py"
  );
  const splitVideo = await spawn("python3", [splitPyPath, videoName]);
  splitVideo.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  splitVideo.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  splitVideo.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    // this.clipToJpgs();
  });
};
