/* eslint no-use-before-define: "error" */
/* eslint no-return-await: "error" */
const debug = require('debug')('auction:model:auction')
const { knex } = require('../connectors')

exports.saveAuction = async auction => {
    return knex('auction').insert(auction)
}

exports.getLatestAuction = async () => {
    debug('MODEL/auction getLatestAuction')
    try {
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
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getFeaturedAuction = async () => {
    debug('MODEL/auction getFeaturedAuction')
    try {
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
            .orderBy('a.auction_count', 'desc')
            .limit(4)
            .offset(0)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
exports.getCheapAuction = async () => {
    debug('MODEL/auction getCheapAuction')
    try {
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
            .orderBy('a.start_price', 'asc')
            .limit(4)
            .offset(0)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
exports.getIncomingAuction = async () => {
    debug('MODEL/auction getIncomingAuction')
    try {
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
            .where('a.start_time', '>', new Date())
            .whereNull('a.deleted_at')
            .orderBy('a.updated_at', 'desc')
            .limit(4)
            .offset(0)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getProductAuction = async params => {
    debug('MODEL/auction getProductAuction')
    try {
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
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAuctionHistory = async id => {
    debug('MODEL/auction getAuctionHistory')
    try {
        const result = await knex
            .select(
                'ah.id',
                'ah.bet_time',
                'ah.bet_amount',
                'ah.is_blocked',
                'u.name as auctioneer_name'
            )
            .from('auction_history as ah')
            .innerJoin('user as u', 'ah.auctioneer_id', 'u.id')
            .where('ah.auction_id', id)
            .orderBy('ah.id', 'desc')

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionHistoryCount = async userId => {
    debug('MODEL/auction auctionHistoryCount')
    try {
        const result = await knex
            .countDistinct('auction_id as cnt')
            .from('auction_history')
            .where('auctioneer_id', userId)

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.allAuctionHistoryCount = async userId => {
    debug('MODEL/auction allAuctionHistoryCount')
    try {
        const result = await knex
            .count('auctioneer_id as cnt')
            .from('auction_history')
            .where('auctioneer_id', userId)

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionWonCount = async userId => {
    debug('MODEL/auction auctionWonCount')
    try {
        const result = await knex
            .countDistinct('a.id as cnt')
            .from('auction as a')
            .where('a.auctioneer_win', userId)
            .andWhere('a.status', '3')

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionSpentSum = async userId => {
    debug('MODEL/auction auctionSpentSum')
    try {
        const result = await knex
            .sum('a.sell_price as sum')
            .from('auction as a')
            .where('a.auctioneer_win', userId)
            .andWhere('a.status', '4')

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionSaleSuccessCount = async userId => {
    debug('MODEL/auction auctionSaleSuccessCount')
    try {
        const result = await knex
            .count('id as cnt')
            .from('auction')
            .where('seller_id', userId)
            .andWhere('status', '3')

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionSaleDeliveredCount = async userId => {
    debug('MODEL/auction auctionSaleDeliveredCount')
    try {
        const result = await knex
            .count('id as cnt')
            .from('auction')
            .where('seller_id', userId)
            .andWhere('status', '4')

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionSaleAllCount = async userId => {
    debug('MODEL/auction auctionSaleAllCount')
    try {
        const result = await knex
            .count('id as cnt')
            .from('auction')
            .where('seller_id', userId)

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionProfitSum = async userId => {
    debug('MODEL/auction auctionProfitSum')
    try {
        const result = await knex
            .sum('sell_price as sum')
            .from('auction')
            .where('seller_id', userId)
            .andWhere('status', '4')

        return result[0]
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.updateAuction = async (toUpdate, auctionId) => {
    debug('MODEL/auction updateAuction', auctionId)
    try {
        await knex('auction')
            .update(toUpdate)
            .where('id', auctionId)
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.createAuctionLogHistory = async toInsert => {
    debug('MODEL/auction createAuctionLogHistory')
    try {
        await knex('auction_history').insert(toInsert)
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAuctionPurchaseHistory = async userId => {
    debug('MODEL/auction getAuctionPurchaseHistory')
    try {
        const result = await knex
            .select('a.*', 'aut.name as sell_status')
            .from('auction as a')
            .innerJoin('auction_status as aut', 'a.status', 'aut.id')
            .where('a.auctioneer_win', userId)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAuctionSellHistory = async userId => {
    debug('MODEL/auction getAuctionSellHistory')
    try {
        const result = await knex
            .select('a.*', 'aut.name as sell_status')
            .from('auction as a')
            .innerJoin('auction_status as aut', 'a.status', 'aut.id')
            .where('a.seller_id', userId)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAllAuction = async () => {
    debug('MODEL/auction getAllAuction')
    try {
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

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAllAuctionTime = async () => {
    debug('MODEL/auction getAllAuctionTime')
    try {
        const result = await knex
            .select('a.id', 'a.start_time', 'a.status', 'at.time')
            .from('auction as a')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .whereNotIn('a.status', ['5', '6'])
            .whereNull('a.deleted_at')
            .orderBy('a.updated_at', 'desc')

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getUserAuction = async (userId, auctionId) => {
    debug('MODEL/auction getUserAuction')
    try {
        const result = await knex
            .select()
            .from('auction')
            .where('user_id', userId)
            .where('auction_id', auctionId)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.createUserAuction = async (userId, auctionId) => {
    debug('MODEL/auction createUserAuction')
    try {
        const exist = await exports.getAllAuction(userId, auctionId)
        if (!exist.length) {
            await knex('user_auction').insert({
                user_id: userId,
                auction_id: auctionId
            })
        }
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAllAuctionOfUser = async userId => {
    debug('MODEL/auction getAllUserAuction')
    try {
        const result = await knex('user_auction')
            .select('auction_id')
            .where('is_success', '0')
            .andWhere('user_id', userId)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.updateUserAuction = async auctionId => {
    debug('MODEL/auction updateUserAuction')
    try {
        const result = await knex('auction')
            .update('isSuccess', '1')
            .where('auction_id', auctionId)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getHighestBet = async auctionId => {
    debug('MODEL/auction getHighestBet')
    try {
        const result = await knex('auction')
            .select('sell_price')
            .where('id', auctionId)

        return result[0].sell_price
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getAllAuctioneerOfAuction = async auctionId => {
    debug('MODEL/auction getAllAuctioneerOfAuction')
    try {
        const result = await knex('auction_history')
            .distinct('auctioneer_id')
            .where('auction_id', auctionId)

        return result.map(i => {
            return i.auctioneer_id
        })
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.insertUserAuction = async (userId, auctionId) => {
    debug('MODEL/auction insertUserAuction', userId, auctionId)
    try {
        const exist = await knex('user_auction')
            .select()
            .where({
                user_id: userId,
                auction_id: auctionId
            })
        if (!exist.length) {
            await knex('user_auction').insert({
                user_id: userId,
                auction_id: auctionId
            })
        }
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
