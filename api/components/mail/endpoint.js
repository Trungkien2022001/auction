const debug = require('debug')('offer-worker:routes:auth')
const Router = require('@koa/router')
const config = require('../../config')
const { sendMail } = require('./controller')

const router = new Router()

router.post('/login', async ctx => {
    debug('POST /login')

    try {
        const token = await sendMail()
        ctx.body = {
            success: true,
            data: {
                auth_token: token,
                env: config.production ? 'production' : 'staging'
            }
        }
    } catch (e) {
        ctx.body = {
            success: false,
            message: `Send main failed: ${e.message}`
        }

        throw e
    }
})

module.exports = router
