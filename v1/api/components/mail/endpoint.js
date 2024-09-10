/* eslint-disable func-names */
const debug = require('debug')('auction:route:user')
const Router = require('@koa/router')
const nodemailer = require('nodemailer')

// const { genericSecure } = require('../../middleware/security')
const { validate } = require('../../middleware/validator')
const { log } = require('../../utils/winston')
const schema = require('./schema')
const config = require('../../config')

const router = new Router()

router.post(
    '/send-mail',
    // genericSecure,
    validate(schema.sendSchema),
    async ctx => {
        debug('GET /send-mail')
        const { body } = ctx.request
        try {
            const transporter = nodemailer.createTransport({
                // config mail server
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: config.nodeMailerEmail, // Tài khoản gmail vừa tạo
                    pass: config.nodeMailerPassword // Mật khẩu tài khoản gmail vừa tạo
                }
                // tls: {
                //     // do not fail on invalid certs
                //     rejectUnauthorized: false
                // }
            })
            let content = ''
            content += `
                <div style="padding: 10px; background-color: #003375">
                    <div style="padding: 10px; background-color: white;">
                        <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                        <span style="color: black">Đây là mail test</span>
                    </div>
                </div>
            `
            const mainOptions = {
                // thiết lập đối tượng, nội dung gửi mail
                from: config.nodeMailerEmail,
                to: body.email,
                subject: 'Test Nodemailer',
                text: 'Your text is here', // Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
                html: content // Nội dung html mình đã tạo trên kia :))
            }
            // await transporter.sendMail(mainOptions, function(err, info) {
            //     if (err) {
            //         log.error(err)
            //     } else {
            //         log.info(`Message sent: ${info.response}`)
            //     }
            // })
            const response = await transporter.sendMail(mainOptions)
            log.info(`Log success`, JSON.stringify(response))
            ctx.body = {
                success: true,
                body: response
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
        }
    }
)

module.exports = router
