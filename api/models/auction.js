/* eslint no-use-before-define: "error" */
/* eslint no-return-await: "error" */
const debug = require('debug')('auction:model:auction')
const { knex } = require('../connectors')

exports.saveAuction = async auction => {
    return knex('auction').insert(auction)
}

exports.getLatestAuction = async () => {
    debug('GET /get lastest auction')

    const result = await knex
        .select(
            'a.id',
            'a.start_time',
            'a.start_price',
            'a.sell_price',
            'a.auction_count',
            'p.name',
            'p.title',
            'p.image',
            'at.time'
        )
        .from('auction as a')
        .innerJoin('product as p', 'a.product_id', 'p.id')
        .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
        // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
        .whereNull('a.deleted_at')
        .orderBy('a.updated_at', 'desc')
        .limit(4)
        .offset(0)

    return result
}

exports.getProductAuction = async params => {
    const result = await knex
        .select(
            'a.id',
            'a.start_time',
            'a.start_price',
            'a.sell_price',
            'a.seller_id',
            'a.auction_count',
            'a.status',
            'a.is_finished_soon',
            'a.is_returned',
            'p.name',
            'p.title',
            'p.description',
            'p.branch',
            'p.key_word',
            'p.status',
            'pc.name as product_category',
            'at.time'
        )
        .from('auction as a')
        .innerJoin('product as p', 'a.product_id', 'p.id')
        .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
        .innerJoin('product_category as pc', 'p.category_id', 'pc.id')
        .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
        .where('a.id', params.id)
        .whereNull('a.deleted_at')

    return result
}

exports.getAuctionHistory = async id => {
    const result = await knex
        .select(
            'ah.id',
            'ah.bet_time',
            'ah.bet_amount',
            'ah.is_success',
            'ah.is_blocked',
            'u.name as auctioneer_name'
        )
        .from('auction_history as ah')
        .innerJoin('user as u', 'ah.auctioneer_id', 'u.id')
        .where('ah.auction_id', id)
        .orderBy('ah.id', 'desc')

    return result
}

exports.auctionHistoryCount = async userId => {
    const result = await knex
        .countDistinct('auction_id as cnt')
        .from('auction_history')
        .where('auctioneer_id', userId)

    return result[0]
}

exports.allAuctionHistoryCount = async userId => {
    const result = await knex
        .count('auctioneer_id as cnt')
        .from('auction_history')
        .where('auctioneer_id', userId)

    return result[0]
}

exports.auctionWonCount = async userId => {
    const result = await knex
        .countDistinct('ah.auction_id as cnt')
        .from('auction_history as ah')
        .innerJoin('auction as a', 'ah.auction_id', 'a.id')
        .where('ah.auctioneer_id', userId)
        .andWhere('ah.is_success', '1')
        .andWhere('a.status', '3')

    return result[0]
}

exports.auctionSpentSum = async userId => {
    const result = await knex
        .sum('sell_price as sum')
        .from('auction as a')
        .innerJoin('auction_history as ah', 'a.id', 'ah.auction_id')
        .where('auctioneer_id', userId)
        .andWhere('is_success', '1')
        .andWhere('is_success', '1')

    return result[0]
}
exports.auctionSaleSuccessCount = async userId => {
    const result = await knex
        .count('id as cnt')
        .from('auction')
        .where('seller_id', userId)
        .andWhere('status', '3')

    return result[0]
}
exports.auctionSaleDeliveredCount = async userId => {
    const result = await knex
        .count('id as cnt')
        .from('auction')
        .where('seller_id', userId)
        .andWhere('status', '4')

    return result[0]
}
exports.auctionSaleAllCount = async userId => {
    const result = await knex
        .count('id as cnt')
        .from('auction')
        .where('seller_id', userId)

    return result[0]
}
exports.auctionProfitSum = async userId => {
    const result = await knex
        .sum('sell_price as sum')
        .from('auction')
        .where('seller_id', userId)
        .andWhere('status', '4')

    return result[0]
}

exports.updateAuction = async (toUpdate, auctionId) => {
    await knex('auction')
        .update(toUpdate)
        .where('id', auctionId)
}
exports.createAuctionLogHistory = async toInsert => {
    await knex('auction_history').insert(toInsert)
}
