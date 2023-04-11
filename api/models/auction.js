/* eslint no-use-before-define: "error" */
/* eslint no-return-await: "error" */
/* eslint-disable camelcase */
const debug = require('debug')('auction:model:auction')
const moment = require('moment')
const { knex } = require('../connectors')
const { auctionTime } = require('../config')
const commonModel = require('../models/common')

const baseFields = {
    getAuctions: [
        'a.id',
        'a.status',
        'a.start_time',
        'a.start_price',
        'a.sell_price',
        'a.auction_count',
        'p.category_id',
        'p.name',
        'p.title',
        'p.image',
        'at.time'
    ],
    getAuctionsDashboard: [
        'a.id',
        'a.start_time',
        'a.end_time',
        'a.start_price',
        'a.sell_price',
        'a.seller_id',
        'a.auction_count',
        'a.auctioneer_win',
        'as.name as status',
        'p.name as product_name',
        'at.title as auction_time'
    ],
    getDemoAuctions: [
        'a.id',
        'a.start_time',
        'a.start_price',
        'a.sell_price',
        'a.auction_count',
        'p.name',
        'p.title',
        'p.image',
        'at.time'
    ]
}
exports.saveAuction = async auction => {
    return knex('auction').insert(auction)
}

exports.getAuctions = async (type = 'homepage') => {
    debug('MODEL/auction getAuctions')
    try {
        let fn
        switch (type) {
            case 'homepage':
                fn = async () => {
                    return knex
                        .select(...baseFields.getAuctions)
                        .from('auction as a')
                        .innerJoin('product as p', 'a.product_id', 'p.id')
                        .innerJoin(
                            'auction_time as at',
                            'a.auction_time',
                            'at.id'
                        )
                        .where('a.status', 2)
                        .orWhere('a.status', 1)
                        .whereNull('a.deleted_at')
                        .orderBy('a.updated_at', 'desc')
                }
                break

            case 'dashboard':
                fn = async () => {
                    return knex
                        .select(...baseFields.getAuctionsDashboard)
                        .from('auction as a')
                        .innerJoin('product as p', 'a.product_id', 'p.id')
                        .innerJoin(
                            'auction_time as at',
                            'a.auction_time',
                            'at.id'
                        )
                        .innerJoin('auction_status as as', 'a.status', 'as.id')
                        .orderBy('a.updated_at', 'desc')
                }
                break

            default:
                break
        }
        const result = await fn()

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
exports.getLatestAuction = async () => {
    debug('MODEL/auction getLatestAuction')
    try {
        const result = await knex
            .select(...baseFields.getDemoAuctions)
            .from('auction as a')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .where('a.status', 2)
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
            .select(...baseFields.getDemoAuctions)
            .from('auction as a')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .where('a.status', 2)
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
            .select(...baseFields.getDemoAuctions)
            .from('auction as a')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .where('a.status', 2)
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
            .select(...baseFields.getDemoAuctions)
            .from('auction as a')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            // .leftJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .where('a.status', 1)
            .whereNull('a.deleted_at')
            .orderBy('a.updated_at', 'desc')
            .limit(4)
            .offset(0)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getProductAuction = async auctionId => {
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
                'a.status as auction_status',
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
            // .innerJoin('auction_history as ah', 'a.id', 'ah.auction_id')
            .where('a.id', auctionId)
        // .whereNull('a.deleted_at')
        if (!result.length) {
            throw new Error('Auction not found')
        }
        const images = (await commonModel.getProductImages(result[0].id)) || []

        return {
            ...result[0],
            images
        }
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

exports.countAuctionRaiseByUser = async (userId, auctionId) => {
    debug('MODEL/auction getAuctionHistory')
    try {
        const result = await knex
            .select('ah.id')
            .from('auction_history as ah')
            .where('ah.auction_id', auctionId)
            .andWhere('ah.auctioneer_id', userId)

        return result.length
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.auctionHistoryCount = async userId => {
    // debug('MODEL/auction auctionHistoryCount')
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
    // debug('MODEL/auction allAuctionHistoryCount')
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
    // debug('MODEL/auction auctionWonCount')
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
    // debug('MODEL/auction auctionSaleSuccessCount')
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
    // debug('MODEL/auction auctionSaleDeliveredCount')
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
    // debug('MODEL/auction auctionSaleAllCount')
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
        const user = await knex('auction')
            .select('seller_id')
            .where('id', auctionId)
        if (user) {
            return user[0].seller_id
        }

        return null
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
            .select(
                'a.*',
                'p.*',
                'pc.name as category',
                'aut.name as sell_status'
            )
            .from('auction as a')
            .innerJoin('auction_status as aut', 'a.status', 'aut.id')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('product_category as pc', 'p.category_id', 'pc.id')
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
            .select(
                'a.*',
                'a.status as auction_status',
                'at.title as auction_time',
                'p.*',
                'pc.name as category',
                'aut.name as sell_status'
            )
            .from('auction as a')
            .innerJoin('auction_status as aut', 'a.status', 'aut.id')
            .innerJoin('product as p', 'a.product_id', 'p.id')
            .innerJoin('product_category as pc', 'p.category_id', 'pc.id')
            .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
            .where('a.seller_id', userId)
            .orderBy('a.created_at', 'desc')

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

exports.checkingAllAuction = async () => {
    const activeAuction = await knex('auction').whereIn('status', [1, 2, 3, 4])
    // Promise.all(
    activeAuction.map(async item => {
        if (
            item.status === 2 &&
            moment(item.start_time)
                .add(auctionTime.AUCTION_TIME[item.auction_time], 'minutes')
                .isBefore(moment(new Date())) &&
            item.auction_count == 0
        ) {
            await knex('auction')
                .update('status', 6)
                .where('id', item.id)
        } else if (
            item.status === 2 &&
            moment(item.start_time)
                .add(auctionTime.AUCTION_TIME[item.auction_time], 'minutes')
                .isBefore(moment(new Date())) &&
            item.auction_count > 0
        ) {
            await knex('auction')
                .update('status', 3)
                .where('id', item.id)
        } else if (
            item.status === 3 &&
            moment(item.start_time)
                .add(auctionTime.AUCTION_TIME[item.auction_time])
                .isBefore(moment(new Date()).subtract(1, 'days')) &&
            item.seller_confirm_time === null
        ) {
            await knex('auction')
                .update('status', 7)
                .where('id', item.id)
        } else if (
            item.status === 4 &&
            moment(item.seller_confirm_time).isBefore(
                moment(new Date()).subtract(1, 'days')
            )
        ) {
            await knex('auction')
                .update('status', 8)
                .where('id', item.id)
        } else if (
            item.status === 1 &&
            moment(item.start_time).isBefore(moment(new Date()))
        ) {
            await knex('auction')
                .update('status', 2)
                .where('id', item.id)
        }
    })
    // )
    const userAuction = await knex('user')
        .where('del_flag', '0')
        .andWhere(
            'updated_at',
            '>=',
            moment(new Date())
                .subtract(30, 'days')
                .format('YYYY-MM-DD HH:mm:ss')
        )
        .andWhere('is_blocked', 0)
    Promise.all(
        userAuction.map(async item => {
            const { id } = item

            const auction_sale_delivered_count = await exports.auctionSaleDeliveredCount(
                id
            )
            const auction_sale_all_count = await exports.auctionSaleAllCount(id)
            const auction_sale_failed_count =
                auction_sale_all_count - auction_sale_delivered_count

            if (
                auction_sale_all_count < 5 ||
                auction_sale_all_count / 2 < auction_sale_failed_count ||
                (auction_sale_failed_count > 5 && item.prestige !== 0)
            ) {
                await knex('user')
                    .update('prestige', 0)
                    .where('id', id)
            } else if (
                auction_sale_all_count < 5 ||
                (auction_sale_failed_count > 1 && item.prestige !== 1)
            ) {
                await knex('user')
                    .update('prestige', 0)
                    .where('id', id)
            } else if (
                auction_sale_delivered_count >= auction_sale_all_count * 0.6 &&
                item.prestige !== 2 &&
                auction_sale_all_count >= 5
            ) {
                await knex('user')
                    .update('prestige', 2)
                    .where('id', id)
            }
        })
    )
}
exports.finishedAuction = async id => {
    await exports.updateAuction({ status: 3 }, id)
    await knex('auction_history')
        .update('is_success', 1)
        .where('auction_id', id)
    const win_auctioneer = await knex('auction_history')
        .select()
        .where('auction_id', id)
        .limit(1)
        .offset(0)
        .orderBy('id', 'desc')
    const seller = await knex('auction')
        .select()
        .where('id', id)
    await knex('auction')
        .update('auctioneer_win', win_auctioneer[0].auctioneer_id)
        .where('id', id)
    await knex('notification').insert([
        {
            user_id: seller[0].seller_id,
            action_user_id: win_auctioneer[0].auctioneer_id,
            auction_id: id,
            type: 2
        },
        {
            action_user_id: seller[0].seller_id,
            user_id: win_auctioneer[0].auctioneer_id,
            auction_id: id,
            type: 4
        }
    ])

    return {
        auctioneer: win_auctioneer[0].auctioneer_id,
        seller: seller[0].seller_id
    }
}

exports.sellerConfirm = async (sellerId, auctionId, confirm) => {
    const status = confirm ? 4 : 6
    await exports.updateAuction(
        { status, seller_confirm_time: new Date() },
        auctionId
    )
    const win_auctioneer = await knex('auction_history')
        .select()
        .where('auction_id', auctionId)
    await knex('notification').insert({
        action_user_id: sellerId,
        user_id: win_auctioneer.auctioneer_id,
        auction_id: auctionId,
        type: status ? 7 : 4
    })

    return win_auctioneer.auctioneer_id
}

exports.auctioneerConfirm = async (userId, auctionId, confirm) => {
    const status = confirm ? 5 : 6
    await exports.updateAuction(
        { status, auctioneer_confirm_time: new Date() },
        auctionId
    )
    const seller = await knex('auction')
        .select()
        .where('id', auctionId)
    await knex('notification').insert({
        user_id: seller[0].seller_id,
        action_user_id: userId,
        auction_id: auctionId,
        type: status ? 8 : 5
    })

    return seller[0].id
}
