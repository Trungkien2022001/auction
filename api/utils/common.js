const debug = require('debug')('auction:utils:common')
// const _ = require('lodash')
const crypto = require('crypto')
const moment = require('moment')

const { redis } = require('../connectors')
const config = require('../config')

const cacheTime = config.searchCacheTimeInSeconds

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function logRequest({ requestId, data }) {
    debug('logRequest')
    process.nextTick(() => {
        const p = redis.pipeline()
        const cacheKey = `logging:${requestId}`
        p.hmset(cacheKey, data)
        p.expire(cacheKey, cacheTime * 2)
        p.exec().catch(debug)
    })
}

function markRequestComplete(req, supplierId, supplierCode, msg) {
    const cacheKey = module.exports.makeCacheKey(req)
    redis.hset(`${cacheKey}:meta`, `${supplierId}:${supplierCode}`, msg || 1)
    redis.expire(`${cacheKey}:meta`, cacheTime)
}

function makeCacheKey(req) {
    const flatten = req.rooms.reduce((rKey, r) => {
        const ad = `${r.adults}`
        const ch = r.children ? r.children.map(c => c.age).join('+') : 0
        const inf = r.infants ? r.infants.map(i => i.age).join('+') : 0

        const out = `${rKey}a${ad}c${ch}i${inf}`

        return out
    }, '')
    const boardTypes =
        req.board_types &&
        req.board_types.length > 0 &&
        req.board_types.filter(bt => bt && bt.length > 0)
    const checkin = moment(req.checkin).format('YYYYMMDD')
    const checkout = moment(req.checkout).format('YYYYMMDD')
    const parts = [
        `i=${checkin}`,
        `o=${checkout}`,
        `r=${req.parent_region_id}`,
        `p=${req.package ? 1 : 0}`,
        `wl=${req.flags && req.flags.same_room_combination ? 1 : 0}`,
        `br=${req.flags && req.flags.rate_basically ? 1 : 0}`,
        `giata=${req.flags && req.flags.get_giata_mapping ? 1 : 0}`,
        `r=${flatten}`,
        `l=${req.language_code}`,
        `n=${req.nationality}`,
        `cr=${req.country_residence}`
    ]
    if (boardTypes && boardTypes.length > 0) {
        parts.push(`bt=${boardTypes.join('$')}`)
    }

    return parts.join(':').toLowerCase()
}

function encode(obj) {
    const text = JSON.stringify(obj)

    const cipher = crypto.createCipher('aes-256-cbc', config.secret)
    let encoded = cipher.update(text, 'utf8', 'base64')
    encoded += cipher.final('base64')

    return encoded
}

function decode(encoded) {
    const decipher = crypto.createDecipher('aes-256-cbc', config.secret)
    let decoded = decipher.update(encoded, 'base64', 'utf8')
    decoded += decipher.final('utf8')

    return JSON.parse(decoded)
}
function tryParseJson(params) {
    if (params && Array.isArray(params)) {
        return params.map(tryParseJson)
    }
    if (params && typeof params === 'object') {
        Object.keys(params).forEach(key => {
            params[key] = tryParseJson(params[key])
        })

        return params
    }

    let tempVal
    try {
        tempVal = JSON.parse(params)
    } catch (error) {
        tempVal = params
    }

    return tempVal
}

module.exports = {
    decode,
    encode,
    logRequest,
    makeCacheKey,
    sleep,
    markRequestComplete,
    tryParseJson
}
