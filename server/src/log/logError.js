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

function testFunction() {
  try {
    console.log(x)
  } catch (error) {
    logger.error(error, { functionName: testFunction.name });
  }
}

// testFunction();

module.exports = {
    logger:logger
}

