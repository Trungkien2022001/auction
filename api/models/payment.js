/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
/* eslint-disable camelcase */
// const debug = require('debug')('auction:model:system_config')
// const _ = require('lodash')
const { knex, redis } = require('../connectors')

async function getPaymentHistoryAdmin(conditional) {
    const data = await knex()
        .select('ph.*', 'u.name', 'u.email')
        .from('payment_history as ph')
        .innerJoin('user as u', 'ph.user_id', 'u.id')
        .orderBy('ph.id', 'desc')
        .limit(10)
        .offset(0)

    return data
}

module.exports = {
    getPaymentHistoryAdmin
}
