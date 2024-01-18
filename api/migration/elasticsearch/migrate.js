/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const _ = require('lodash')
const { knex, esClient } = require('../../connectors')
const { logger } = require('../../utils/winston')

const lstTable = ['auction', 'product', 'auction_status', 'auction_time']
async function migrateAll() {
    logger.info(`Starting Migartion Elasticsearch`)
    for (const tableName of lstTable) {
        const lists = await knex(tableName)
        const indexName = `${tableName}_index`
        logger.info(`Table: ${tableName}, numOfRows: ${lists.length}`)
        for (let i = 0; i < lists.length; i += 1) {
            const document = lists[i]

            try {
                await esClient.index({
                    index: indexName,
                    body: document
                })
            } catch (error) {
                logger.error(`Error adding document ${i}:`, error)
            }
        }
        logger.info(`Migrate Table: ${tableName} successfully!`)
    }
    logger.info(`Migrate successfully!`)
}
// migrateAll()

async function migrateAuction() {
    const list = await knex
        .select(
            'a.id',
            'a.start_time',
            'a.end_time',
            'a.auction_time',
            'a.product_id',
            'a.start_price',
            'a.sell_price',
            'a.seller_id',
            'a.auction_count',
            'a.status',
            'ast.name as auction_status',
            'a.is_returned',
            'a.is_finished_soon',
            'a.created_at',
            'a.updated_at',
            'p.name',
            'p.description',
            'p.branch',
            'p.image',
            'p.category_id',
            'p.title',
            'p.key_word',
            'p.status as product_status'
        )
        .from('auction as a')
        .innerJoin('product as p', 'a.product_id', 'p.id')
        .innerJoin('auction_time as at', 'a.auction_time', 'at.id')
        .innerJoin('auction_status as ast', 'a.status', 'ast.id')
        .whereIn('a.status', [1, 2])
    // .limit(1)
    // .offset(0)

    const tableName = 'auction'
    const indexName = 'auction_idx'
    logger.info(`Table: ${tableName}, numOfRows: ${list.length}`)
    const chunkList = _.chunk(list, 50)
    for (let i = 0; i < chunkList.length; i += 1) {
        const documents = chunkList[i]
        await Promise.all(
            documents.map(async document => {
                try {
                    await esClient.index({
                        index: indexName,
                        body: document
                    })
                } catch (error) {
                    logger.error(`Error adding document ${i}:`, error)
                }
            })
        )
        logger.info(`Migrate ${documents.length} records successfully!`)
    }
    logger.info(`Migrate Table: ${tableName} successfully!`)
}
migrateAuction()
