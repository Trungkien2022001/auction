/* eslint-disable camelcase */
const { saveImage, getProductImages } = require('../../models/common')
const { addProduct } = require('../../models/product')
const {
    saveAuction,
    getLatestAuction,
    getProductAuction
} = require('../../models/auction')
const { getSellerInfo } = require('../../models/user')

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

    const [productId] = await addProduct(product)
    auction.product_id = productId
    await saveImage(images, productId)
    await saveAuction(auction)

    return {
        err: false
    }
}

exports.getAuctionOverview = async params => {
    const latest = await getLatestAuction(params)
    const featured = await getLatestAuction(params)
    const cheap = await getLatestAuction(params)
    const incoming = await getLatestAuction(params)

    return {
        latest,
        featured,
        cheap,
        incoming
    }
}

exports.getAuctionDetail = async params => {
    const [product] = await getProductAuction(params)
    if (!product) return {}
    const seller_info = await getSellerInfo(product.seller_id)
    const product_images = await getProductImages(product.id)
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
