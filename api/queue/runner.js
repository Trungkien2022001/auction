const { logger } = require('../utils/winston')
const elasticsearchModel = require('../models/elastic')

const test = metadata => {
    logger.info(metadata)
}

const updateAuction = async data => {
    logger.info("Updating auction in ES", JSON.stringify(data))
    const auction = await elasticsearchModel.updateAuction(data.auction_id, {
        status:2,
        auction_status: "Đang đấu giá"
    })
}
module.exports = {
    updateAuction,
    test
}
