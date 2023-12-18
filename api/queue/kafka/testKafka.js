const { QUEUE_ACTION } = require('../../config/constant/queueActionConstant')
const { logger } = require('../../utils/winston')
const { sendToQueue } = require('./producer.kafka')

const startTime = Date.now()
// for (let i = 1; i < 100; i += 1) {
//     sendToQueue('kien test', 'test')
// }
sendToQueue({
    auction_id: 100,
    status: 6
}, QUEUE_ACTION.UPDATE_AUCTION)
const endTime = Date.now()
logger.info(`Send success, time: ${endTime - startTime}`)
