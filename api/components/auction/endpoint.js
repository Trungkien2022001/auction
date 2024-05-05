const debug = require('debug')('auction:route:auction')
const Router = require('@koa/router')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const commonModel = require('../../models/common')
const auctionModel = require('../../models/auction')
const systemModel = require('../../models/system')
const auctionController = require('./controller')
const { create, getDetail, gets } = require('./schema')

const router = new Router()

router.get('/auction-helper', async ctx => {
    debug('GET /auction-helper')
    try {
        // const auctionTime = await commonModel.getAuctionTime()
        const productCategory = await commonModel.getProductCategory()
        const bannerImage = await systemModel.getCurrentSystemConfig()
        ctx.status = 200
        ctx.body = {
            // auction_time: auctionTime,
            product_category: productCategory,
            system_config: bannerImage
        }
    } catch (error) {
        ctx.status = 200
        ctx.body = {
            code: error.code || 500,
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})

router.post(
    '/new-auction',
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
            ctx.status = 200
            ctx.body = {
                code: error.code || 500,
                success: false,
                message: error.message || JSON.stringify(error)
            }
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
        ctx.status = 200
        ctx.body = {
            code: error.code || 500,
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})
router.post('/auctions', validate(gets), async ctx => {
    debug('POST / get auctions')
    const { query } = ctx.request
    try {
        const data = await auctionController.getAuctions(query)
        ctx.body = {
            success: true,
            data
        }
    } catch (error) {
        ctx.status = 200
        ctx.body = {
            code: error.code || 500,
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})

router.put(
    '/auction/:auction_id',
    // validate(update),
    genericSecure,
    checkPermission('dashboard_auction'),
    async ctx => {
        debug('POST / get auctions')
        const { body } = ctx.request
        const auctionId = parseInt(ctx.params.auction_id)
        try {
            const data = await auctionController.updateAuctionStatusAdmin(
                auctionId,
                body.status
            )
            ctx.body = {
                success: true,
                data
            }
        } catch (error) {
            ctx.status = 200
            ctx.body = {
                code: error.code || 500,
                success: false,
                message: error.message || JSON.stringify(error)
            }
        }
    }
)

router.post(
    '/auction/block/:auction_id/:raise_id',
    // validate(update),
    genericSecure,
    // checkPermission('dashboard_auction'),
    async ctx => {
        debug('POST / block auction raise')
        // const { body } = ctx.request
        const auctionId = parseInt(ctx.params.auction_id)
        const raiseID = parseInt(ctx.params.raise_id)
        try {
            const data = await auctionController.updateAuctionStatusAdmin(
                auctionId,
                raiseID,
                ctx.User
            )
            ctx.body = {
                success: true,
                data
            }
        } catch (error) {
            ctx.status = 200
            ctx.body = {
                code: error.code || 500,
                success: false,
                message: error.message || JSON.stringify(error)
            }
        }
    }
)

router.post('/api/v1/auction/:auction_id', validate(getDetail), async ctx => {
    debug('POST / get auction detail')
    try {
        const auctionId = parseInt(ctx.params.auction_id)
        if (Number.isNaN(auctionId)) {
            throw new Error('Invalid Auction Id!')
        }
        const data = await auctionController.getAuctionDetail({ id: auctionId })
        ctx.body = {
            success: true,
            data
        }
    } catch (error) {
        ctx.status = 200
        ctx.body = {
            code: error.code || 500,
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})

router.get('/auction-history', async ctx => {
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
        ctx.status = 200
        ctx.body = {
            code: err.code || 500,
            success: false,
            message: err.message || JSON.stringify(err)
        }
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
        ctx.status = 200
        ctx.body = {
            code: err.code || 500,
            success: false,
            message: err.message || JSON.stringify(err)
        }
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
        ctx.status = 200
        ctx.body = {
            code: err.code || 500,
            success: false,
            message: err.message || JSON.stringify(err)
        }
    }
})

router.post('/auction/raise', genericSecure, async ctx => {
    debug('POST /auction/raise')

    try {
        const check = await auctionController.createAuctionRaise({
            body: ctx.request.body,
            user: ctx.User,
            auctionId: ctx.request.query.auction_id
        })
        ctx.body = check
    } catch (err) {
        ctx.status = 200
        ctx.body = {
            code: err.code || 500,
            success: false,
            message: err.message || JSON.stringify(err)
        }
    }
})
module.exports = router
