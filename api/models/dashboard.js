/* eslint-disable prefer-destructuring */
const { knex } = require('../connectors')

exports.getAuctionRaise = async () => {
    // const result = await knex('chat_history').select()
    const result = await knex('chat_history')
        .select('created_at')
        .count('id as count')
        .groupByRaw('DATE(created_at)')

    return result
}
