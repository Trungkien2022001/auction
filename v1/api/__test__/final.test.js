/* eslint-disable no-await-in-loop */
const Promise = require('bluebird')
require('dotenv').config({ path: '.env' })
// const { promises } = require('nodemailer/lib/xoauth2');
const request = Promise.promisifyAll(require('request'))
const moment = require('moment')
const jwt = require('jwt-simple')
// const { logger } = require('../utils/winston')
const { knex } = require('../connectors')
const config = require('../config')
const { getAuctionDetail } = require('../components/auction/controller')

async function login(user) {
    const payload = {
        id: user.id,
        email: user.email,
        expire: moment()
            .add('300', 'days')
            .unix()
    }

    return {
        ...user,
        token: jwt.encode(payload, config.secret)
    }
}

async function getAllUser(limit) {
    const users = await knex('user')
        .select()
        .where({
            del_flag: 0
        })
        .limit(limit || 1000)
        .offset(0)
    const credentials = []
    for (let idx = 0; idx < users.length; idx += 1) {
        const user = users[idx]
        const cred = await login(user)
        credentials.push(cred)
    }

    return credentials
}
// getAllUser()
async function realRaise(user, auction) {
    const options = {
        json: true,
        headers: {
            Accept: 'gzip, deflate, br',
            'x-key': user.email,
            'x-access-token': user.token
        },
        body: { price: user.price, time: '2024-07-11 11:45:30' }
    }
    try {
        const { body } = await request.postAsync(
            `http://localhost:3030/auction/raise?auction_id=${auction.id}`,
            options
        )
        console.log(body)
    } catch (error) {
        console.log(error)
    }
}
// realRaise()
async function run() {
    const AUCTION_ID = 229288
    const LIMIT = 50
    const lstUser = await getAllUser(LIMIT)
    const auction = await getAuctionDetail({ id: AUCTION_ID })
    const listRaise = lstUser.map((item, index) => ({
        ...item,
        price: auction.sell_price + 1000000 * (index + 1)
    }))
    // await Promise.all(
    //     listRaise.map(async r => {
    //         await realRaise(r, auction)
    //     })
    // )
    for (let i = 0; i < listRaise.length; i += 1) {
        const item = listRaise[i]
        await realRaise(item, auction)
    }
    // await realRaise(listRaise[0], AUCTION_ID)
}
run()
