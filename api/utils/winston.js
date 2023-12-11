const winston = require('winston')
const path = require('path')

const parentDir = path.resolve(__dirname, '..')
exports.logger = winston.createLogger({
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
