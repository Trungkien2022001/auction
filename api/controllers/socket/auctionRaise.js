const { redis } = require('../../connectors')
const auctionModel = require('../../models/auction')
const notificationModel = require('../../models/notification')

async function handleRaise(data) {
    const { user, auction } = data
    await redis.del(`auction:auction:${auction.id}`)
    await auctionModel.insertUserAuction(user.id, auction.id)
    const userIds = await auctionModel.getAllAuctioneerOfAuction(
        auction.id
    )
    const index = userIds.findIndex(i => i === user.id)
    userIds.splice(index, 1)
    await notificationModel.createNotification(
        4,
        user.id,
        auction.id,
        userIds
    )
    await notificationModel.createNotification(
        9,
        user.id,
        auction.id,
        userIds
    )
}

module.exports = {
    handleRaise
}
