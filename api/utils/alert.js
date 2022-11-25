/* eslint-disable camelcase */
const Promise = require('bluebird')

const request = Promise.promisifyAll(require('request'))

const config = require('../config/index')

const actionErrorType = {
    worker: 'Worker Err',
    sever: 'Server Err'
}
async function workerExceptionCatching(error, src, req, actionName, cacheKey) {
    const env = process.env.NODE_ENV || process.env.ENV || 'Development'
    const { name, code, stack, message } = error
    const actionKey = `${actionName}::${src}::${name}::${cacheKey}`
    const description = {
        type: actionErrorType.worker,
        // actionKey,
        action: actionName,
        src,
        name,
        code,
        detail: message || error || '',
        stack,
        request: req
    }

    const reqBody = {
        env,
        title: `HotelApi::OfferWorker - ${env}`,
        message: description,
        actionKey
    }

    const opts = {
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        }
    }
    // eslint-disable-next-line no-empty
    if (config.production) {
    } else {
        await request.postAsync(config.telegramWebHookUrl, opts)
    }
}
async function serverExceptionCatching(error, ctx) {
    const env = process.env.NODE_ENV || process.env.ENV || 'Development'
    const { name, code, stack, message } = error
    const { url } = ctx
    const xKey = ctx.headers['x-key']
    const req = ctx.request.body
    const { source_id } = req
    const actionKey = `${url}::${xKey}${
        source_id ? `::${source_id}` : ''
    }::${name}`

    const description = {
        type: actionErrorType.sever,
        // actionKey,
        action: url,
        'x-key': xKey,
        source_id,
        name,
        code,
        detail: message || error || '',
        stack,
        request: req
    }

    const reqBody = {
        env,
        title: `HotelApi::OfferWorker - ${env}`,
        message: description,
        actionKey
    }

    const opts = {
        body: JSON.stringify(reqBody),

        headers: {
            'Content-Type': 'application/json;charset=utf8'
        }
    }
    // eslint-disable-next-line no-empty
    if (config.production) {
    } else {
        await request.postAsync(config.telegramWebHookUrl, opts)
    }
}
module.exports = { workerExceptionCatching, serverExceptionCatching }
