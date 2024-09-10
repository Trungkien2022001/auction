/* eslint-disable no-fallthrough */
/* eslint-disable camelcase */
const debug = require('debug')('auction:model:user')
const { knex, redis } = require('../connectors')
const { logger } = require('../utils/winston')
const auctionModels = require('./auction')

async function fetchUsers() {
    debug('MODEL/user fetchUsers')
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

    // return redis.cachedExecute(
    //     {
    //         key: `user:${email}`,
    //         ttl: '2 days',
    //         json: true
    //     },
    //     fetchUser
    // )
    const user = await fetchUser()

    return user
}

async function fetchUserByID(id, type = 'seller') {
    debug('MODEL/user fetchUserByID')
    let moreInfo = {}
    const fetchUser = async () => {
        const user = await knex
            .first()
            .from('user')
            .where({ id })

        if (!user) {
            throw new Error('user not found')
        }

        switch (type) {
            case 'user':
                {
                    if (user.del_flag) {
                        throw new Error('user is deleted')
                    }
                    const role = await knex
                        .first()
                        .from('role')
                        .where('id', user.role_id)

                    user.role = role
                }
                break
            case 'seller': {
                delete user.role
                delete user.password_hash
                delete user.amount
                delete user.custom_config
                delete user.refresh_token
                moreInfo = await auctionModels.auctionInfoOfUser(id)
                // delete user
            }
            default:
                break
        }

        return {
            ...user,
            ...moreInfo
        }
    }

    const data = await fetchUser()

    return data

    // return redis.cachedExecute(
    //     {
    //         key: `user:${id}`,
    //         ttl: '2 days',
    //         json: true
    //     },
    //     fetchUser
    // )
}

async function myProfile(id) {
    debug('MODEL/user fetchUserByID')
    // const fetchUser = async () => {
    //     const user = await knex
    //         .first()
    //         .from('user')
    //         .where({ id })

    //     if (!user) {
    //         throw new Error('user not found')
    //     }

    //     return user
    // }

    // return redis.cachedExecute(
    //     {
    //         key: `user:${id}`,
    //         ttl: '2 days',
    //         json: true
    //     },
    //     fetchUser
    // )
    const user = await knex
        .first()
        .from('user')
        .where('id', id)

    if (!user) {
        throw new Error('user not found')
    }

    const moreInfo = await auctionModels.auctionInfoOfUser(id)

    return {
        ...user,
        ...moreInfo
    }
}

async function getUserTransactionHistory(userId) {
    debug('MODEL/user getUserTransactionHistory')
    try {
        await knex('user').where('id', userId)
    } catch (error) {
        throw new Error(`unable to get user transaction history`)
    }
}

async function updateUser(userId, updateCondition) {
    debug('MODEL/user updateUser')
    try {
        await knex('user')
            .where('id', userId)
            .update(updateCondition)

        await redis.del('users')
        await redis.del(`user:${userId}`)
    } catch (error) {
        throw new Error(`unable to update user`)
    }
}

async function addUser(user) {
    debug('MODEL/user addUser')
    try {
        await knex('user').insert(user)

        await redis.del('users')
    } catch (error) {
        // console.log(error)
        logger.error('unable to add user', error)
        throw new Error(`unable to add user`)
    }
}

async function getAllInfoSeller(id) {
    debug('MODEL/user getAllInfoSeller')
    try {
        const user_info = await fetchUserByID(id, 'seller')
        const profit = await auctionModels.auctionProfitSum(id)
        const spent = await auctionModels.auctionSpentSum(id)

        return {
            ...user_info,
            profit: profit.sum || 0,
            spent: spent.sum || 0
        }
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

async function blockUser(params) {
    debug('MODEL/user blockUser')
    try {
        await knex('block_user').insert(params)
        if (['normal_block', 'permanent_block'].includes(params.type)) {
            await knex('user')
                .update({ is_blocked: params.type })
                .where('id', params.user_id)
        } else {
            await knex('user')
                .update({ is_blocked: 'normal' })
                .where('id', params.user_id)
        }
        await redis.del(`user:${params.user_id}`)
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

module.exports = {
    fetchUsers,
    fetchUserByEmail,
    fetchUserByID,
    updateUser,
    addUser,
    getAllInfoSeller,
    getUserTransactionHistory,
    blockUser,
    myProfile
}
