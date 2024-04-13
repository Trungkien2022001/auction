/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
/* eslint-disable camelcase */
// const debug = require('debug')('auction:model:system_config')
// const _ = require('lodash')
const moment = require('moment')
const { knex, redis } = require('../connectors')

async function getPaymentHistoryAdmin(conditional) {
    const data = await knex
        .select('ph.*', 'u.name', 'u.email')
        .from('payment_history as ph')
        .innerJoin('user as u', 'ph.user_id', 'u.id')
        .whereIn(
            knex.raw('DATE(ph.created_at)'),
            conditional.dates && conditional.dates.length
                ? conditional.dates
                : [moment().format('YYYY-MM-DD')]
        )
        .where(function() {
            if (conditional.type) {
                this.where('ph.type', conditional.type)
            }
        })
        .orderBy('ph.id', 'desc')

    return data
}
async function getPaymentHistory(conditional) {
    const data = await knex
        .select('ph.*', 'u.name', 'u.email')
        .from('payment_history as ph')
        .innerJoin('user as u', 'ph.user_id', 'u.id')
        .whereIn(
            knex.raw('DATE(ph.created_at)'),
            conditional.dates && conditional.dates.length
                ? conditional.dates
                : [moment().format('YYYY-MM-DD')]
        )
        .where('ph.user_id', conditional.user_id)
        .where(function() {
            if (conditional.type) {
                this.where('ph.type', conditional.type)
            }
        })
        .orderBy('ph.id', 'desc')

    return data
}

module.exports = {
    getPaymentHistoryAdmin,
    getPaymentHistory
}
