const { logger } = require('../utils/winston')

const test = metadata => {
    logger.info(metadata)
}
module.exports = {
    test
}
