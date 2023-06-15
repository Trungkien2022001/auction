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
            // eslint-disable-next-line import/no-dynamic-require
            const controller = require(file) // eslint-disable-line global-require
            router.use(controller.routes()).use(controller.allowedMethods())
        })
    }
)

// Health check
router.get('/health', async ctx => {
    ctx.body = 'ok kien!'
})

module.exports = router
