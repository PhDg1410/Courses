const winston = require('winston');
// import winston from "winston"

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, functionName }) => {
      return `[${timestamp}] ${level} in ${functionName}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({filename:"log.txt"})
  ]
});

module.exports = {
    logger:logger
}

