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
            delete data.system_config
            ctx.body = {
                success: true,
                body: data
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
router.get(
    '/system/all',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        debug('GET /system/all')

        try {
            const data = await systemModel.getAllSystemConfig()
            delete data.system_config
            ctx.body = {
                success: true,
                body: data
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
router.post(
    '/system/update',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        debug('POST /system/current')

        try {
            await systemModel.updateSystem(ctx.request.body)
            ctx.body = {
                success: true
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

module.exports = router
