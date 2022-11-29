const debug = require('debug')('auction:route:supplier-config')
// const _ = require('lodash')
const Router = require('@koa/router')
// const { redis } = require('../../connectors')
// const User = require('../../models/user')
// const config = require('../../config')
const { genericSecure, checkPermission } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
// const { validate } = require('../../middleware/validator')
// const { hashPassword } = require('../../utils/auth')
// const schema = require('./schema')
const { getAuctionTime, getProductCategory } = require('../../models/common')
const { create } = require('./schema')

const router = new Router()

// async function refreshUserCache() {
//     // refresh cache: prefix:supplier:*
//     const pattern = `${config.redisPrefix}users`
//     debug(`Flushing ${pattern}`)
//     await redis.flushpattern(pattern)
// }

router.get(
    '/auction-helper',
    genericSecure,
    checkPermission('auction'),
    async ctx => {
        debug('GET /auction-helper')
        try {
            const auctionTime = await getAuctionTime()
            const prodcutCategory = await getProductCategory()
            ctx.status = 200
            ctx.body = {
                auction_time: auctionTime,
                product_category: prodcutCategory
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

router.post(
    '/auction',
    genericSecure,
    validate(create),
    checkPermission('auction'),
    async ctx => {
        debug('POST / create auction')
        try {
            // console.log(ctx.request.body)
            console.log('Hello')
            ctx.body = {
                success: true
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

// router.get('/user/:user_id', genericSecure, validate(schema.get), async ctx => {
//     debug('GET /user/:user_id')
//     const userId = ctx.params.user_id
//     const actionUser = ctx.User

//     try {
//         const result = await User.fetchUserByID(userId)

//         if (actionUser.id !== userId && actionUser.role_id !== 'admin') {
//             delete result.refresh_token
//             delete result.password_hash
//             delete result.role
//             delete result.role_id
//             delete result.phone
//             delete result.custom_config
//         }

//         ctx.body = {
//             success: true,
//             user: result
//         }
//     } catch (error) {
//         ctx.status = 500
//         ctx.body = {
//             success: false,
//             message: error.message || JSON.stringify(error)
//         }
//     }
// })

// router.put(
//     '/user/:user_id',
//     genericSecure,
//     validate(schema.update),
//     async ctx => {
//         debug('PUT /users')
//         const { user_id: userId } = ctx.params
//         const req = ctx.request.body
//         const actionUser = ctx.User
//         if (actionUser.email !== req.email && actionUser.role_id !== 'admin') {
//             ctx.status = 401
//             ctx.body = {
//                 success: false,
//                 message: 'You are not allow!'
//             }

//             return
//         }

//         try {
//             if (req.password) {
//                 req.password_hash = hashPassword(req.password)
//                 delete req.password
//             }
//             delete req.email

//             await User.updateUser(userId, req)
//             ctx.body = {
//                 success: true
//             }
//         } catch (err) {
//             ctx.status = 500
//             ctx.body = {
//                 success: false,
//                 message: err.message || JSON.stringify(err)
//             }
//             throw err
//         }
//     }
// )

module.exports = router
