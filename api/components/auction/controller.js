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
    console.log(body.price < auction.product.sell_price)
    if (body.price <= auction.product.sell_price) {
        throw new Error(
            `Auction raise error : price must be > ${auction.product.sell_price}`
        )
    }

    if (
        moment(body.time).isBefore(moment(auction.product.start_time)) ||
        moment(body.time).isAfter(
            moment(auction.product.start_time).add(
                auction.product.time,
                'minutes'
            )
        )
        // moment(new Date()).isBefore(moment(auction.product.start_time)) ||
        // moment(new Date()).isAfter(moment(auction.product.start_time).add(auction.product.time, 'minutes'))
    ) {
        throw new Error(`Auction raise error: invalid auction time`)
    }
    // console.log(first)
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

    return auction
}

exports.getAuctionOverview = async params => {
    const latest = await auctionModel.getLatestAuction(params)
    const featured = await auctionModel.getLatestAuction(params)
    const cheap = await auctionModel.getLatestAuction(params)
    const incoming = await auctionModel.getLatestAuction(params)

    return {
        latest,
        featured,
        cheap,
        incoming
    }
}

exports.getAuctionHistory = async id => {
    const result = await auctionModel.getAuctionHistory(id)

    return result
}

exports.getAuctionDetail = async params => {
    const [product] = await auctionModel.getProductAuction(params)
    if (!product) return {}
    const seller_info = await userModel.getSellerInfo(product.seller_id)
    const product_images = await commonModel.getProductImages(product.id)
    delete seller_info.password_hash
    delete seller_info.refresh_token
    delete seller_info.custom_config
    delete seller_info.role

    return {
        product,
        product_images,
        seller_info
    }
}
