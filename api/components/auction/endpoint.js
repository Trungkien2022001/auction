const debug = require('debug')('auction:route:auction')
const Router = require('@koa/router')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const commonModel = require('../../models/common')
const auctionModel = require('../../models/auction')
const auctionController = require('./controller')
const { create, getDetail, gets } = require('./schema')

const router = new Router()

router.get('/auction-helper', async ctx => {
    debug('GET /auction-helper')
    try {
        const auctionTime = await commonModel.getAuctionTime()
        const productCategory = await commonModel.getProductCategory()
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
            await auctionController.createAuction({
                body: ctx.request.body,
                user: ctx.User
            })
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
        const data = await auctionController.getAuctionOverview()
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
router.get('/auctions', validate(gets), async ctx => {
    debug('POST / get auctions')
    const { query } = ctx.request
    try {
        const data = await auctionController.getAuctions(query)
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
    debug('POST / get auction detail')
    try {
        const data = await auctionController.getAuctionDetail(ctx.request.query)
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

router.get('/auction-history', genericSecure, async ctx => {
    debug('GET /auction-history')

    try {
        const data = await auctionController.getAuctionHistory(
            ctx.request.query.auction_id
        )

        ctx.body = {
            success: true,
            data
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: err.message || JSON.stringify(err)
        }

        throw err
    }
})

router.get('/auction-purchase-history', genericSecure, async ctx => {
    debug('POST /auction-purchase-history')

    try {
        const result = await auctionModel.getAuctionPurchaseHistory(
            ctx.query.user_id
        )
        ctx.body = {
            success: true,
            result
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: err.message || JSON.stringify(err)
        }

        throw err
    }
})

router.get('/auction-sell-history', genericSecure, async ctx => {
    debug('POST /auction-sell-history')

    try {
        const result = await auctionModel.getAuctionSellHistory(
            ctx.query.user_id
        )
        ctx.body = {
            success: true,
            result
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: err.message || JSON.stringify(err)
        }

        throw err
    }
})

router.post('/auction/raise', genericSecure, async ctx => {
    debug('POST /auction/raise')

    try {
        await auctionController.createAuctionRaise({
            body: ctx.request.body,
            user: ctx.User,
            auctionId: ctx.request.query.auction_id
        })

        ctx.body = {
            success: true
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: err.message || JSON.stringify(err)
        }
    }
})
module.exports = router
