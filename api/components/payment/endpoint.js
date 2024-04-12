/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable global-require */
/* eslint-disable no-buffer-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
const debug = require('debug')('auction:routes:payment')
const Router = require('@koa/router')
const moment = require('moment')
const Promise = require('bluebird')
const request = Promise.promisifyAll(require('request'))
const config = require('../../config')

const paymentModel = require('../../models/payment')

const router = new Router()

function sortObject(obj) {
    const sorted = {}
    const str = []
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }

    str.sort()
    for (let key = 0; key < str.length; key += 1) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        )
    }

    return sorted
}

router.get('/', async ctx => {
    await ctx.render('orderlist', { title: 'Danh sách đơn hàng' })
})

router.get('/create_payment_url', async ctx => {
    await ctx.render('order', { title: 'Tạo mới đơn hàng', amount: 10000 })
})

router.get('/querydr', async ctx => {
    await ctx.render('querydr', { title: 'Truy vấn kết quả thanh toán' })
})

router.get('/refund', async ctx => {
    await ctx.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' })
})

router.post('/create_payment_url', async ctx => {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const date = new Date()
    const createDate = moment(date).format('YYYYMMDDHHmmss')
    const ipAddr = ctx.request.headers['x-forwarded-for'] || ctx.request.ip

    const tmnCode = config.get('vnp_TmnCode')
    const secretKey = config.get('vnp_HashSecret')
    const vnpUrl = config.get('vnp_Url')
    const returnUrl = config.get('vnp_ReturnUrl')
    const orderId = moment(date).format('DDHHmmss')
    const { amount } = ctx.request.body
    const bankCode = ctx.request.body.bankCode || ''

    const locale = ctx.request.body.language || 'vn'
    const currCode = 'VND'

    const vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
    }

    if (bankCode !== '') {
        vnp_Params.vnp_BankCode = bankCode
    }

    const sortedParams = sortObject(vnp_Params)

    const signData = Object.keys(sortedParams)
        .map(key => `${key}=${sortedParams[key]}`)
        .join('&')

    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params.vnp_SecureHash = signed

    const redirectUrl = `${vnpUrl}?${new URLSearchParams(
        vnp_Params
    ).toString()}`

    ctx.redirect(redirectUrl)
})

router.get('/vnpay_return', async ctx => {
    const vnp_Params = ctx.request.query
    const secureHash = vnp_Params.vnp_SecureHash

    delete vnp_Params.vnp_SecureHash
    delete vnp_Params.vnp_SecureHashType

    const sortedParams = sortObject(vnp_Params)

    const config = require('config')
    const tmnCode = config.get('vnp_TmnCode')
    const secretKey = config.get('vnp_HashSecret')

    const signData = Object.keys(sortedParams)
        .map(key => `${key}=${sortedParams[key]}`)
        .join('&')

    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

    if (secureHash === signed) {
        // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        await ctx.render('success', { code: vnp_Params.vnp_ResponseCode })
    } else {
        await ctx.render('success', { code: '97' })
    }
})

router.get('/vnpay_ipn', async ctx => {
    const vnp_Params = ctx.request.query
    const secureHash = vnp_Params.vnp_SecureHash

    const orderId = vnp_Params.vnp_TxnRef
    const rspCode = vnp_Params.vnp_ResponseCode

    delete vnp_Params.vnp_SecureHash
    delete vnp_Params.vnp_SecureHashType

    const sortedParams = sortObject(vnp_Params)
    const config = require('config')
    const secretKey = config.get('vnp_HashSecret')

    const signData = Object.keys(sortedParams)
        .map(key => `${key}=${sortedParams[key]}`)
        .join('&')

    const crypto = require('crypto')
    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

    const paymentStatus = '0' // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN.
    // Rest of the code...

    ctx.status = 200
    ctx.body = { RspCode: '00', Message: 'Success' }
})

router.post('/querydr', async ctx => {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const date = new Date()

    const config = require('config')
    const crypto = require('crypto')

    const vnp_TmnCode = config.get('vnp_TmnCode')
    const secretKey = config.get('vnp_HashSecret')
    const vnp_Api = config.get('vnp_Api')

    const vnp_TxnRef = ctx.request.body.orderId
    const vnp_TransactionDate = ctx.request.body.transDate

    const vnp_RequestId = moment(date).format('HHmmss')
    const vnp_Version = '2.1.0'
    const vnp_Command = 'querydr'
    const vnp_OrderInfo = `Truy van GD ma:${vnp_TxnRef}`

    const vnp_IpAddr = ctx.request.headers['x-forwarded-for'] || ctx.request.ip
    const currCode = 'VND'
    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss')

    const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`
    const hmac = crypto.createHmac('sha512', secretKey)
    const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest('hex')

    const dataObj = {
        vnp_RequestId,
        vnp_Version,
        vnp_Command,
        vnp_TmnCode,
        vnp_TxnRef,
        vnp_OrderInfo,
        vnp_TransactionDate,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_SecureHash
    }

    // Call API with request-promise
    await request.post({
        url: vnp_Api,
        json: true,
        body: dataObj
    })

    // Rest of the code...
})

router.post('/refund', async ctx => {
    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const date = new Date()

    const config = require('config')
    const crypto = require('crypto')

    const vnp_TmnCode = config.get('vnp_TmnCode')
    const secretKey = config.get('vnp_HashSecret')
    const vnp_Api = config.get('vnp_Api')

    const vnp_TxnRef = ctx.request.body.orderId
    const vnp_TransactionDate = ctx.request.body.transDate
    const vnp_Amount = ctx.request.body.amount * 100
    const vnp_TransactionType = ctx.request.body.transType
    const vnp_CreateBy = ctx.request.body.user

    const currCode = 'VND'
    const vnp_RequestId = moment(date).format('HHmmss')
    const vnp_Version = '2.1.0'
    const vnp_Command = 'refund'
    const vnp_OrderInfo = `Hoan tien GD ma:${vnp_TxnRef}`
    const vnp_IpAddr = ctx.request.headers['x-forwarded-for'] || ctx.request.ip

    const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss')
    const vnp_TransactionNo = '0'

    const data = `${vnp_RequestId}|${vnp_Version}|${vnp_Command}|${vnp_TmnCode}|${vnp_TransactionType}|${vnp_TxnRef}|${vnp_Amount}|${vnp_TransactionNo}|${vnp_TransactionDate}|${vnp_CreateBy}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`
    const hmac = crypto.createHmac('sha512', secretKey)
    const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest('hex')

    const dataObj = {
        vnp_RequestId,
        vnp_Version,
        vnp_Command,
        vnp_TmnCode,
        vnp_TransactionType,
        vnp_TxnRef,
        vnp_Amount,
        vnp_TransactionNo,
        vnp_CreateBy,
        vnp_OrderInfo,
        vnp_TransactionDate,
        vnp_CreateDate,
        vnp_IpAddr,
        vnp_SecureHash
    }

    // Call API with request-promise
    await request.post({
        url: vnp_Api,
        json: true,
        body: dataObj
    })

    // Rest of the code...
})

router.get(
    '/payment/admin',
    // genericSecure,
    // validate(schema.get),
    async ctx => {
        debug('GET /payment admin')

        try {
            const transactions = await paymentModel.getPaymentHistoryAdmin()

            ctx.body = {
                success: true,
                data: transactions
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
