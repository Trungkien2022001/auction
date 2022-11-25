// auth.js
const moment = require('moment')
const jwt = require('jwt-simple')
const { compareHash, hashPassword } = require('../../utils/auth')
const { knex } = require('../../connectors')
const config = require('../../config')
const { fetchUserByEmail } = require('../../models/user')
const { addUser } = require('../../models/user')

exports.login = async params => {
    const user = await fetchUserByEmail(params.email)
    const validHash = await compareHash(params.password, user.password_hash)

    if (!user || !validHash) {
        throw new Error('invalid email/password')
    } else {
        const payload = {
            id: user.id,
            email: user.email,
            expire: moment()
                .add('7', 'days')
                .unix()
        }

        return jwt.encode(payload, config.secret)
    }
}

exports.signup = async params => {
    const u = await knex
        .select('email')
        .from('user')
        .where('email', params.email)

    if (u.length) {
        throw new Error(`user ${params.email} already exits`)
    }
    const userInfo = {
        email: params.email,
        name: params.name,
        password_hash: hashPassword(params.password)
    }
    if (params.avatar) userInfo.avatar = params.avatar
    if (params.birthday) userInfo.birthday = params.birthday
    addUser(userInfo)
}
