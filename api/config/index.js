const Hoek = require('@hapi/hoek')
const auctionTime = require('./constant')

const defaults = {
    production: false,
    port: 3000,
    socket_port: 3031,
    searchCacheTimeInSeconds: 1800,
    debug: false,
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
    maxListeners: 10,
    nodeMailerEmail: 'example@gmail.com',
    nodeMailerPassword: 'example',
    kafkaHost: 'localhost:9092',
    elasticHost: 'http://admin:123456@localhost:9200',
    rabbitMQHost: 'amqp://localhost',
    topicName: 'test-topic',
    esAuctionIdx: 'auction_idx',
    isUseElasticSearch: false,
    isUseKafka: false,
    isUseKafkaOnSocketServer: false,
    vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnpApi: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    vnpReturnUrl: 'http://localhost:8888/order/vnpay_return',
    vnpTmnCode: '4DXY784V',
    allowMock: true,
    vnpHashSecret:
        '6da7e6ad1270bc7674f2b436f4301fa8/1/010e018cc9347967-fe6be0c1-681e-4b66-a646-540c4a556160-000000/R46ByIKy1LoJUAYTo4juNdBE6pQ=139'
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
    maxListeners: process.env.MAX_LISTENERS,
    nodeMailerEmail: process.env.NODE_MAILER_EMAIL,
    nodeMailerPassword: process.env.NODE_MAILER_PASSWORD,
    kafkaHost: process.env.KAFKA_HOST,
    rabbitMQHost: process.env.RABBITMQ_HOST,
    topicName: process.env.KAFKA_TOPIC,
    elasticHost: process.env.ELASTIC_HOST,
    esAuctionIdx: process.env.ELASTIC_AUCTION_IDX,
    isUseElasticSearch: !process.env.IS_USE_ELASTICSEARCH === 'false',
    isUseKafka: !process.env.IS_USE_KAFKA === 'false',
    vnpTmnCode: process.env.VNP_TMN_CODE,
    vnpHashSecret: process.env.VNP_HASH_SECRET
}

const config = Hoek.applyToDefaults(defaults, custom)

module.exports = config
