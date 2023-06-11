const { spawn } = require("child_process");
const path = require("path");

exports.merge = (tempPath, videoName, ext) => {
  return new Promise((resolve, reject) => {
    let vN = videoName;
    let tD = tempPath;
    let ex = ext;
    let jpgPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "merge.py"
    );

    let watermarkPath = path.join(__dirname, "../", "assets", "watermark.png");
    const splitVideo = spawn(process.env.PYTHON_VERSION, [
      jpgPyPath,
      tD,
      vN,
      ex,
      watermarkPath,
    ]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on Merging: " + data);
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
