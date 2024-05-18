/* eslint-disable camelcase */
const moment = require('moment')
const commonModel = require('../../models/common')
const productModel = require('../../models/product')
const auctionModel = require('../../models/auction')
const elasticModel = require('../../models/elastic')
const notificationModel = require('../../models/notification')
const userModel = require('../../models/user')
const config = require('../../config')
const {
    AUCTION_STATUS
} = require('../../config/constant/auctionStatusConstant')
const { QUEUE_ACTION } = require('../../config/constant/queueActionConstant')
const { sendToQueue } = require('../../queue/kafka/producer.kafka')
const { AUCTION_TIME } = require('../../config/constant')
const {
    pay,
    updateUserFreeRaiseRemain,
    updateUserFreeCreateAuctionRemain
} = require('../payment/controller')
const { PAYMENT_TYPES } = require('../../config/constant/paymentTypeConstant')

exports.getAuctions = async params => {
    const model = config.isUseElasticSearch ? elasticModel : auctionModel
    const auctions = await model.getAuctions(params)

    return auctions
}

exports.createAuction = async params => {
    const { body, user } = params
    const product = {
        ...body.product,
        seller_id: user.id,
        image: body.product.images[0]
    }
    const productsConfig = await commonModel.getProductCategory()
    const pConfig = productsConfig.find(i => i.id === product.category_id)
    const fee = pConfig.create_fee
    if (fee) {
        if (user.amount < fee) {
            return {
                success: false,
                message: `Tài khoản không đủ, vui lòng nạp thêm tiền`
            }
        }
    } else {
        if (
            user.create_free_auction_remain &&
            user.create_free_auction_remain < 1
        ) {
            return {
                success: false,
                message: `Bạn đã dùng hết số lượt đấu giá miễn phí`
            }
        }
        await updateUserFreeCreateAuctionRemain(user)
    }
    const auction = {
        ...body.auction,
        end_time: moment(body.auction.start_time)
            .add(AUCTION_TIME[body.auction.auction_time], 'minutes')
            .format('YYYY-MM-DD HH:mm:ss'),
        seller_id: user.id,
        start_price: product.start_price,
        sell_price: product.start_price,
        status: user.prestige === 2 ? 1 : 0
    }
    const { images } = product
    delete product.images

    const [productId] = await productModel.addProduct(product)
    auction.product_id = productId
    await commonModel.saveImage(images, productId)
    const result = await auctionModel.saveAuction(auction)
    await pay({
        user_id: user.id,
        auction_id: result[0],
        type: PAYMENT_TYPES.AUCTION_CREATE_FEE,
        amount: fee
    })
    if (user.prestige !== 2) {
        await notificationModel.createNotification(10, 319, result[0], [
            user.id
        ])
    }
    if (config.isUseElasticSearch) {
        sendToQueue(
            {
                auction_id: result[0],
                status: 1,
                auction_status: AUCTION_STATUS[1]
            },
            QUEUE_ACTION.INSERT_AUCTION
        )
    }

    return {
        err: false
    }
}

exports.createAuctionRaise = async params => {
    const { body, user, auctionId } = params
    const auction = await exports.getAuctionDetail({ id: auctionId })
    const productsConfig = await commonModel.getProductCategory()
    const pConfig = productsConfig.find(
        i => i.name === auction.product_category
    )
    const { fee } = pConfig
    if (fee) {
        if (user.amount < fee) {
            return {
                success: false,
                message: `Tài khoản không đủ, vui lòng nạp thêm tiền`
            }
        }
    } else {
        if (user.free_raise_remain && user.free_raise_remain < 1) {
            return {
                success: false,
                message: `Bạn đã dùng hết số lượt đấu giá miễn phí`
            }
        }
        await updateUserFreeRaiseRemain(user)
    }
    if (pConfig.bid_increment > body.price - auction.sell_price) {
        return {
            success: false,
            message: `Auction raise error : price must be > ${auction.sell_price}`
        }
    }

    if (
        moment(body.time).isBefore(moment(auction.start_time)) ||
        moment(body.time).isAfter(
            moment(auction.start_time).add(auction.time, 'minutes')
        )
    ) {
        throw new Error(`Auction raise error: invalid auction time`)
    }

    const auctionCountByUser = await auctionModel.countAuctionRaiseByUser(
        user.id,
        auctionId
    )
    if (auctionCountByUser > 10) {
        return {
            success: false,
            message: `Bạn đã đấu giá 10 lần cho sản phẩm này, bạn không thể đấu giá thêm`
        }
    }
    const toAuctionHistoryInsert = {
        auction_id: auctionId,
        auctioneer_id: user.id,
        bet_time: body.time,
        bet_amount: body.price
    }
    const toAuctionUpdate = {
        sell_price: body.price,
        auction_count: auction.auction_count + 1
    }
    await auctionModel.updateAuction(toAuctionUpdate, auctionId)
    await auctionModel.createAuctionLogHistory(
        toAuctionHistoryInsert,
        auctionId
    )

    await pay({
        user,
        auction_id: auction.id,
        type: PAYMENT_TYPES.AUCTION_RAISE_FEE,
        amount: fee
    })

    return {
        success: true
    }
}

exports.getAuctionOverview = async params => {
    const model = config.isUseElasticSearch ? elasticModel : auctionModel
    const latest = await model.getLatestAuction(params)
    const featured = await model.getFeaturedAuction(params)
    const cheap = await model.getCheapAuction(params)
    const expensive = await model.getExpensiveAuction(params)
    const incoming = await model.getIncomingAuction(params)

    return {
        latest,
        featured,
        cheap,
        incoming,
        expensive
    }
}

exports.updateAuctionStatusAdmin = async (auctionId, status) => {
    const auctionDetail = await auctionModel.getProductAuction(auctionId)
    if (auctionDetail.auction_status !== 0) {
        throw new Error('Cannot update auction status')
    } else {
        await auctionModel.updateAuctionStatus(
            auctionId,
            status === 'block' ? 9 : 1
        )
        const notificationStatus = status === 'block' ? 12 : 11
        await notificationModel.createNotification(
            notificationStatus,
            319,
            auctionId,
            [auctionDetail.seller_id]
        )
    }

    return {
        success: true
    }
}

exports.updateAuctionRaiseStatusAdmin = async (
    auctionId,
    raiseId,
    actionUser
) => {
    const auctionDetail = await auctionModel.getProductAuction(auctionId)
    if (
        auctionDetail.seller_id !== actionUser.id ||
        !actionUser.role.dashboard_auction
    ) {
        throw new Error(`You don't have permission to block this auction raise`)
    } else {
        await auctionModel.blockAuctionRaise(raiseId)
        const currentAuctionRaiseWin = await auctionModel.getRaiseWin(auctionId)
        await auctionModel.updateAuctionSellPrice(
            auctionId,
            currentAuctionRaiseWin.bet_amount,
            auctionDetail.auction_count
        )
        // TODO: update elasticsearch
    }

    return {
        success: true
    }
}

exports.getAuctionHistory = async id => {
    const result = await auctionModel.getAuctionHistory(id)

    return result
}

exports.getAuctionDetail = async params => {
    const product = await auctionModel.getProductAuction(
        params.id || params.auctionId
    )
    if (!product) return {}
    const seller = await userModel.fetchUserByID(product.seller_id, 'seller')

    return {
        ...product,
        seller
    }
}
