const { spawn } = require("child_process");
const path = require("path");
exports.ExtractJson = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    let jsonExtractPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "jsonExtract.py"
    );
    let resultJsonPath = path.join(tempPath, "result", "test.json");
    const jsonExtract = spawn(process.env.PYTHON_VERSION, [
      jsonExtractPath,
      resultJsonPath,
    ]);
    jsonExtract.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    jsonExtract.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
      // reject("Error on Extracting Json: " + data);
    });

    jsonExtract.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
};
