/* eslint-disable no-unused-vars */
const { fakerVI } = require('@faker-js/faker')
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))

const faker = fakerVI
const moment = require('moment')

function randomRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

const buildProduct = () => {
    const categoryId = randomRange(1, 21)
}

function gen() {
    return {
        auction: {
            start_time: moment(Date.now())
                .add(Math.floor(Math.random() * 500000), 'minute')
                .format('YYYY-MM-DD HH:mm:ss'),
            auction_time: randomRange(10, 20),
            is_returned: randomRange(0, 1),
            is_finished_soon: randomRange(0, 1)
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
            category_id: randomRange(1, 21),
            start_price: randomRange(1, 50000) * 10000,
            images: [1, 2, 3, 4, 5].map(i => faker.image.image())
        }
    }
}
gen()
