/* eslint-disable prefer-destructuring */
const moment = require('moment')
const _ = require('lodash')
const { knex } = require('../connectors')

exports.getAuctionRaise = async type => {
    let result = []
    const data = await knex('auction_history')
        .select('created_at')
        .orderBy('created_at', 'desc')
        .limit(1000)
    switch (type) {
        case 'month':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('MM-YYYY'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'day':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'hour':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM HH:mm')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'minute':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('DD-MM HH:mm'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        default:
            break
    }

    return result
}
exports.getAuction = async type => {
    let result = []
    const data = await knex('auction')
        .select('created_at')
        .orderBy('created_at', 'desc')
        .limit(1000)
    switch (type) {
        case 'month':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('MM-YYYY'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'day':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'hour':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM HH:mm')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'minute':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('DD-MM HH:mm'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        default:
            break
    }

    return result
}
exports.getUser = async type => {
    let result = []
    const data = await knex('user')
        .select('created_at')
        .orderBy('created_at', 'desc')
    switch (type) {
        case 'month':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('MM-YYYY'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'day':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'hour':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM HH:mm')
                )
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        case 'minute':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('DD-MM HH:mm'))
                .map((key, value) => {
                    return {
                        created_at: value,
                        count: key.length
                    }
                })
                .value()
            break
        default:
            break
    }

    return result
}
exports.getMoney = async type => {
    let result = []
    const data = await knex('auction')
        .select('created_at', 'sell_price')
        .orderBy('created_at', 'desc')
        .limit(1000)
        .offset(0)
    switch (type) {
        case 'month':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('MM-YYYY'))
                .map((key, value) => {
                    const sum = key.reduce((prev, next) => {
                        return prev + next.sell_price
                    }, 0)
                    const revenue = Math.floor(Math.random() * sum * 0.5)

                    return {
                        created_at: value,
                        money: sum,
                        revenue
                    }
                })
                .value()
            break
        case 'day':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM')
                )
                .map((key, value) => {
                    const sum = key.reduce((prev, next) => {
                        return prev + next.sell_price
                    }, 0)
                    const revenue = Math.floor(Math.random() * sum * 0.5)

                    return {
                        created_at: value,
                        money: sum,
                        revenue
                    }
                })
                .value()
            break
        case 'hour':
            result = _(data)
                .groupBy(i =>
                    moment(i.created_at)
                        .startOf('hour')
                        .format('DD-MM HH:mm')
                )
                .map((key, value) => {
                    const sum = key.reduce((prev, next) => {
                        return prev + next.sell_price
                    }, 0)
                    const revenue = Math.floor(Math.random() * sum * 0.5)

                    return {
                        created_at: value,
                        money: sum,
                        revenue
                    }
                })
                .value()
            break
        case 'minute':
            result = _(data)
                .groupBy(i => moment(i.created_at).format('DD-MM HH:mm'))
                .map((key, value) => {
                    const sum = key.reduce((prev, next) => {
                        return prev + next.sell_price
                    }, 0)
                    const revenue = Math.floor(Math.random() * sum * 0.5)

                    return {
                        created_at: value,
                        money: sum,
                        revenue
                    }
                })
                .value()
            break
        default:
            break
    }

    return result
}
exports.summary = async () => {
    const user = await knex('user')
        .count()
        .then(result => result[0]['count(*)'])
    const auction = await knex('auction')
        .count()
        .then(result => result[0]['count(*)'])
    const auction_raise = await knex('auction_history')
        .count()
        .then(result => result[0]['count(*)'])
    const chat = await knex('chat')
        .count()
        .then(result => result[0]['count(*)'])
    const successAuctions = await knex('auction')
        .where("auction_count", ">", 0)
        // .where("status", 5)
        .whereIn("status", [3, 4, 5])
    // .sum('sell_price')
    // .then(result => result[0]['sum(`sell_price`)'])
    const money = _.sum(successAuctions.map(auction => auction.sell_price))
    const revenue = _.sum(successAuctions.map(auction => auction.sell_price - auction.start_price))

    return {
        user,
        auction,
        auction_raise,
        money: parseInt(money),
        revenue,
        chat
    }
}
exports.insertRequestCount = async (count, port) => {
    await knex('request').insert({ count, port })
}
exports.getRequestCount = async limit => {
    const data = await knex('request')
        .select('time')
        .sum('count as total_count')
        .groupBy('time')
        .orderBy('time', 'desc')
        .limit(limit || 100);
    // const data = await knex('request')
    //     .select()
    //     .limit(limit || 100)
    //     .orderBy('time', 'desc')

    return data.map(i => {
        return {
            count: i.total_count,
            created_at: moment(i.time).format('HH:mm:ss')
        }
    })
}
