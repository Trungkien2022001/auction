const debug = require('debug')('auction:middleware:security')
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const { fetchUserByEmail } = require('../models/user')

async function genericSecure(ctx, next) {
    debug('genericSecure')

    const { headers } = ctx
    const hasTokenAndKey = headers['x-access-token'] && headers['x-key']

    if (!hasTokenAndKey) {
        ctx.status = 400
        ctx.body = {
            success: false,
            message: 'missing x-access-token/x-key in headers'
        }

        return
    }

    let decoded = null
    try {
        decoded = jwt.decode(headers['x-access-token'], config.secret)
        debug('decoded.expire, now', decoded.expire, moment().unix())
        const notExpired = decoded.expire > moment().unix()
        ctx.assert(notExpired, 401, 'token expired')
        ctx.assert(decoded.email === headers['x-key'], 401, 'invalid x-key')
    } catch (err) {
        debug('genericSecure', err)
        ctx.status = 401
        ctx.body = { success: false, message: 'invalid/expired token' }

        return
    }

    const user = await fetchUserByEmail(decoded.email)

    if (!user) {
        ctx.status = 404
        ctx.body = { success: false, message: 'user not found' }

        return
    }

    delete user.password_hash
    ctx.User = user
    return next() // eslint-disable-line
}

function checkPermission(permission) {
    return async (ctx, next) => {
        debug('checkPermission')
        if (ctx.User.role[permission] !== 1) {
            ctx.status = 401
            ctx.body = {
                success: false,
                message: `Expected permission "${permission}" to call this request`
            }

            return
        }

        // eslint-disable-next-line consistent-return
        return next()
    }
}

module.exports = {
    genericSecure,
    checkPermission
}
