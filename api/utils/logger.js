const StatsD = require('hot-shots')
const _ = require('lodash')
const logger = require('./log-tracer')
const APIError = require('./error')

const forcePrintRequestSuppliers = ['Juniper', 'APItude', 'MARJ']

logger.info(`Logging to statsd at ${process.env.STATSD_HOST}`)

const dogStatsd = new StatsD({
    host: process.env.STATSD_HOST,
    port: 8125
})

function dogTags({ acc, req, mapping }) {
    const tags = {
        env: process.env.NODE_ENV || process.env.ENV || 'dev'
    }

    if (acc) tags.supplier = acc.code
    if (req) {
        if (req.destination_code) {
            tags.destination = req.destination_code
        } else if (req.region_id) {
            tags.region = req.region_id
        }
    }

    if (mapping) tags.region = mapping.region_id

    return tags
}

function dogEvent({ title, text, options, tags, callback }) {
    dogStatsd.event(title, text, options, tags, callback)
}

async function pingPong(
    promise,
    { metric, acc, req, mapping, ridx, params, forcePrintLog }
) {
    const tags = dogTags({ acc, req, mapping })

    const {
        body,
        timings,
        timingPhases,
        statusCode,
        statusMessage
    } = await promise

    let print = true
    let printRequest = false
    const rid = req.id || req.request_id
    const lid = req.id || req.request_id
    if (metric === 'offer_search') {
        // NOTE: disable logger for search by default as it's too large

        print = process.env.INCLUDE_SEARCH_LOG === 'true'
    }

    if (forcePrintLog) {
        print = true
        printRequest = true
    }
    if (
        _.some(
            forcePrintRequestSuppliers,
            supplierCode => supplierCode == acc.code
        )
    ) {
        printRequest = true
    }

    const ctx = {
        lid,
        rid,
        ridx,
        metric,
        supplier: acc.code,
        user_email: acc.user_email,
        user_name: acc.user_name,
        src: acc.code,
        timings,
        timingPhases,
        statusCode,
        statusMessage,
        'x-correlation-id': req['x-correlation-id']
    }
    if (printRequest) {
        logger.info(
            { ...ctx, name: `${metric}_request`, metric: `${metric}_request` },
            params
        )
    }
    if (print) {
        logger.info(
            { ...ctx, name: `${metric}_response`, metric: `${metric}_request` },
            body
        )
    }

    dogStatsd.histogram(metric, timingPhases ? timingPhases.total : 0, tags)

    const statusOk = statusCode >= 200 && statusCode < 300
    if (!body || !statusOk) {
        dogStatsd.increment(`${metric}.error`, tags)

        logger.error({
            rid,
            ridx,
            metric,
            supplier: acc.code,
            request: params,
            response: body,
            timings,
            timingPhases,
            statusCode,
            statusMessage,
            'x-correlation-id': req['x-correlation-id']
        })

        const msg = typeof body === 'string' ? body : JSON.stringify(body)

        throw new APIError.ThirdPartyError({
            code: statusCode,
            message: `unexpected response statusCode = [${statusCode}] and body = [${msg}]`
        })
    }

    return { statusCode, body }
}

async function pingPongJSON(
    promise,
    { metric, acc, req, mapping, ridx, params, forcePrintLog }
) {
    const tags = dogTags({ acc, req, mapping })

    const {
        body,
        timings,
        timingPhases,
        statusCode,
        statusMessage
    } = await promise

    let print = true
    let printRequest = false
    const rid = req.id || req.request_id
    const lid = req.id || req.request_id
    if (metric === 'offer_search') {
        // NOTE: disable logger for search by default as it's too large

        print = process.env.INCLUDE_SEARCH_LOG === 'true'
    }
    if (forcePrintLog) {
        print = true
        printRequest = true
    }
    if (
        _.some(
            forcePrintRequestSuppliers,
            supplierCode => supplierCode == acc.code
        )
    ) {
        print = true
    }
    const ctx = {
        lid,
        rid,
        ridx,
        metric,
        supplier: acc.code,
        user_email: acc.user_email,
        user_name: acc.user_name,
        src: acc.code,
        timings,
        timingPhases,
        statusCode,
        statusMessage,
        'x-correlation-id': req['x-correlation-id']
    }
    if (printRequest) {
        logger.info(
            { ...ctx, name: `${metric}_request`, metric: `${metric}_request` },
            params
        )
    }
    if (print) {
        logger.info(
            { ...ctx, name: `${metric}_response`, metric: `${metric}_request` },
            body
        )
    }

    dogStatsd.histogram(metric, timingPhases ? timingPhases.total : 0, tags)

    const statusOk = statusCode >= 200 && statusCode < 300
    if (!body || !statusOk) {
        dogStatsd.increment(`${metric}.error`, tags)

        logger.error({
            rid,
            ridx,
            metric,
            supplier: acc.code,
            request: params,
            response: body,
            timings,
            timingPhases,
            statusCode,
            statusMessage,
            'x-correlation-id': req['x-correlation-id']
        })

        const msg = typeof body === 'string' ? body : JSON.stringify(body)

        throw new APIError.ThirdPartyError({
            code: statusCode,
            message: `unexpected response statusCode = [${statusCode}] and body = [${msg}]`
        })
    }

    return { statusCode, body }
}

module.exports = {
    logger,
    dogStatsd,
    dogTags,
    dogEvent,
    pingPong,
    pingPongJSON
}
