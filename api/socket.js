/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
require('dotenv').config({ path: '.localenv' })
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const moment = require('moment')
const cron = require('node-cron')

const app = new Koa()
const server = require('http').createServer(app.callback())

const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const config = require('./config')
const auctionModel = require('./models/auction')

let auction = []

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.app.emit('error', err, ctx)
    }
})
// console.log(moment(new Date()).diff(moment(new Date()).subtract(1, 'minutes')))
app.use(config.corsOrigin ? cors({ origin: config.corsOrigin }) : cors())

app.use(bodyParser())

async function initAuctionTime() {
    const times = await auctionModel.getAllAuctionTime()
    auction = times.map(item => {
        return {
            auctionId: item.id,
            timeToStart:
                moment(item.start_time).diff(moment(new Date())) > 0
                    ? moment(item.start_time).diff(moment(new Date()))
                    : 0,
            timeAuction:
                moment(item.start_time)
                    .add(item.time, 'minutes')
                    .diff(moment(new Date())) > 0
                    ? moment(item.start_time)
                          .add(item.time, 'minutes')
                          .diff(moment(new Date()))
                    : 0,
            auctionStatus: item.status
        }
    })

    for (const item of auction) {
        if (item.timeToStart > 0) {
            const timeout = setTimeout(() => {
                console.log(`Starting for auction id: ${item.auctionId}`)
                startAuction(item.auctionId)
                clearTimeout(timeout)
            }, item.timeToStart)
        } else if (item.auctionTime > 0) {
            const timeout = setTimeout(() => {
                // finishAuction(item.auctionId)
                console.log(
                    `Finished auction id: ${item.auctionId}. Waiting for seller response`
                )
                clearTimeout(timeout)
            }, item.auctionTime)
        }
    }

    console.log(
        `----------------------------------Auction Pending: ${
            auction.filter(i => i.auctionStatus === 1).length
        } ----------------`
    )
    console.log(
        `-------------------------------Auction Processing: ${
            auction.filter(i => i.auctionStatus === 2).length
        } ----------------`
    )
    console.log(
        `--------------Auction Waiting for seller response: ${
            auction.filter(i => i.auctionStatus === 3).length
        } ----------------`
    )
    console.log(
        `----------Auction Waiting for auctioneer response: ${
            auction.filter(i => i.auctionStatus === 4).length
        } ----------------`
    )
}

initAuctionTime()

cron.schedule('* * * * *', () => {
    console.log('')
    console.log(
        `---------------------------Refreshing after 1 minute ----------------`
    )
    initAuctionTime()
})

socketIO.on('connection', socket => {
    socket.on('authenticate', user => {
        console.log(
            `⚡⚡⚡: User ${user.username} with socketID ${socket.id} just connected!`
        )
    })
    socket.on('ping', () => {
        console.log('PING PONG PING PONG')
    })
    socket.on('disconnect', () => {
        //   console.log('🔥🔥🔥: A user disconnected');
    })
})

if (!module.parent) {
    server.listen(config.socket_port, () => {
        // eslint-disable-next-line no-console

        // eslint-disable-next-line no-console
        console.info(
            `⚡⚡⚡⚡⚡⚡ Socket is running on port ${config.socket_port}`
        )
    })
}

async function startAuction(id) {
    socketIO.emit('updateUI')
    await auctionModel.updateAuction({ status: 2 }, id)
}
// async function finishAuction(id) {
//     await auctionModel.updateAuction({ status: 3 }, id)
//     const timeout = setTimeout(() => {
//         waitingForSeller(item.auctionId)
//         console.log(
//             `Finished auction id: ${item.auctionId}. Waiting for seller response`
//         )
//         clearTimeout(timeout)
//     }, item.auctionTime)
// }

// async function waitingForSeller(id) {
//     await auctionModel.updateAuction({ status: 4 }, id)
//     const timeout = setTimeout(() => {
//         waitingForAuctioneer(item.auctionId)
//         console.log(
//             `Finished auction id: ${item.auctionId}. Waiting for seller response`
//         )
//         clearTimeout(timeout)
//     }, item.auctionTime)
// }

// async function waitingForAuctioneer(id) {
//     await auctionModel.updateAuction({ status: 6 }, id)
// }

// async function successAuction(id, timeout) {
//     clearTimeout(timeout)
// }
