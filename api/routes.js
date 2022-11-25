/* eslint-disable import/no-dynamic-require */
const Router = require('@koa/router')
const glob = require('glob')

const router = new Router()

// bootstrap routes
glob(
    `${__dirname}/components/**/*endpoint.js`,
    { ignore: '**/index.js' },
    (err, matches) => {
        if (err) {
            throw err
        }

        matches.forEach(file => {
            const controller = require(file) // eslint-disable-line global-require
            router.use(controller.routes()).use(controller.allowedMethods())
        })
    }
)

module.exports = router
