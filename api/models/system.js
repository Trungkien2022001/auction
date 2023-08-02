/* eslint-disable no-fallthrough */
/* eslint-disable camelcase */
// const debug = require('debug')('auction:model:system_config')
const _ = require('lodash')
const { knex, redis } = require('../connectors')

async function getCurrentSystemConfig() {
    const result = await redis.cachedExecute(
        {
            key: 'system_config',
            ttl: '1 days',
            json: true
        },
        () =>
            knex()
                .select(
                    'sv.version as system_version',
                    'sv.id',
                    'sv.version',
                    'sc.value as system_config',
                    'sc.created_at',
                    'sc.updated_at',
                    'u.id as created_by'
                )
                .from('system_version as sv')
                .innerJoin(
                    'system_config as sc',
                    'sc.system_version_id',
                    'sv.id'
                )
                .innerJoin('user as u', 'u.id', 'sc.updated_by')
                .orderBy('sv.id', 'desc')
                .limit(1)
                .offset(0)
    )

    return result
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

module.exports = {
    getCurrentSystemConfig,
    getBannerImage
}
