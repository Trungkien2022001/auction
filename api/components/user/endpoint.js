const debug = require('debug')('auction:route:user')
// const _ = require('lodash')
const Router = require('@koa/router')
const User = require('../../models/user')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const { hashPassword } = require('../../utils/auth')
const userModel = require('../../models/user')
const schema = require('./schema')

const router = new Router()

router.get('/users', genericSecure, checkPermission('admin'), async ctx => {
    debug('GET / users')
    try {
        ctx.body = {
            success: true,
            users: await User.fetchUsers()
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

router.get('/user/:user_id', genericSecure, validate(schema.get), async ctx => {
    debug('GET /user/:user_id')
    const userId = ctx.params.user_id
    const actionUser = ctx.User

    try {
        const user_info = await User.fetchUserByID(userId)
        const transaction_history = await userModel.getSellerInfo(userId)

        if (actionUser.id !== userId && actionUser.role_id !== 'admin') {
            delete user_info.refresh_token
            delete user_info.password_hash
            delete user_info.role
            delete user_info.role_id
            delete user_info.custom_config
        }

        ctx.body = {
            success: true,
            data: { ...transaction_history, ...user_info }
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            success: false,
            message: error.message || JSON.stringify(error)
        }
    }
})

router.get(
    '/user-overview/:user_id',
    genericSecure,
    validate(schema.get),
    async ctx => {
        debug('GET /user/:user_id')
        const userId = ctx.params.user_id
        const actionUser = ctx.User

        try {
            const result = await User.fetchUserByID(userId)

            if (actionUser.id !== userId && actionUser.role_id !== 'admin') {
                delete result.refresh_token
                delete result.password_hash
                delete result.role
                delete result.role_id
                delete result.custom_config
            }

            ctx.body = {
                success: true,
                user: result
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

router.put(
    '/user/:user_id',
    genericSecure,
    validate(schema.update),
    async ctx => {
        debug('PUT /users')
        const { user_id: userId } = ctx.params
        const req = ctx.request.body
        const actionUser = ctx.User
        if (actionUser.email !== req.email && actionUser.role_id !== 'admin') {
            ctx.status = 401
            ctx.body = {
                success: false,
                message: 'You are not allow!'
            }

            return
        }

        try {
            if (req.password) {
                req.password_hash = hashPassword(req.password)
                delete req.password
            }
            delete req.email

            await User.updateUser(userId, req)
            ctx.body = {
                success: true
            }
        } catch (err) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: err.message || JSON.stringify(err)
            }
            throw err
        }
    }
)

module.exports = router
