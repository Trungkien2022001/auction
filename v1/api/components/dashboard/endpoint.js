// const debug = require('debug')('auction:route:user')
// const _ = require('lodash')
const Router = require('@koa/router')
const Dashboard = require('../../models/dashboard')
const { genericSecure, checkPermission } = require('../../middleware/security')
// const { validate } = require('../../middleware/validator')
// const { hashPassword } = require('../../utils/auth')
// const schema = require('./schema')

const router = new Router()

router.get(
    '/dashboard-auction-raise',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            const { type } = ctx.request.query
            ctx.body = {
                success: true,
                data: await Dashboard.getAuctionRaise(type)
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)
router.get(
    '/dashboard-auction',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            const { type } = ctx.request.query
            ctx.body = {
                success: true,
                data: await Dashboard.getAuction(type)
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)
router.get(
    '/dashboard-user',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            const { type } = ctx.request.query
            ctx.body = {
                success: true,
                data: await Dashboard.getUser(type)
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)
router.get(
    '/dashboard-money',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            const { type } = ctx.request.query
            ctx.body = {
                success: true,
                data: await Dashboard.getMoney(type)
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)
router.get(
    '/dashboard-summary',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            ctx.body = {
                success: true,
                data: await Dashboard.summary()
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)

router.get(
    '/dashboard-request-count',
    genericSecure,
    checkPermission('admin'),
    async ctx => {
        try {
            const { limit } = ctx.request.query
            ctx.body = {
                success: true,
                data: await Dashboard.getRequestCount(limit)
            }
        } catch (error) {
            ctx.status = 500
            ctx.body = {
                success: false,
                message: error.message || JSON.stringify(error)
            }
            throw error
        }
    }
)

module.exports = router
