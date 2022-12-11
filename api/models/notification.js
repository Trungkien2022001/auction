const debug = require('debug')('auction:model:notification')
const { knex } = require('../connectors')

exports.createNotification = async (type, actionUser, auctionId, userIDs) => {
    debug(
        'MODEL/notification createNotification',
        type,
        actionUser,
        userIDs,
        auctionId || ''
    )
    try {
        switch (type) {
            case 4:
                Promise.all(
                    userIDs.map(async userId => {
                        const exist = await knex('notification')
                            .select()
                            .where({
                                user_id: userId,
                                auction_id: auctionId,
                                type: 4
                            })
                        if (exist.length) {
                            await knex('notification')
                                .update({
                                    action_user_id: actionUser
                                })
                                .where({
                                    user_id: userId,
                                    auction_id: auctionId
                                })
                        } else {
                            await knex('notification').insert({
                                user_id: userId,
                                auction_id: auctionId,
                                action_user_id: actionUser,
                                type: 4
                            })
                        }
                    })
                )
                break

            default:
                break
        }
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}

exports.getNotifications = async userId => {
    debug('MODEL/notification getNotifications', userId)
    try {
        const result = await knex
            .select(
                'n.id',
                'n.auction_id',
                'n.type',
                'n.action_user_id',
                'u.name as action_username',
                'u.avatar as action_user_avatar',
                'n.updated_at'
            )
            .from('notification as n')
            .innerJoin('user as u', 'n.action_user_id', 'u.id')
            .where('n.user_id', userId)
            .orderBy('n.updated_at', 'desc')

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
