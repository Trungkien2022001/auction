const bcrypt = require('bcryptjs')

exports.hashPassword = function hashPassword(plaintext) {
    return bcrypt.hashSync(plaintext, 5)
}

exports.compareHash = function compareHash(plaintext, hash) {
    return bcrypt.compareSync(plaintext, hash)
}
