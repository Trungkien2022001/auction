const Hoek = require('@hapi/hoek')
const auctionTime = require('./constant')

const defaults = {
    production: false,
    port: 3000,
    socket_port: 3031,
    searchCacheTimeInSeconds: 1800,
    debug: true,
    secret: 'n0dejssuCk',
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: null,
    redisDb: 0,
    redisPrefix: 'auction:',
    auctionTime,
    mysqlConnectionUrl: 'mysql://root@localhost/auction',
    messageLimit: 200,
    maxRateLimt: 100,
    nodeMailerEmail: 'example@gmail.com',
    nodeMailerPassword: 'example',
    kafkaHost: 'localhost:9092',
    elasticHost: 'http://admin:123456@localhost:9200',
    rabbitMQHost: 'amqp://localhost',
    topicName: 'test-topic',
    esAuctionIdx: 'auction_idx',
    isUseElasticSearch: false
}
const custom = {
    production:
        process.env.NODE_ENV === 'production' ||
        process.env.ENV === 'production',
    port: process.env.PORT,
    socket_port: process.env.SOCKET_PORT,
    secret: process.env.SECRET,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
    redisDb: process.env.REDIS_DB,
    redisPrefix: process.env.REDIS_PREFIX,
    mysqlConnectionUrl: process.env.MYSQL_CONNECTION_URL,
    messageLimit: process.env.MESSAGE_LIMIT,
    maxRateLimt: process.env.MAX_RATE_LIMIT,
    nodeMailerEmail: process.env.NODE_MAILER_EMAIL,
    nodeMailerPassword: process.env.NODE_MAILER_PASSWORD,
    kafkaHost: process.env.KAFKA_HOST,
    rabbitMQHost: process.env.RABBITMQ_HOST,
    topicName: process.env.KAFKA_TOPIC,
    elasticHost: process.env.ELASTIC_HOST,
    esAuctionIdx: process.env.ELASTIC_AUCTION_IDX,
    isUseElasticSearch: process.env.IS_USE_ELASTICSEARCH
}

const config = Hoek.applyToDefaults(defaults, custom)

module.exports = config
