/* eslint-disable prefer-destructuring */
const moment = require('moment')
const _ = require('lodash')
const { knex } = require('../connectors')

const baseFn = async (type, tableName) => {
    let result = []
    let dateConditional
    switch (type) {
        case 'day':
            result = await knex(tableName)
                .select(knex.raw('DATE(created_at) as date'))
                .count('* as count')
                // .where('created_at', '>', dateConditional)
                .groupBy('date')
                .orderBy('date', 'desc')
                .limit(30)
            result = result.map(i => {
                return {
                    created_at: moment(i.date).format('DD-MM-YYYY'),
                    count: i.count
                }
            })
            break
        case 'hour':
            result = await knex(tableName)
                .select(
                    knex.raw(
                        'DATE_FORMAT(created_at, "%Y-%m-%d %H:00:00") as date'
                    )
                )
                .count('* as count')
                // .where('created_at', '>', dateConditional)
                .groupBy('date')
                .orderBy('date', 'desc')
                .limit(24)
            result = result.map(i => {
                return {
                    created_at: moment(i.date).format('DD-MM-YYYY HH:mm'),
                    count: i.count
                }
            })
            break
        case 'minute':
            dateConditional = new Date()
            dateConditional.setMinutes(dateConditional.getMinutes() - 60)

            result = await knex(tableName)
                .select(
                    knex.raw(
                        'DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:00") as date'
                    )
                )
                .count('* as count')
                // .where('created_at', '>', dateConditional)
                .groupBy('date')
                .orderBy('date', 'desc')
                .limit(60)
            result = result.map(i => {
                return {
                    created_at: moment(i.date).format('DD-MM-YYYY HH:mm'),
                    count: i.count
                }
            })
            break
        default:
            break
    }

    return result
}

exports.getAuctionRaise = async type => {
    return baseFn(type, 'user_auction')
}
exports.getAuction = async type => {
    return baseFn(type, 'auction')
}
exports.getUser = async type => {
    return baseFn(type, 'user')
}

async function calculateMoney(dateConditional, format) {
    const result = await knex('auction')
        .select('start_price', 'sell_price', 'end_time')
        .orderBy('end_time', 'desc')
        .whereBetween('end_time', [dateConditional, moment().format()])
        .whereIn('status', [3, 4, 5])
    // .where("status", 3)

    return _(result)
        .groupBy(i => moment(i.end_time).format(format))
        .map((key, value) => {
            const money = key.reduce((prev, next) => {
                return prev + next.sell_price
            }, 0)
            const revenue = key.reduce((prev, next) => {
                return prev + next.sell_price - next.start_price
            }, 0)

            return {
                created_at: value,
                money,
                revenue
            }
        })
        .value()
}

exports.getMoney = async type => {
    let result = []
    let dateConditional
    switch (type) {
        case 'day':
            dateConditional = new Date()
            dateConditional.setDate(dateConditional.getDate() - 360)
            result = calculateMoney(dateConditional, 'DD-MM-YYYY')
            break
        case 'hour':
            dateConditional = new Date()
            dateConditional.setHours(dateConditional.getHours() - 720)
            result = calculateMoney(dateConditional, 'DD-MM HH')
            break
        case 'minute':
            dateConditional = new Date()
            dateConditional.setMinutes(dateConditional.getMinutes() - 1440)
            result = calculateMoney(dateConditional, 'DD-MM HH:mm')
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
        // .where("auction_count", ">", 0)
        // .where("status", 5)
        .whereIn('status', [5, 3, 4])
    // .sum('sell_price')
    // .then(result => result[0]['sum(`sell_price`)'])
    const money = _.sum(successAuctions.map(a => a.sell_price))
    const revenue = _.sum(
        successAuctions.map(a => a.sell_price - a.start_price)
    )

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
        .limit(limit || 100)
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
