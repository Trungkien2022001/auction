// const moment = require('moment')
// const _ = require('lodash')
const uuid = require('uuid/v4')

const Log = require('../models/log')
const config = require('../config')

const loggingMethod = ['POST', 'PUT', 'PATCH', 'DELETE']
// const loggingPathIgnore = ['/login']
async function log(ctx, next) {
    let error = null
    ctx.request.id = uuid().replace(/-/g, '') // because hyphen sucks
    try {
        await next()
        const { originalUrl: matchedRoute } = ctx

        if (loggingMethod.includes(ctx.method)) {
            const requestLog = new Log({
                path: ctx.path,
                matched_route: matchedRoute,
                method: ctx.method,
                user: ctx.request.headers['x-key'],
                client_ip:
                    ctx.req.headers['x-forwarded-for'] ||
                    ctx.req.socket.remoteAddress ||
                    '127.0.0.1',
                status: ctx.status,
                request: {
                    query: ctx.query,
                    // params: ctx.params,
                    body: ctx.request.body
                },
                response: error || ctx.body,
                error:
                    ctx.body && ctx.body.success === false
                        ? ctx.body.message
                        : null,
                server_port: config.port
            })
            requestLog.createLog()
        }

        // }
    } catch (err) {
        error = err
        // error handler
        if (err.code === 'ECONNREFUSED') {
            ctx.status = 504
            ctx.body = {
                code: err.code,
                message: err.message
            }
        } else if (err.name === 'ThirdPartyError') {
            ctx.status = 502
            ctx.body = {
                code: 502,
                message: err.message
            }
        } else if (err.name === 'AuthenticationError') {
            ctx.status = 401
            ctx.body = {
                code: 401,
                message: err.message
            }
        } else {
            ctx.status = 400
            const body = {
                code: 400,
                message: err.message,
                verbosity: err.verbosity
            }

            ctx.body = body
        }
    }
}
module.exports = { log }
