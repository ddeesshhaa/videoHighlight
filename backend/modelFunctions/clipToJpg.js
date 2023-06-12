const { spawn } = require("child_process");
const path = require("path");

exports.clipToJpg = (videoName, tempPath, ext) => {
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
      "jpg.py"
    );
    const splitVideo = spawn(process.env.PYTHON_VERSION, [
      jpgPyPath,
      vN,
      tD,
      ex,
    ]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("error on Making JPGs: " + data);
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
