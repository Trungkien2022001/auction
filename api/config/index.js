const Hoek = require('@hapi/hoek')

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
    redisPrefix: 'test:',
    mysqlConnectionUrl: 'mysql://root@localhost/auction'
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
    mysqlConnectionUrl: process.env.MYSQL_CONNECTION_URL
}

const config = Hoek.applyToDefaults(defaults, custom)

module.exports = config
