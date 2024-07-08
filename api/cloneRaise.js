/* eslint-disable no-await-in-loop */
// const Promise = require('bluebird')
// const request = Promise.promisifyAll(require('request'))
const moment = require('moment')
const auctionModel = require('./models/auction')
const notificationModel = require('./models/notification')
const auctionController = require('./components/auction/controller')
const { redis, knex } = require('./connectors')
const { logger } = require('./utils/winston')

async function handleRaise(params) {
    const { userId, auctionId } = params
    await redis.del(`auction:auction:${auctionId}`)
    await auctionModel.insertUserAuction(userId, auctionId)
    const userIds = await auctionModel.getAllAuctioneerOfAuction(auctionId)
    const index = userIds.findIndex(i => i === userId)
    userIds.splice(index, 1)
    await notificationModel.createNotification(4, userId, auctionId, userIds)
    await notificationModel.createNotification(9, userId, auctionId, userIds)
}
async function get() {
    const users = await knex('user')
        .select()
        .map(i => i.id)
    const user_l = users.length
    const auction = await knex('auction')
        .select()
        .where('status', 2)
        .map(i => i.id)
    const auction_l = auction.length
    const count = 1000
    for (let i = 0; i < count; i += 1) {
        const auctionId = auction[Math.floor(Math.random() * auction_l)]
        const cnt = Math.floor(Math.random() * 20) + 1
        for (let j = 0; j < cnt; j += 1) {
            const user = {
                id: users[Math.floor(Math.random() * user_l)]
            }
            const time = moment().format()
            const price = Math.floor(Math.random() * 1000) * 1000
            try {
                await auctionController.createAuctionRaise({
                    body: {
                        time,
                        price
                    },
                    user,
                    auctionId
                })
                await handleRaise({ auctionId, userId: user.id })
            } catch (error) {
                logger.error('Error when create raise', error)
            }
        }
    }
}
// node "e:\Code\Project\auction\api\test.js" 0 100
get()
