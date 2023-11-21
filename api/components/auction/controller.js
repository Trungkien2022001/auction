/* eslint-disable camelcase */
const moment = require('moment')
const commonModel = require('../../models/common')
const productModel = require('../../models/product')
const auctionModel = require('../../models/auction')
const userModel = require('../../models/user')

exports.createAuction = async params => {
    const { body, user } = params
    const product = {
        ...body.product,
        seller_id: user.id,
        image: body.product.images[0]
    }
    const auction = {
        ...body.auction,
        seller_id: user.id,
        start_price: product.start_price,
        sell_price: product.start_price
    }
    const { images } = product
    delete product.images

    const [productId] = await productModel.addProduct(product)
    auction.product_id = productId
    await commonModel.saveImage(images, productId)
    await auctionModel.saveAuction(auction)

    return {
        err: false
    }
}

exports.createAuctionRaise = async params => {
    const { body, user, auctionId } = params
    const auction = await exports.getAuctionDetail({ id: auctionId })
    if (body.price <= auction.product.sell_price) {
        return {
            success: false,
            message: `Auction raise error : price must be > ${auction.product.sell_price}`
        }
    }

    if (
        moment(body.time).isBefore(moment(auction.product.start_time)) ||
        moment(body.time).isAfter(
            moment(auction.product.start_time).add(
                auction.product.time,
                'minutes'
            )
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
        auction_count: auction.product.auction_count + 1
    }
    await auctionModel.updateAuction(toAuctionUpdate, auctionId)
    await auctionModel.createAuctionLogHistory(
        toAuctionHistoryInsert,
        auctionId
    )

    return {
        success: true
    }
}

exports.getAuctionOverview = async params => {
    const latest = await auctionModel.getLatestAuction(params)
    const featured = await auctionModel.getFeaturedAuction(params)
    const cheap = await auctionModel.getCheapAuction(params)
    const expensive = await auctionModel.getExpensiveAuction(params)
    const incoming = await auctionModel.getIncomingAuction(params)

    return {
        latest,
        featured,
        cheap,
        incoming,
        expensive
    }
}

exports.getAuctions = async params => {
    const auctions = await auctionModel.getAuctions(params)

    return auctions
}

exports.getAuctionHistory = async id => {
    const result = await auctionModel.getAuctionHistory(id)

    return result
}

exports.getAuctionDetail = async params => {
    const product = await auctionModel.getProductAuction(params.id)
    if (!product) return {}
    const seller = await userModel.fetchUserByID(product.seller_id, 'seller')

    return {
        ...product,
        seller
    }
}
