/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const { fakerVI } = require('@faker-js/faker')
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))

const faker = fakerVI
const moment = require('moment')
const { logger } = require('../utils/winston')
const { createAuction } = require('../components/auction/controller')

function mock() {
    const data = {
        auction: {
            start_time: moment(Date.now())
                .add(Math.floor(Math.random() * 500000), 'minute')
                .format('YYYY-MM-DD HH:mm:ss'),
            // start_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            auction_time: faker.datatype.number({
                min: 10,
                max: 20
            }),
            is_returned: faker.datatype.number({
                min: 0,
                max: 1
            }),
            is_finished_soon: 0
        },
        product: {
            name: faker.lorem.words(5),
            branch: faker.lorem.words(2),
            status: faker.lorem.words(3),
            title: faker.lorem.words(15),
            description: faker.lorem.words(300),
            key_word: faker.lorem
                .words(5)
                .split(' ')
                .join(','),
            category_id: faker.datatype.number({
                min: 1,
                max: 20
            }),
            start_price:
                faker.datatype.number({
                    min: 1,
                    max: 5000
                }) * 10000,
            images: [1, 2, 3, 4, 5].map(i => faker.image.image())
        }
    }

    return data
}
async function run() {
    try {
        const url = 'http://localhost:3030/auction'
        const body = mock()
        const options = {
            body,
            headers: {
                'x-key': 'trungkien07yd@gmail.com',
                'x-access-token':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzE5LCJlbWFpbCI6InRydW5na2llbjA3eWRAZ21haWwuY29tIiwiZXhwaXJlIjoxNzEzNzk4MTM2fQ.6IIppS1b-rYe-50pBwleuHm-2z7cOE9NjZtRNk75ogc'
            },
            json: true
        }
        const result = await request.postAsync(url, options)
    } catch (error) {
        logger.error(error)
    }
}
// run()
const main = async () => {
    for (let i = 0; i < 80000; i += 1) {
        try {
            const body = {
                body: mock(),
                user: {
                    id: Math.floor(Math.random() * 335) + 1,
                    create_free_auction_remain: 10
                }
                // user: JSON.parse(
                //     `{"id":319,"name":"Nguyễn Trung Kiên","username":"trungkien2022001","email":"trungkien07yd@gmail.com","phone":"0989983025","role_id":"admin","avatar":"https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg","birthday":"2001-02-19T17:00:00.000Z","amount":0,"address":"136 Nguyễn An Ninh, Hoàng Mai, Hà Nội","refresh_token":null,"prestige":0,"is_verified":1,"is_blocked":0,"rating":0,"sell_failed_count_by_seller":0,"sell_failed_count_by_auctioneer":0,"sell_success_count":0,"buy_cancel_count_by_seller":0,"buy_cancel_count_by_auctioneer":0,"buy_success_count":0,"custom_config":null,"created_at":"2022-11-19T01:59:39.000Z","updated_at":"2023-05-22T15:15:40.000Z","del_flag":0,"role":{"id":"admin","description":"dashboard","admin":1,"user":1,"auction":1,"homepage":1,"dashboard_auction":0,"dashboard_config":0,"dashboard_money":0,"dashboard_hr":0}}`
                // )
            }
            const result = await createAuction(body)
        } catch (error) {
            logger.error(error)
        }
    }
}
// main()

module.exports = {
    run,
    main
}
