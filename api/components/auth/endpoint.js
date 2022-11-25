const debug = require('debug')('auction:routes:auth')
const Router = require('@koa/router')
const config = require('../../config')
const { validate } = require('../../middleware/validator')
const { loginSchema, signupSchema } = require('./schema')
const { login, signup } = require('./controller')

const router = new Router()

router.post('/login', validate(loginSchema), async ctx => {
    debug('POST /login')

    try {
        const token = await login(ctx.request.body)
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
            message: `login failed: ${e.message}`
        }

        throw e
    }
})

router.post('/signup', validate(signupSchema), async ctx => {
    debug('POST /signup')

    try {
        await signup(ctx.request.body)
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.body = {
            success: false,
            message: `cannot create user: ${e.message}`
        }

        throw e
    }
})

module.exports = router
