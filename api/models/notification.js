const debug = require('debug')('auction:model:notification')
const { knex, redis } = require('../connectors')

exports.createNotification = async (type, actionUser, auctionId, userIDs) => {
    debug('MODEL/notification createNotification', type, actionUser, userIDs, auctionId || '')
    try {
        switch (type) {
            case 4:
                Promise.all(
                    userIDs.map(async userId=>{
                        let exist = await knex('notification').select().where({
                            user_id: userId,
                            auction_id: auctionId,
                            type: 4
                        })
                        if(exist.length){
                            await knex('notification').update({
                                action_user_id: actionUser
                            }).where({
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
                break;

            default:
                break;
        }

    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
