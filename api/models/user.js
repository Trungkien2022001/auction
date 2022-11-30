/* eslint-disable camelcase */
const debug = require('debug')('auction:model:user')
const { knex, redis } = require('../connectors')
const {
    auctionHistoryCount,
    allAuctionHistoryCount,
    auctionWonCount,
    auctionSaleSuccessCount,
    auctionSaleDeliveredCount,
    auctionSaleAllCount,
    auctionProfitSum,
    auctionSpentSum
} = require('./auction')

async function fetchUsers() {
    try {
        const users = await redis.cachedExecute(
            {
                key: `users`,
                ttl: '15 days',
                json: true
            },
            () => knex.select().from('user')
        )

        return users
    } catch (err) {
        debug('fetchUsers', err)
        throw new Error(`unable to fetch users`)
    }
}

async function fetchUserByEmail(email) {
    const fetchUser = async () => {
        const user = await knex
            .first()
            .from('user')
            .where({ email, del_flag: 0 })

        if (!user) {
            throw new Error('user not found')
        }

        const role = await knex
            .first()
            .from('role')
            .where('id', user.role_id)

        user.role = role

        return user
    }

    return redis.cachedExecute(
        {
            key: `user:${email}`,
            ttl: '2 days',
            json: true
        },
        fetchUser
    )
}

async function fetchUserByID(id) {
    const fetchUser = async () => {
        const user = await knex
            .first()
            .from('user')
            .where({ id, del_flag: 0 })

        if (!user) {
            throw new Error('user not found')
        }

        const role = await knex
            .first()
            .from('role')
            .where('id', user.role_id)

        user.role = role

        return user
    }

    return redis.cachedExecute(
        {
            key: `user:${id}`,
            ttl: '2 days',
            json: true
        },
        fetchUser
    )
}

async function getUserTransactionHistory(userId) {
    try {
        await knex('user').where('id', userId)
    } catch (error) {
        throw new Error(`unable to get user transaction history`)
    }
}

async function updateUser(userId, updateCondition) {
    try {
        await knex('user')
            .where('id', userId)
            .update(updateCondition)

        await redis.del('users')
    } catch (error) {
        throw new Error(`unable to update user`)
    }
}

async function addUser(user) {
    try {
        await knex('user').insert(user)

        await redis.del('users')
    } catch (error) {
        throw new Error(`unable to add user`)
    }
}

async function getAllInfoSeller(id) {
    const user_info = await fetchUserByID(id)
    const auction_history_count = await auctionHistoryCount(id)
    const all_auction_history_count = await allAuctionHistoryCount(id)
    const auction_won_count = await auctionWonCount(id)
    const auction_sale_success_count = await auctionSaleSuccessCount(id)
    const auction_sale_delivered_count = await auctionSaleDeliveredCount(id)
    const auction_sale_all_count = await auctionSaleAllCount(id)
    const profit = await auctionProfitSum(id)
    const spent = await auctionSpentSum(id)

    return {
        ...user_info,
        all_auction_history_count: all_auction_history_count.cnt,
        auction_history_count: auction_history_count.cnt,
        auction_won_count: auction_won_count.cnt,
        auction_sale_success_count: auction_sale_success_count.cnt,
        auction_sale_delivered_count: auction_sale_delivered_count.cnt,
        auction_sale_all_count: auction_sale_all_count.cnt,
        auction_sale_failed_count:
            auction_sale_all_count.cnt - auction_sale_success_count.cnt,
        profit: profit.sum || 0,
        spent: spent.sum || 0
    }
}

async function getSellerInfo(seller_id) {
    return redis.cachedExecute(
        {
            key: `seller:${seller_id}`,
            ttl: '5 days',
            json: true
        },
        () => getAllInfoSeller(seller_id)
    )
}

module.exports = {
    fetchUsers,
    fetchUserByEmail,
    fetchUserByID,
    updateUser,
    addUser,
    getUserTransactionHistory,
    getSellerInfo
}
