require('dotenv').config({ path: '.localenv' })

const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const uuid = require('uuid/v4')
const config = require('./config')
const router = require('./routes')

const app = new Koa()

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.app.emit('error', err, ctx)
    }
})
app.use(config.corsOrigin ? cors({ origin: config.corsOrigin }) : cors())

app.use(bodyParser())

// simple request middleware

app.use(async (ctx, next) => {
    ctx.request.id = uuid().replace(/-/g, '')

    await next()
})
app.use(router.routes())

if (!module.parent)
    app.listen(config.port, () => {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.info(`App is running on port ${config.port}`)
    })
