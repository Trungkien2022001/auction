require('dotenv').config({ path: '.localenv' })

const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const ratelimit = require('koa-ratelimit')
const config = require('./config')
const router = require('./routes')
const { log } = require('./middleware/log')
const { insertRequestCount } = require('./models/dashboard')

const app = new Koa()
let requestCount = 0
app.use(cors())
app.use(log)

app.use(bodyParser())

// simple request middleware

const rateLimitMiddleware = ratelimit({
    windowMs: 1 * 60 * 1000, // 15 phút
    max: 100, // Giới hạn 100 yêu cầu trong 15 phút
    message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
})
if (config.allowRateLimit) {
    app.use(rateLimitMiddleware)
}
app.use(async (ctx, next) => {
    requestCount += 1
    await next()
})
setInterval(() => {
    if (requestCount) {
        insertRequestCount(requestCount)
    }
    requestCount = 0
}, 1000)
app.use(router.routes())
if (!module.parent)
    app.listen(process.argv[2] || config.port, () => {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.info(`App is running on port ${config.port}`)
    })
