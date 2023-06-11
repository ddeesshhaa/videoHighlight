const { spawn } = require("child_process");
const path = require("path");
exports.jpgToJson = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    // video = videoName.split(".");
    // v = video.slice(0, video.length - 1);
    // vName = v.join(".");
    let vN = videoName;
    let tD = tempPath;
    jpgPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "SoccerShoubra_json.py"
    );
    const splitVideo = spawn(process.env.PYTHON_VERSION, [jpgPyPath, vN, tD]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("Making Json of JPGs" + data);
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
