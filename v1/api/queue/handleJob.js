require('dotenv').config({ path: '.env' })
const { logger } = require('../utils/winston')
const runner = require('./runner')
function tryParseJson(params) {
    if (params && Array.isArray(params)) {
        return params.map(tryParseJson)
    }
    if (params && typeof params === 'object') {
        Object.keys(params).forEach(key => {
            params[key] = tryParseJson(params[key])
        })

        return params
    }

    let tempVal
    try {
        tempVal = JSON.parse(params)
    } catch (error) {
        tempVal = params
    }

    return tempVal
}

exports.handleJob = async job => {
    try {
        
        logger.info(`Received message: ${job.value}`)
        const { data, action } = tryParseJson(job.value)
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
