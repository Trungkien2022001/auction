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
                .add('30', 'days')
                .unix()
        }

        return { ...user, token: jwt.encode(payload, config.secret) }
    }
}

exports.signup = async params => {
    const u = await knex
        .select()
        .from('user')
        .where('email', params.email)
        .orWhere('phone', params.phone)
        .orWhere('username', params.username)
    if (u.length) {
        throw new Error(`username or phone or email already exits`)
    }
    const userInfo = {
        email: params.email,
        name: params.name,
        username: params.username,
        phone: params.phone,
        birthday: params.birthday,
        address: params.address,
        password_hash: hashPassword(params.password)
    }
    if (params.avatar) userInfo.avatar = params.avatar
    addUser(userInfo)
}
