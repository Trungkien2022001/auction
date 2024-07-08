/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const { fakerVI } = require('@faker-js/faker')
require('dotenv').config({ path: '.env' })
const moment = require('moment')
// const Promise = require('bluebird')
// const request = Promise.promisifyAll(require('request'))
const { MOCK } = require('./constant')

const faker = fakerVI
const { createAuction } = require('../components/auction/controller')
const { logger } = require('../utils/winston')
const { AUCTION_TIME } = require('../config/constant')

function randomRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function getRandomValue(arr) {
    if (!Array.isArray(arr)) {
        return arr
    }

    return arr[randomRange(0, arr.length - 1)]
}

function getRandomSubArr(arr, count = 1) {
    if (!Array.isArray(arr)) {
        return []
    }
    const shuffledArray = arr.sort(() => Math.random() - 0.5)

    const result = shuffledArray.slice(0, Math.min(count, shuffledArray.length))

    return result
}

const buildProduct = categoryId => {
    const category = MOCK.product.find(i => i.id === categoryId)
    const name = getRandomValue(category.names)
    const productStatus = getRandomValue(MOCK.product_status)
    const branch = getRandomValue(MOCK.branch[categoryId])
    const country = getRandomValue(MOCK.countries)
    const product = {
        name: `${name} ${branch} ${getRandomValue(
            MOCK.qualifies
        )} nhập khẩu từ ${country}`,
        title: `${name} ${productStatus} chính hãng ${branch} ${getRandomValue(
            MOCK.qualifies
        )} được nhập khẩu từ ${country}`,
        status: productStatus,
        branch,
        key_word: getRandomSubArr(MOCK.keywords[categoryId], 3).join(','),
        description: MOCK.description[0],
        images: getRandomSubArr(category.imgs, randomRange(4, 8))
    }

    return product
}

function gen() {
    const categoryId = randomRange(1, 21)
    const start_time = moment(Date.now())
        .add(Math.floor(Math.random() * 5000), 'minute')
        .format('YYYY-MM-DD HH:mm:ss')
    const auction_time = randomRange(1, 20)

    return {
        auction: {
            start_time,
            auction_time,
            end_time: moment(start_time)
                .add(AUCTION_TIME[auction_time], 'minutes')
                .format('YYYY-MM-DD HH:mm:ss'),
            is_returned: randomRange(0, 1),
            is_finished_soon: randomRange(0, 1)
        },
        product: {
            category_id: categoryId,
            start_price: randomRange(1, 1000) * 100000,
            ...buildProduct(categoryId)
        }
    }
}

async function createMockAuction() {
    const total = randomRange(1, 3)
    await Promise.all(
        Array(total)
            .fill(0)
            .map(async () => {
                await createAuction({
                    body: gen(),
                    user: {
                        id: randomRange(1, 18),
                        create_free_auction_remain: 10,
                        amount: 1000000000
                    }
                })
            })
    )
    logger.info(`Created ${total} Mock Auction!`)
}

async function run() {
    const total = 800
    for (let i = 0; i < total; i += 1) {
        await Promise.all(
            Array(100)
                .fill(0)
                .map(async () => {
                    await createMockAuction()
                })
        )
    }
}
// run()

module.exports = {
    run,
    createMockAuction
}
