/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const debug = require('debug')('auction:model:auction')
const _ = require('lodash')
const config = require('../config')
const { AUCTION_TIME, PRODUCT_CATEGORY } = require('../config/constant')
const { esClient } = require('../connectors')
const { logger } = require('../utils/winston')

const auctionElasticIndex = config.esAuctionIdx

function tranformElasticResponse(data) {
    const list = _.get(data, 'hits.hits', []).map(i => i._source)

    return list
}

function transformAuctionResp(data) {
    return data.map(i => {
        return {
            id: i.id,
            start_time: i.start_time,
            start_price: i.start_price,
            sell_price: i.sell_price,
            auction_count: i.auction_count,
            name: i.name,
            title: i.title,
            image: i.image,
            seller_id: i.seller_id,
            category_id: i.category_id,
            time: AUCTION_TIME[i.auction_time]
        }
    })
}

exports.getCheapAuction = async () => {
    const response = await esClient.search({
        index: auctionElasticIndex,
        body: {
            query: {
                bool: {
                    must: [
                        { term: { status: { value: 2 } } },
                        {
                            bool: {
                                must_not: { exists: { field: 'deleted_at' } }
                            }
                        }
                    ]
                }
            },
            sort: [{ sell_price: { order: 'asc' } }],
            size: 6,
            from: 0
        }
    })
    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return toReturn
}

exports.getLatestAuction = async () => {
    const response = await esClient.search({
        index: auctionElasticIndex,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                status: {
                                    value: 2
                                }
                            }
                        },
                        {
                            bool: {
                                must_not: {
                                    exists: {
                                        field: 'deleted_at'
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    start_time: { order: 'desc' }
                }
            ],
            size: 6,
            from: 0
        }
    })
    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return toReturn
}
exports.getIncomingAuction = async () => {
    const response = await esClient.search({
        index: auctionElasticIndex,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                status: {
                                    value: 1
                                }
                            }
                        },
                        {
                            bool: {
                                must_not: {
                                    exists: {
                                        field: 'deleted_at'
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    updated_at: { order: 'desc' }
                }
            ],
            size: 6,
            from: 0
        }
    })
    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return toReturn
}
exports.getExpensiveAuction = async () => {
    const response = await esClient.search({
        index: auctionElasticIndex,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                status: {
                                    value: 2
                                }
                            }
                        },
                        {
                            bool: {
                                must_not: {
                                    exists: {
                                        field: 'deleted_at'
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    sell_price: { order: 'desc' }
                }
            ],
            size: 6,
            from: 0
        }
    })
    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return toReturn
}
exports.getFeaturedAuction = async () => {
    const response = await esClient.search({
        index: auctionElasticIndex,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                status: {
                                    value: 2
                                }
                            }
                        },
                        {
                            bool: {
                                must_not: {
                                    exists: {
                                        field: 'deleted_at'
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    auction_count: { order: 'desc' }
                }
            ],
            size: 6,
            from: 0
        }
    })
    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return toReturn
}
exports.getAuctions = async params => {
    debug('MODEL/auction getAuctions')
    const {
        type = 'homepage',
        limit = 24,
        page = 0,
        sort,
        category = 'all',
        name,
        seller_id,
        price_from,
        price_to
    } = params
    const sorted = type === 'homepage' ? sort || 'featured' : sort
    const body = {
        query: {
            bool: {}
        },
        sort: [],
        size: limit,
        from: page * limit || 0
    }
    const mustConditional = []
    if (type === 'homepage') {
        mustConditional.push({
            bool: {
                must_not: {
                    exists: {
                        field: 'deleted_at'
                    }
                }
            }
        })
    }
    if (name) {
        mustConditional.push({
            regexp: {
                'name.keyword': `.*${name}.*`
            }
        })
    }
    if (seller_id) {
        mustConditional.push({
            term: {
                seller_id: {
                    value: seller_id
                }
            }
        })
    }
    if (category !== 'all' && PRODUCT_CATEGORY[category]) {
        mustConditional.push({
            term: {
                category_id: {
                    value: PRODUCT_CATEGORY[category]
                }
            }
        })
    }

    if (price_from && parseInt(price_from) <= parseInt(price_to)) {
        mustConditional.push({
            range: {
                sell_price: {
                    gte: price_from
                }
            }
        })
    }

    if (price_to) {
        mustConditional.push({
            range: {
                sell_price: {
                    lte: price_to
                }
            }
        })
    }
    switch (sorted) {
        case 'featured':
        case 'cheapest':
        case 'latest':
        case 'expensive':
            mustConditional.push({
                term: {
                    status: {
                        value: 2
                    }
                }
            })
            break
        case 'incoming':
            mustConditional.push({
                term: {
                    status: {
                        value: 1
                    }
                }
            })
            break
        default:
            break
    }
    body.query.bool.must = mustConditional
    switch (sorted) {
        case 'featured':
            body.sort.push({
                start_time: { order: 'desc' }
            })
            break
        case 'cheapest':
            body.sort.push({
                sell_price: { order: 'asc' }
            })
            break
        case 'expensive':
            body.sort.push({
                sell_price: { order: 'desc' }
            })
            break
        case 'incoming':
        case 'latest':
            body.sort.push({
                start_time: { order: 'desc' }
            })
            break
        default:
            break
    }
    logger.info(`Elasticsearch query: ${JSON.stringify(body)}`)

    const response = await esClient.search({
        index: config.esAuctionIdx,
        body
    })

    const beautyResponse = tranformElasticResponse(response)
    const toReturn = transformAuctionResp(beautyResponse)

    return {
        count: {
            total: response.hits.total.value,
            lastPage: Math.floor(response.hits.total.value / limit),
            prevPage: null,
            nextPage: null,
            perPage: limit,
            currentPage: page,
            from: 0,
            to: limit
        },
        products: toReturn
    }
}

exports.updateAuction = async (auctionId, updatedFields) => {
    try {
        const searchResponse = await esClient.search({
            index: auctionElasticIndex,
            body: {
                query: {
                    term: { id: auctionId }
                }
            }
        })

        const documentId = _.get(searchResponse, 'hits.hits[0]._id')
        if (!documentId) {
            throw new Error(
                `Auction with id: ${auctionId}not found in Elasticsearch`
            )
        }
        const updateResponse = await esClient.update({
            index: auctionElasticIndex,
            id: documentId,
            body: {
                doc: updatedFields
            }
        })

        return updateResponse
    } catch (error) {
        logger.error(`Error updating auction in ES!`, error)
        throw new Error(
            `Unable to update auction with auction_id: ${auctionId}in Elasticsearch`,
            error
        )
    }
}
exports.deleteAuction = async auctionId => {
    try {
        const searchResponse = await esClient.search({
            index: auctionElasticIndex,
            body: {
                query: {
                    term: { id: auctionId }
                }
            }
        })

        const documentId = _.get(searchResponse, 'hits.hits[0]._id')
        if (!documentId) {
            throw new Error(
                `Auction with id: ${auctionId}not found in Elasticsearch`
            )
        }
        const deleteResponse = await esClient.delete({
            index: auctionElasticIndex,
            id: documentId
        })

        return deleteResponse
    } catch (error) {
        logger.error(`Error delete auction in ES!`, error)
        throw new Error(
            `Unable to delete auction with auction_id: ${auctionId} in Elasticsearch`,
            error
        )
    }
}
exports.createAuction = async (auctionId, data) => {
    try {
        const searchResponse = await esClient.search({
            index: auctionElasticIndex,
            body: {
                query: {
                    term: { id: auctionId }
                }
            }
        })

        const documentId = _.get(searchResponse, 'hits.hits[0]._id')
        if (documentId) {
            throw new Error(
                `Auction with id: ${auctionId} existed in Elasticsearch`
            )
        }
        const response = await esClient.index({
            index: auctionElasticIndex,
            body: data
        })

        return response
    } catch (error) {
        logger.error(`Error create auction in ES!`, error)
        throw new Error(
            `Unable to create auction with auction_id: ${auctionId} in Elasticsearch`,
            error
        )
    }
}
