const { knex } = require('../../connectors')

async function pay(userId, auctionId, type, amount, currency = 'VND') {
    if (amount > 0) {
        await knex('payment_history').insert({
            amount,
            user_id: userId,
            auction_id: auctionId,
            type,
            currency
        })
    }
}

module.exports = {
    pay
}
