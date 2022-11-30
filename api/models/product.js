const { knex } = require('../connectors')

exports.addProduct = async product => {
    const result = await knex('product').insert(product)

    return result
}
