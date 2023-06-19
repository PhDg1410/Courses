"use strict";

var winston = require('winston');
// import winston from "winston"

var logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.printf(function (_ref) {
    var level = _ref.level,
      message = _ref.message,
      timestamp = _ref.timestamp,
      functionName = _ref.functionName;
    return "[".concat(timestamp, "] ").concat(level, " in ").concat(functionName, ": ").concat(message);
  })),
  transports: [new winston.transports.File({
    filename: "log.txt"
  })]
});
module.exports = {
  logger: logger
};