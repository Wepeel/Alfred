import winston from 'winston';
import expressWinston from 'express-winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.colorize()),
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),

    }));
}

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'white'
});

export const expressWinstonLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    meta: false,
    expressFormat: true,
    colorize: true,
    ignoreRoute(req, res) { return false; }
});