const { logger } = require('../../utils/winston')
const { sendToQueue } = require('./producer.kafka')

const startTime = Date.now()
for (let i = 1; i < 10; i += 1) {
    sendToQueue('kien test', 'test')
}
const endTime = Date.now()
logger.info(`Send success, time: ${endTime - startTime}`)
