const apiError = require("./apiError");

function apiErrorHandler(err, req, res, next) {
  if (err instanceof apiError) {
    res.status(500).send(err.msg);
    return;
  }
  res.send("something went wrong!!");
}

module.exports = apiErrorHandler;
