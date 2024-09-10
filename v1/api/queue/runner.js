/* eslint-disable camelcase */
const { logger } = require('../utils/winston')
const elasticsearchModel = require('../models/elastic')

const test = metadata => {
    logger.info(metadata)
}

const updateAuction = async data => {
    logger.info('Updating auction in ES', JSON.stringify(data))
    const { auction_id, type, ...updateFields } = data
    await elasticsearchModel.updateAuction(auction_id, updateFields)
}
const insertAuction = async data => {
    logger.info('Insert auction in ES', JSON.stringify(data))
    const { auction_id } = data
    await elasticsearchModel.insertAuction(auction_id)
}
const deleteAuction = async data => {
    logger.info('Deleting auction in ES', JSON.stringify(data))
    const { auction_id } = data
    await elasticsearchModel.deleteAuction(auction_id)
}
module.exports = {
    updateAuction,
    insertAuction,
    deleteAuction,
    test
}
