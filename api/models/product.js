const debug = require('debug')('auction:model:product')
const { knex, redis } = require('../connectors')

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

module.exports = {
    fetchUsers,
    fetchUserByEmail,
    fetchUserByID,
    updateUser,
    addUser
}
