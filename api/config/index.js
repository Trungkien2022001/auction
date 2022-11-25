const Hoek = require('@hapi/hoek')

const defaults = {
    production: false,
    port: 3000,
    searchCacheTimeInSeconds: 1800,
    debug: true,
    maxRatePerNightInUSD: 5000,
    secret: 'n0dejssuCk',
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: null,
    redisDb: 0,
    redisPrefix: 'test:',
    mysqlConnectionUrl: 'mysql://root@localhost/auction',
    queueName: 'OfferSearchQueueTest',
    queueNameCountry: 'OfferSearchQueueTest',
    maxResults: 50,
    engineEndpointUrl: 'https://engine-api-v4.staging.goquo.io/api',
    hotelMappingUrl: 'localhost',
    telegramWebHookUrl: 'https://datadog-webhook.live.goquo.io/gateway'
}
const custom = {
    production:
        process.env.NODE_ENV === 'production' ||
        process.env.ENV === 'production',
    port: process.env.PORT,
    secret: process.env.SECRET,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
    redisDb: process.env.REDIS_DB,
    redisPrefix: process.env.REDIS_PREFIX,
    mysqlConnectionUrl: process.env.MYSQL_CONNECTION_URL,
    queueName: process.env.QUEUE_NAME,
    queueNameCountry: process.env.QUEUE_NAME_COUNTRY,
    ntaLiveSearchService: process.env.NTA_LIVE_SEARCH_SERVICE,
    ntaLiveBookingService: process.env.NTA_LIVE_BOOKING_SERVICE,
    disabledMultiRoomSearch: process.env.DISABLED_MULTI_ROOM_SEARCH,
    maxRatePerNightInUSD: process.env.MAX_RATE_PER_NIGHT_IN_USD
        ? parseFloat(process.env.MAX_RATE_PER_NIGHT_IN_USD)
        : null,
    dashboardApi: process.env.DASHBOARD_API,
    hotelMappingUrl: process.env.HOTEL_MAPPING_URL,
    corsOrigin: process.env.CORS_ORIGIN,
    telegramWebHookUrl: process.env.TELEGRAM_WEBHOOK_URL,
    engineEndpointUrl: process.env.ENGINE_API
}

const config = Hoek.applyToDefaults(defaults, custom)

module.exports = config
