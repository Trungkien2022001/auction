const debug = require('debug')('auction:route:supplier-config')
// const _ = require('lodash')
const Router = require('@koa/router')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const commonModel = require('../../models/common')
const auctionController = require('./controller')
const { create, getDetail } = require('./schema')

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

router.get('/auction', validate(getDetail), async ctx => {
    debug('POST / get auction overview')
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
