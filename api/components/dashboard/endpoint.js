const debug = require('debug')('auction:route:user')
// const _ = require('lodash')
const Router = require('@koa/router')
const Dashboard = require('../../models/dashboard')
// const { genericSecure, checkPermission } = require('../../middleware/security')
// const { validate } = require('../../middleware/validator')
// const { hashPassword } = require('../../utils/auth')
// const schema = require('./schema')

const router = new Router()

router.get('/dashboard-auction-raise', async ctx => {
    debug('GET / users')
    try {
        ctx.body = {
            success: true,
            data: await Dashboard.getAuctionRaise()
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
