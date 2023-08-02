const debug = require('debug')('auction:routes:auth')
const Router = require('@koa/router')
// const config = require('../../config')
const { checkPermission, genericSecure } = require('../../middleware/security')
const systemModel = require('../../models/system')

const router = new Router()

router.get(
    '/system/current',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        debug('GET /system/current')

        try {
            const data = await systemModel.getCurrentSystemConfig()
            ctx.body = {
                success: true,
                data
            }
        } catch (e) {
            ctx.body = {
                code: 500,
                success: false,
                message: `login failed: ${e.message}`
            }
        }
    }
)

router.get('/system/banner_image', async ctx => {
    debug('GET /system/banner_image')

    try {
        const data = await systemModel.getBannerImage()
        ctx.body = {
            success: true,
            data
        }
    } catch (e) {
        ctx.body = {
            code: 500,
            success: false,
            message: `login failed: ${e.message}`
        }
    }
})

module.exports = router
