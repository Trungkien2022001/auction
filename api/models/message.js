/* eslint-disable prefer-destructuring */
const { knex, redis } = require('../connectors')

exports.insertMessage = async params => {
    let chatId
    if (!params.chat_id) {
        const result = await knex('chat').insert({
            user1: params.user_id,
            user2: 0, // Admin
            last_msg: params.content,
            last_message_by: params.user_id,
            is_read: params.is_admin ? 1 : 0
        })
        chatId = result[0]
    } else {
        await exports.updateLasMessage(params)
    }
    await knex('chat_history').insert({
        chat_id: chatId || params.chat_id,
        user_id: params.user_id || 0,
        content: params.content,
        is_admin: params.is_admin ? 1 : 0
    })
}
exports.updateLasMessage = async params => {
    await knex('chat')
        .update({
            last_msg: params.content,
            last_message_by: params.user_id,
            is_read: 0
        })
        .where('id', params.chat_id)
}

exports.getAllUserMessage = async () => {
    const result = await redis.cachedExecute(
        {
            key: 'all-user-message',
            ttl: '5*60',
            json: true
        },
        () => knex('chat').select('id', 'user1', 'user2')
    )

    return result
}

exports.getUserMessage = async params => {
    const result = await knex('chat_history')
        .select()
        .where('user_id', params.user_id)
        // .orderBy('updated_at', 'desc')
        .limit(params.limit || 200)
        .offset(params.offset || 0)

    return result
}

exports.getListUsersJoinChat = async () => {
    const result = await redis.cachedExecute(
        {
            key: 'lst-user-join-chat',
            ttl: 60 * 60,
            json: true
        },
        () =>
            knex('chat')
                .select()
                .where()
                .then(lst => lst.user_id)
    )

    return result
}
