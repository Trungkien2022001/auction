const debug = require('debug')('auction:model:common')
const { knex, redis } = require('../connectors')

exports.getAuctionTime = async () => {
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
