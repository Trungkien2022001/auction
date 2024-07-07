const { knex } = require('../../connectors')

async function pay(data) {
    if (data.amount > 0) {
        await knex('payment_history').insert({
            amount: data.amount,
            user_id: data.user_id,
            auction_id: data.auction_id,
            type: data.type,
            currency: data.currency || 'VND'
        })
    }
}

async function updateUserFreeRaiseRemain(user) {
    await knex('user')
        .update({
            free_raise_remain: user.free_raise_remain - 1
        })
        .where('id', user.id)
}

async function updateUserFreeCreateAuctionRemain(user) {
    await knex('user')
        .update({
            create_free_auction_remain: user.create_free_auction_remain - 1
        })
        .where('id', user.id)
}

async function updateUserAmount(userId, amount) {
    await knex('user')
        .update({
            amount: parseFloat(amount)
        })
        .where('id', userId)
}

module.exports = {
    pay,
    updateUserAmount,
    updateUserFreeRaiseRemain,
    updateUserFreeCreateAuctionRemain
}
