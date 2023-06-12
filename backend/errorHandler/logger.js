const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "app.log" })],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.colorize()
  ),
});

module.exports = logger;
