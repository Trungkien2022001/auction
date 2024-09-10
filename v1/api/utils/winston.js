const winston = require('winston')
const path = require('path')

const parentDir = path.resolve(__dirname, '..')

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.printf(log => {
            if (log.stack)
                return `[${log.timestamp}] [${log.level}] ${log.stack}`

            return `[${log.timestamp}] [${log.level}] ${log.message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'error',
            filename: path.join(parentDir, 'log', 'errors.log')
        }),
        new winston.transports.File({
            level: 'warning',
            filename: path.join(parentDir, 'log', 'warnings.log')
        }),
        new winston.transports.File({
            level: 'info',
            filename: path.join(parentDir, 'log', 'info.log'),
            // silent: true
        })
    ]
})

function customLogger(message, type, level="info") {
    const fileName = type ? `${type}.log` : `${level}.log`;
    const fileTransport = new winston.transports.File({
        level: level,
        filename: path.join(parentDir, 'log', fileName)
    });

    logger.add(fileTransport);
    logger.log({
        level: level,
        message: message
    });

    logger.remove(fileTransport);
}

logger.custom = customLogger

exports.logger = logger
