/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
const moment = require('moment')
const auctionModel = require('../../models/auction')
const { logger } = require('../../utils/winston')

async function startAuction(id, socketIO) {
    socketIO.emit('updateUI')
    const userId = await auctionModel.updateAuction({ status: 2 }, id)

    return userId
}

async function finishAuction(item, socketIO) {
    socketIO.emit('updateUI')
    const result = await auctionModel.finishedAuction(item.auctionId)

    return result
}

async function initAuctionTime(socketIO) {
    const times = await auctionModel.getAllAuctionTime()
    const auctions = times.map(item => {
        return {
            auctionId: item.id,
            timeToStart:
                moment(item.start_time).diff(moment(new Date())) > 0
                    ? moment(item.start_time).diff(moment(new Date()))
                    : 0,
            timeAuction:
                moment(item.start_time)
                    .add(item.time, 'minutes')
                    .diff(moment(new Date())) > 0
                    ? moment(item.start_time)
                          .add(item.time, 'minutes')
                          .diff(moment(new Date()))
                    : 0,
            auctionStatus: item.status
        }
    })

    for (let idx = 0; idx < auctions.length; idx += 1) {
        const item = auctions[idx]
        if (item.timeToStart > 0 && item.timeToStart < 1000000) {
            const timeout = setTimeout(() => {
                logger.info(
                    `-----------Starting for auction id: ${item.auctionId}`
                )
                startAuction(item.auctionId, socketIO).then(sellerId => {
                    const seller = listOnlineUser.find(
                        i => i.user_id === sellerId
                    )
                    if (config.isUseKafka) {
                        logger.info(
                            `Update auction status, auction_id: ${item.auctionId}, status: 2`
                        )
                        sendToQueue(
                            {
                                auction_id: item.auctionId,
                                status: 2
                            },
                            QUEUE_ACTION.UPDATE_AUCTION
                        )
                    }
                    if (seller) {
                        socketIO
                            .to(seller.socket)
                            .emit('startingAuctionSeller', {
                                auction_id: item.id
                            })
                    }
                    clearTimeout(timeout)
                })
            }, item.timeToStart)
        } else if (item.timeAuction > 0 && item.timeAuction < 120000) {
            const timeout = setTimeout(() => {
                finishAuction(item, socketIO).then(result => {
                    const auctioneer = listOnlineUser.find(
                        i => i.user_id === result.auctioneer
                    )
                    const seller = listOnlineUser.find(
                        i => i.user_id === result.seller
                    )
                    if (auctioneer) {
                        socketIO
                            .to(auctioneer.socket)
                            .emit('finishedAuctionAuctioneer', {
                                auction_id: item.id
                            })
                    }
                    if (seller) {
                        socketIO
                            .to(seller.socket)
                            .emit('finishedAuctionSeller', {
                                auction_id: item.id
                            })
                    }
                    logger.info(
                        `---------Finished auction id: ${item.auctionId}. Waiting for seller response`
                    )
                    clearTimeout(timeout)
                })
            }, item.timeAuction)
        }
    }

    logger.info(
        `Auction Pending: ${auctions.filter(i => i.auctionStatus === 1).length}`
    )
    logger.info(
        `Auction Processing: ${
            auctions.filter(i => i.auctionStatus === 2).length
        }`
    )
    logger.info(
        `Auction Waiting for seller response: ${
            auctions.filter(i => i.auctionStatus === 3).length
        }`
    )
    logger.info(
        `Auction Waiting for auctioneer response: ${
            auctions.filter(i => i.auctionStatus === 4).length
        }`
    )
}

module.exports = {
    initAuctionTime
}
