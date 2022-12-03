const debug = require('debug')('auction:model:product')
const { knex } = require('../connectors')

exports.addProduct = async product => {
    debug('MODEL/product addProduct')
    try {
        const result = await knex('product').insert(product)

        return result
    } catch (err) {
        throw new Error(err.message || JSON.stringify(err))
    }
}
