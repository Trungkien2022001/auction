const Router = require('@koa/router')
// const { genericSecure, checkPermission } = require('../../middleware/security')

const router = new Router()

router.post(
    '/api/v1/tracking/homepage',
    async ctx => {
        try {
            ctx.body = {
                success: true,
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

module.exports = router
