/* eslint-disable no-underscore-dangle */
const _ = require('lodash')
const config = require('../config')
const { AUCTION_TIME } = require('../config/constant')
const { esClient } = require('../connectors')

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
