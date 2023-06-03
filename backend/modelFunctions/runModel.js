const { spawn } = require("child_process");
const path = require("path");

exports.runModel = (tempDir) => {
  return new Promise((resolve, reject) => {
    mainPyPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "main.py"
    );
    const splitVideo = spawn("python", [
      mainPyPath,
      "--root_path",
      tempDir + "/",
    ]);
    splitVideo.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      // console.log("1-Splitting Video");
    });

    splitVideo.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      // reject("error on step 1");
    });

    splitVideo.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve(tempDir);
    });
  });
};
