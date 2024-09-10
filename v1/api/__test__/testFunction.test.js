const { AUCTION_STATUS } = require('../config/constant/auctionStatusConstant')
const { QUEUE_ACTION } = require('../config/constant/queueActionConstant')
const { sendToQueue } = require('../queue/kafka/producer.kafka')


async function start() {
    // Update
    // sendToQueue(
    //     {
    //         auction_id: 1205359,
    //         status:2,
    //         auction_status: AUCTION_STATUS[2]
    //     },
    //     QUEUE_ACTION.UPDATE_AUCTION
    // )
    // Insert
    sendToQueue(
        {
            auction_id: 3000000,
        },
        QUEUE_ACTION.DELETE_AUCTION
    )
}
start()
