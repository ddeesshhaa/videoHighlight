const fsExtra = require("fs-extra");

exports.checkReqIsCanceledAndDelPaths = (tempDir, highlightPath, reqId) => {
  if (!global.activeRequests[reqId]) {
    fsExtra.remove(tempDir);
    fsExtra.remove(highlightPath);
    return true;
  }
};

exports.checkReqIsCanceled = (reqId) => {
  if (!global.activeRequests[reqId]) {
    return true;
  }
};
