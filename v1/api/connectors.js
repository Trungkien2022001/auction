/* eslint-disable no-unused-vars */
const Redis = require('ioredis')
const ms = require('ms')
// const AWS = require('aws-sdk')
const Knex = require('knex')
const _ = require('lodash')
const { Client } = require('@elastic/elasticsearch')
const config = require('./config')
const { logger } = require('./utils/winston')
const { tryParseJson } = require('./utils/common')

const elasticUrl = config.elasticHost
const esClient = new Client({ node: elasticUrl })

// const sqs = new AWS.SQS()

const redis = new Redis({
    host: config.redisHost,
    port: config.redisPort,
    db: config.redisDb,
    password: config.redisPassword,
    keyPrefix: config.redisPrefix
})
const knex = Knex({
    client: 'mysql2',
    connection: config.mysqlConnectionUrl
})

redis.bulkSetCache = async function bulkSetCache(
    obj,
    prefix,
    timeOutSeconds = 86400
) {
    const p = redis.pipeline()
    const keyVals = {}
    Object.entries(obj).forEach(([key, val]) => {
        if (val && key) {
            keyVals[`${prefix}:${key}`] = JSON.stringify(val)
            p.set(`${prefix}:${key}`, JSON.stringify(val), 'EX', timeOutSeconds)
        }
    })

    if (Object.keys(keyVals).length > 0) {
        await p.exec()
        //  await redis.mset(keyVals)
    }

    return Object.values(obj)
}

redis.mutipleExecutedCache = async function mutipleExecutedCache(
    { cacheKeyPattern, keys, timeOutSeconds },
    promise = () => {},
    handle = resp => resp
) {
    const allKeys = await redis.keys(`${config.redisPrefix}${cacheKeyPattern}*`)
    const inexistedKeys = keys.filter(
        x => !_.some(allKeys, y => y.indexOf(x) > -1)
    )
    const existedKeys = allKeys.filter(x =>
        _.some(keys, y => x.indexOf(y) > -1)
    )
    let cachedResultsPromise = []

    let newValPromise = []
    if (inexistedKeys && inexistedKeys.length > 0) {
        newValPromise = promise(inexistedKeys)
            .then(resp => handle(resp, inexistedKeys))
            .then(obj =>
                redis.bulkSetCache(obj, cacheKeyPattern, timeOutSeconds)
            )
            .catch(e => {
                // eslint-disable-next-line no-console
                logger.error('Error', e.message)

                return []
            })
    }

    if (existedKeys && existedKeys.length > 0) {
        cachedResultsPromise = redis
            .mget(existedKeys.map(y => y.replace(config.redisPrefix, '')))
            .then(data => data && data.map(JSON.parse))
            .catch(() => {
                return []
            })
    }
    const [oldVal, newVal] = await Promise.all([
        cachedResultsPromise,
        newValPromise
    ])

    return _([...oldVal, ...newVal])
        .compact()
        .map(tryParseJson)
        .value()
}
async function cachedExecute({ key, ttl = 60, json = false }, fn) {
    let time = ttl
    if (!(typeof time === 'number') && !(typeof time === 'string')) {
        throw new TypeError(
            `expecting ttl to be number (second) or string, got ${typeof time}`
        )
    }

    if (typeof time === 'string') {
        time = ms(time) / 1000
    }

    // const cached = await redis.get(key)
    // if (!cached) {
    //     const val = await fn()
    //     redis.set(key, json ? JSON.stringify(val) : val, 'EX', time)

    //     return val
    // }

    // return json ? JSON.parse(cached) : cached

    const val = await fn()

    return val
}

redis.cachedExecute = cachedExecute

// lua scripts

redis.defineCommand('mhscan', {
    numberOfKeys: 1,
    lua: `
        local arr = {}
        local len = redis.call('hlen', KEYS[1])
        for i=1,#ARGV do
            local match = redis.call('hscan', KEYS[1], 0, 'match', ARGV[i], 'count', len)
            for j=1, #match[2] do
                if j % 2 == 0 then
                    table.insert(arr, match[2][j])
                end
            end
        end
        return arr
    `
})

redis.defineCommand('avg', {
    numberOfKeys: 2,
    lua: `
        local currentval = tonumber(redis.call('get', KEYS[1])) or 0
        local count = redis.call('incr', KEYS[2])

        currentval = tostring(currentval * (count - 1)/count + (ARGV[1]/count))

        redis.call('set', KEYS[1], currentval)
        return currentval
    `
})

/**
 *
 * This method is NOT RECOMMENDED for mass delete as KEYS will block
 * redis server. Please consider to use SCAN if you want to mass delete
 * something
 *
 */

redis.defineCommand('flushpattern', {
    numberOfKeys: 0,
    lua: `
        local keys = redis.call('keys', ARGV[1])
        for i=1,#keys,5000 do
            redis.call('del', unpack(keys, i, math.min(i+4999, #keys)))
        end
        return keys
    `
})

async function healthCheck() {
    try {
        await redis.ping()
        await knex.raw('SELECT 1+1 as result')
        logger.info('MySQL connected!')
    } catch (error) {
        logger.info('Cannot connect to MySQL', error)
    }
    try {
        await redis.ping()
        logger.info('Redis connected!')
    } catch (error) {
        logger.info('Cannot connect to Redis', error)
    }
    if (config.isUseElasticSearch) {
        try {
            await esClient.ping()
            logger.info('Elasticsearch connected!')
        } catch (error) {
            logger.info('Cannot connect to Elasticsearch', error)
        }
    }
}

module.exports = {
    redis,
    knex,
    esClient,
    healthCheck
    // sqs
}
