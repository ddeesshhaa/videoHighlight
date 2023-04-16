const { spawn } = require("child_process");
const path = require("path");
exports.jpgToJson = async (videoName) => {
  videoName = "1";
  jpgPyPath = path.join(
    __dirname,
    "../",
    "assets",
    "uploads",
    "generate",
    "model",
    "utils",
    "SoccerShoubra_json.py"
  );
  const splitVideo = await spawn("python3", [jpgPyPath, videoName]);
  splitVideo.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  splitVideo.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  splitVideo.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
