const debug = require('debug')('auction:route:supplier-config')
// const _ = require('lodash')
const Router = require('@koa/router')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const { getAuctionTime, getProductCategory } = require('../../models/common')
const {
    createAuction,
    getAuctionOverview,
    getAuctionDetail
} = require('./controller')
const { create, getDetail } = require('./schema')

const router = new Router()

// async function refreshUserCache() {
//     // refresh cache: prefix:supplier:*
//     const pattern = `${config.redisPrefix}users`
//     debug(`Flushing ${pattern}`)
//     await redis.flushpattern(pattern)
// }

router.get('/auction-helper', async ctx => {
    debug('GET /auction-helper')
    try {
        const auctionTime = await getAuctionTime()
        const productCategory = await getProductCategory()
        ctx.status = 200
        ctx.body = {
            auction_time: auctionTime,
            product_category: productCategory
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
        throw error
    }
})

router.post(
    '/auction',
    genericSecure,
    validate(create),
    checkPermission('auction'),
    async ctx => {
        debug('POST / create auction')
        try {
            await createAuction({ body: ctx.request.body, user: ctx.User })
            ctx.body = {
                success: true
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)

router.get('/auction-overview', async ctx => {
    debug('POST / get auction overview')
    try {
        const data = await getAuctionOverview()
        ctx.body = {
            success: true,
            data
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
        throw error
    }
})

router.get('/auction', validate(getDetail), async ctx => {
    debug('POST / get auction overview')
    try {
        const data = await getAuctionDetail(ctx.request.query)
        ctx.body = {
            success: true,
            data
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
        throw error
    }
})

module.exports = router
