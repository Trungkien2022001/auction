/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
require('dotenv').config({ path: '.env' })
const { MOCK } = require('./constant')
const { register } = require('../components/auth/endpoint')
const { signup } = require('../components/auth/controller')
const { logger } = require('../utils/winston')

function randomRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function getRandomValue(arr) {
    if (!Array.isArray(arr)) {
        return arr
    }

    return arr[randomRange(0, arr.length - 1)]
}

function buildUsernameFromName(str) {
    str = str.toLowerCase();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/đ/g, 'd');

    str = str.replace(/\s/g, '');

    return str + randomRange(100,1000);
}


function gen() {
    const gender = randomRange(0, 1)
    const firstName = getRandomValue(MOCK.user.lastName)
    const lastName = getRandomValue(gender ? MOCK.user.femaleNames : MOCK.user.maleNames)
    const middleName = MOCK.user.middleNames[gender]
    const name = `${firstName} ${middleName} ${lastName}`
    const username = buildUsernameFromName(name)
    let userInfo = {
        name,
        username,
        email: `${username}@gmail.com`,
        phone: `0${randomRange(1e8, 1e9)}`,
        password: '123456',
        birthday:  "2001-02-20",
        address: "279 Đội Cấn, Ba Đình, Hà Nội",
        avatar: "http://res.cloudinary.com/trungkien2022001/image/upload/v1705892226/upload/eg4p8y19vy4siosvgizt.png"
    }
    return userInfo
}

async function createMockUser() {
    const total = randomRange(1, 10)
    await Promise.all(
        Array(total)
            .fill(0)
            .map(async () => {
                await signup(gen())
            })
    )
    logger.info(`Created ${total} User!`)
}
module.exports = {
    createMockUser
}