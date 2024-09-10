/* eslint-disable no-fallthrough */
/* eslint-disable camelcase */
// const debug = require('debug')('auction:model:system_config')
const _ = require('lodash')
const { knex, redis } = require('../connectors')

async function getCurrentSystemConfig() {
    const system_config = await redis.cachedExecute(
        {
            key: 'system_config',
            ttl: '1 days',
            json: true
        },
        () =>
            knex()
                .select('value')
                .from('system_config as sv')
                .orderBy('sv.id', 'desc')
                .limit(1)
                .offset(0)
    )

    return system_config[0].value
}
async function getAllSystemConfig() {
    const system_config = await redis.cachedExecute(
        {
            key: 'all_system_config',
            ttl: '1 days',
            json: true
        },
        () =>
            knex()
                .select('value')
                .from('system_config as sv')
                .orderBy('sv.id', 'desc')
    )

    return system_config.map(i => i.value)
}

async function getBannerImage() {
    const system_config = await getCurrentSystemConfig()
    const banner_id = _.get(system_config, [0, 'system_config', 'banner_id'], 1)

    const result = await redis.cachedExecute(
        {
            key: 'banner_image',
            ttl: '1 days',
            json: true
        },
        () =>
            knex()
                .select('bi.url')
                .from('banner as b')
                .innerJoin('banner_image as bi', 'bi.banner_id', 'b.id')
                .where('b.id', banner_id)
    )

    return result
}
async function updateSystem(params) {
    await knex('system_config').insert({
        version: params.system_version,
        value: JSON.stringify(params),
        created_by: parseInt(params.created_by.split('~~')[0])
    })
    await redis.del('system_config')
    await redis.del('all_system_config')
}

module.exports = {
    getCurrentSystemConfig,
    getBannerImage,
    updateSystem,
    getAllSystemConfig
}
