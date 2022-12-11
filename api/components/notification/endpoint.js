const debug = require('debug')('auction:route:user')
// const _ = require('lodash')
const Router = require('@koa/router')
const { genericSecure } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const notificationModel = require('../../models/notification')
const schema = require('./schema')

const router = new Router()

router.get(
    '/notification/:user_id',
    genericSecure,
    validate(schema.get),
    async ctx => {
        debug('GET /user/:user_id')
        const userId = ctx.params.user_id

        try {
            const notification = await notificationModel.getNotifications(
                userId
            )

            ctx.body = {
                success: true,
                notification
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
        }
    }
)

module.exports = router
