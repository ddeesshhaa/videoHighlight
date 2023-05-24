const { spawn } = require("child_process");
const path = require("path");
exports.ExtractJson = (videoName, tempPath) => {
  return new Promise((resolve, reject) => {
    jsonExtractPath = path.join(
      __dirname,
      "../",
      "assets",
      "generate",
      "model",
      "utils",
      "jsonExtract.py"
    );
    resultJsonPath = path.join(tempPath, "result", "test.json");
    const jsonExtract = spawn("python", [jsonExtractPath, resultJsonPath]);
    jsonExtract.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
    });

    jsonExtract.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      // reject("Error on step 3");
    });

    jsonExtract.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      resolve({ videoName, tempPath });
    });
  });
};
