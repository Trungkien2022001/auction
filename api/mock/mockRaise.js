/* eslint-disable no-await-in-loop */
const moment = require('moment')
const _ = require('lodash')
const { createAuctionRaise } = require('../components/auction/controller')
const { knex } = require('../connectors')
const { logger } = require('../utils/winston')
const auctionModel = require('../models/auction')
const notificationModel = require('../models/notification')
const { sendToQueue } = require('../queue/kafka/producer.kafka')
const { QUEUE_ACTION } = require('../config/constant/queueActionConstant')
const config = require('../config')

function getSample(arr, count) {
    const shuffledArr = _.shuffle(arr)

    const sampledArr = shuffledArr.slice(0, count)

    return sampledArr
}
async function getRandomActiveAuction(userId) {
    const auctions = await knex('auction')
        .select()
        .where('status', '2')
        .andWhere('seller_id', '<>', userId)

    return getSample(
        auctions,
        _.random(10, auctions.length < 200 ? auctions.length : 200)
    )
}

async function getRandomUser() {
    const users = await knex('user')
        .select()
        .where({
            del_flag: 0
        })

    return users[_.random(0, users.length - 1)]
}

async function raise(userId, auctionId, price) {
    try {
        await createAuctionRaise({
            body: {
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                price
            },
            user: {
                id: userId,
                free_raise_remain: 10
            },
            auctionId
        })
        await auctionModel.insertUserAuction(userId, auctionId)
        const userIds = await auctionModel.getAllAuctioneerOfAuction(auctionId)
        const index = userIds.findIndex(i => i === userId)
        userIds.splice(index, 1)
        await notificationModel.createNotification(
            4,
            userId,
            auctionId,
            userIds
        )
        await notificationModel.createNotification(
            9,
            userId,
            auctionId,
            userIds
        )
        if (config.isUseKafka) {
            sendToQueue(
                {
                    auction_id: auctionId,
                    sell_price: price
                },
                QUEUE_ACTION.UPDATE_AUCTION
            )
        }
    } catch (error) {
        logger.error(error)
    }
}
async function runMockRaise() {
    const user = await getRandomUser()
    const auctions = await getRandomActiveAuction(user.id)
    logger.info(`Mocking ${auctions.length} raise!`)
    for (let i = 0; i < auctions.length; i += 1) {
        const auction = auctions[i]
        const priceRaise = auction.sell_price + _.random(1, 50) * 100000
        await raise(user.id, auction.id, priceRaise)
        // logger.info(
        //     `Fake raise success, auction_id: ${auction.id}, user_id: ${user.id}, raise_price: ${priceRaise}`
        // )
    }
}
module.exports = {
    runMockRaise
}
