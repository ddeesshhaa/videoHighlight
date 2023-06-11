const { spawn } = require("child_process");
const path = require("path");

exports.splitVideo = (videoName, ext, tempDir) => {
  return new Promise((resolve, reject) => {
    let vN = videoName;
    let tD = tempDir;
    let ex = ext;

    let splitPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "split.py"
    );
    const splitVideo = spawn(process.env.PYTHON_VERSION, [
      splitPyPath,
      vN,
      tD,
      ex,
    ]);
    splitVideo.stdout.on("data", (data) => {
      // console.log(data);
      console.log(`stdout: ${data}`);
    });

    splitVideo.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      // reject("Can't Split Video:" + data);
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
