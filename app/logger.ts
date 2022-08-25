import winston from 'winston';
import 'winston-daily-rotate-file';

const {
  json,
  prettyPrint,
  splat,
  simple,
  timestamp,
  printf,
  cli,
  combine,
  colorize,
  label,
  align,
} = winston.format;
const { transports, createLogger } = winston;
const format = cli({
  colors: {
    info: 'blue',
    error: 'red',
    warn: 'yellow',
    http: 'magenta',
    debug: 'green',
  },
});
const timezone = () => {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Lagos',
  });
};
const level = () => {
  return process.env.NODE_ENV === 'development' ? 'debug' : 'info';
};
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
// const mongoOptions = {
//   db: String(`${secrets.APP_DB}`),
//   collection: 'logs',
//   decolorize: true,
//   tryReconnect: true,
//   options: {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   },
//   format: combine(
//     timestamp(),
//     // Convert logs to a json format
//     json(),
//   ),
// };

const options: winston.LoggerOptions = {
  levels,
  level: level(),
  transports: [
    // new MongoDB(mongoOptions),
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      format,
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: 'logs/server/error.log',
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: 'logs/server/all.log',
      level: 'info',
      handleExceptions: true,
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '14d',
      level: 'info',
      dirname: 'logs/server/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log',
    }),
  ],
  format: combine(
    colorize({ all: true }),
    label({
      label: 'Label🏷️',
    }),
    json(),
    prettyPrint(),
    splat(),
    simple(),
    align(),
    timestamp({ format: timezone }),
    printf(
      (info) =>
        `${info.level}: ${info.message} -- ⏰ [${info.timestamp}] ${
          info.label || ''
        } `,
    ),
  ),
};

const logger = createLogger(options);
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
  logger.add(
    new transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
