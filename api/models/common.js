const debug = require('debug')('auction:model:common')
const { knex, redis } = require('../connectors')

exports.getAuctionTime = async () => {
    debug('MODEL/common getAuctionTime')
    try {
        const auctionTime = await redis.cachedExecute(
            {
                key: 'auction-time',
                ttl: '15 days',
                json: true
            },
            () => knex.select().from('auction_time')
        )

        return auctionTime
    } catch (err) {
        debug('get-auction-time', err)
        throw new Error(`unable to fetch auction-time, ${err}`)
    }
}

exports.getProductCategory = async () => {
    debug('MODEL/common getProductCategory')
    try {
        const productCategory = await redis.cachedExecute(
            {
                key: 'product-category',
                ttl: '15 days',
                json: true
            },
            () => knex.select().from('product_category')
        )

        return productCategory
    } catch (err) {
        debug('get-product-category', err)

        throw new Error(`unable to get product type, ${err}`)
    }
}

exports.saveImage = async (images, productId) => {
    debug('MODEL/common saveImage')
    try {
        const image = images.map(img => ({ url: img, product_id: productId }))
        await knex('image').insert(image)
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getProductImages = async productId => {
    debug('MODEL/common getProductImages')
    try {
        const result = await knex
            .select('url')
            .from('image')
            .where('product_id', productId)
            .whereNull('deleted_at')
            .orderBy('id', 'desc')

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
