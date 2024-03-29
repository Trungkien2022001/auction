const debug = require('debug')('auction:route:user')
const Router = require('@koa/router')
const { genericSecure } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const messageModel = require('../../models/message')
const schema = require('./schema')

const router = new Router()

router.get('/message', genericSecure, validate(schema.get), async ctx => {
    debug('GET /message')
    const params = ctx.request.query
    try {
        const data = await messageModel.getUserMessage(params)
        ctx.body = {
            success: true,
            body: data
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})
router.get('/messages', genericSecure, validate(schema.getAll), async ctx => {
    debug('GET /messages')
    const params = ctx.request.query
    try {
        const data = await messageModel.getAllLastMessage(params)
        ctx.body = {
            success: true,
            body: data
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})

module.exports = router
