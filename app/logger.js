/**
 * Abstraction for global logger
 */
const { createLogger, format, transports } = require('winston');
const { colorize, combine, timestamp, printf } = format

const logger = createLogger({
  level: 'debug',
  format: combine(format.splat(), format.simple()),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({
      filename: '/tmp/log/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD' // Optional for choosing your own timestamp format.
        }),
        format.json()
      )
    }),
    new transports.File({
      filename: '/tmp/log/combined.log',
      level: 'debug',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD' // Optional for choosing your own timestamp format.
        }),
        format.json()
      )
    })
  ]
});

// Define your custom format with printf.
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
console.log(`Environment: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        timestamp(),
        colorize(),
        myFormat
      )
    })
  );
}

// Global Logger
// const log = new WrapperLogger();

const log = logger;
module.exports = { log };
