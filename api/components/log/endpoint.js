const debug = require('debug')('auction:route:user')
const Router = require('@koa/router')
const { genericSecure } = require('../../middleware/security')
const Log = require('../../models/log')

const router = new Router()

router.get(
    '/logs',
    genericSecure,
    // validate(schema.get),
    async ctx => {
        debug('GET /log')
        // const body = ctx.request.body
        try {
            const logs = await Log.getLogs()

            ctx.body = {
                success: true,
                body: logs
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
