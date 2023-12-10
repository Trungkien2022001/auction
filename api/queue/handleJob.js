const { logger } = require('../utils/winston')
const runner = require('./runner')

exports.handleJob = async job => {
    try {
        logger.info(`Received message: ${job}`)
        const { data, action } = JSON.parse(job)
        const fn = runner[action]
        if (!fn) {
            logger.error('Invalid action!', action)
        } else {
            await fn(data)
        }
    } catch (error) {
        logger.error('Error when processing message', error)
    }
}
