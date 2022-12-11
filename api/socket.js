/* eslint-disable guard-for-in */
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
const notificationModel = require('./models/notification')

let auction = []
const listOnlineUser = []

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.app.emit('error', err, ctx)
    }
})

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
                finishAuction(item)
                console.log(
                    `Finished auction id: ${item.auctionId}. Waiting for seller response`
                )
                clearTimeout(timeout)
            }, item.auctionTime)
        }
    }

    console.log(
        `Auction Pending: ${auction.filter(i => i.auctionStatus === 1).length}`
    )
    console.log(
        `Auction Processing: ${
            auction.filter(i => i.auctionStatus === 2).length
        }`
    )
    console.log(
        `Auction Waiting for seller response: ${
            auction.filter(i => i.auctionStatus === 3).length
        }`
    )
    console.log(
        `Auction Waiting for auctioneer response: ${
            auction.filter(i => i.auctionStatus === 4).length
        }`
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
        // console.log(`⚡⚡⚡: User ${user.username} with socketID ${socket.id} just connected!`)
        if (user.id) {
            addToRoom(user.id, socket.id).then(id => {
                socket.join(listOnlineUser[id].auctionRooms)
            })
        }
    })
    socket.on('ping', () => {
        console.log('PING PONG PING PONG')
    })

    socket.on('raise', data => {
        // console.log(socketIO.sockets.adapter.rooms)
        checkHasExistRoom(data.user.id, data.auctionId, socket)
        socketIO.to(createRoomName(data.auctionId)).emit('raise-reply', data)
        socketIO.to(createRoomName(data.auctionId)).emit('updateUI', {})
        handleRaise(data)
        console.log(listOnlineUser)
    })

    socket.on('add-to-new-room', (auctionId, userId) => {
        addToNewRoom(userId, socket.id, auctionId)
    })

    socket.on('disconnect', () => {
        const index = listOnlineUser.findIndex(item =>
            item.socket.includes(socket.id)
        )
        if (index !== -1) {
            socket.leave(listOnlineUser[index].auctionRooms)
            leaveRoom(socket.id, index)
        }
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

async function handleRaise(data) {
    const { user, auctionId } = data
    // const maxRaise = await auctionModel.getHighestBet(auctionId)
    // if(bet <= maxRaise) {
    //     return {
    //         success: false,
    //         highestBet: maxRaise
    //     }
    // } else {
    await auctionModel.insertUserAuction(user.id, auctionId)
    const userIds = await auctionModel.getAllAuctioneerOfAuction(auctionId)
    const index = userIds.findIndex(i => i === user.id)
    userIds.splice(index, 1)
    await notificationModel.createNotification(4, user.id, auctionId, userIds)
    // }
}
// handleRaise({auctionId: 1})

async function addToRoom(userId, socketId) {
    const index = listOnlineUser.findIndex(item => item.user_id === userId)
    if (index !== -1) {
        listOnlineUser[index].socket.push(socketId)

        return index
    }
    const auctionIds = await auctionModel.getAllAuctionOfUser(userId)
    const auctionRooms = createRoomsName(auctionIds)
    listOnlineUser.push({
        user_id: userId,
        socket: [socketId],
        auctionRooms
    })

    return index === -1 ? 0 : index
}

function checkHasExistRoom(userId, auctionId, socket) {
    if (userId === null) return
    const index = listOnlineUser.findIndex(item => item.user_id == userId)
    if (index !== -1) {
        const newRoomName = createRoomName(auctionId)
        const roomIndex = listOnlineUser[index].auctionRooms.findIndex(
            i => i === newRoomName
        )
        if (roomIndex === -1) {
            listOnlineUser[index].auctionRooms.push(newRoomName)
            socket.join(listOnlineUser[index].auctionRooms)
        }
    }
}

async function addToNewRoom(userId, auctionId) {
    if (userId === null) return
    const index = listOnlineUser.findIndex(item => item.user_id == userId)
    const newRoomName = createRoomName(auctionId)
    if (index !== -1) {
        listOnlineUser[index].auctionRooms.push(newRoomName)
    }
}

function leaveRoom(socketId, index) {
    if (listOnlineUser[index].socket.length != 1) {
        const socketIndex = listOnlineUser[index].socket.findIndex(
            i => i == socketId
        )
        listOnlineUser[index].socket.splice(socketIndex, 1)
    } else {
        listOnlineUser.splice(index, 1)
    }
}

async function removeAuctionRoom(auctionId) {
    await auctionModel.updateUserAuction(auctionId)

    const auctionRoomName = createRoomsName(auctionId)
    for (const i in listOnlineUser) {
        const item = listOnlineUser[i]
        const index = item.auctionRooms.findIndex(
            name => name === auctionRoomName
        )
        if (index !== -1) {
            listOnlineUser[i].auctionRooms.splice(index, 1)
        }
    }
}

async function startAuction(id) {
    socketIO.emit('updateUI')
    await auctionModel.updateAuction({ status: 2 }, id)
}

function createRoomsName(auctions) {
    if (auctions.length === 0) return []

    return auctions.map(i => {
        return `auction:${i.auction_id}`
    })
}

function createRoomName(id) {
    return `auction:${id}`
}

async function finishAuction(item) {
    await auctionModel.updateAuction({ status: 3 }, item.auctionId)
    const timeout = setTimeout(() => {
        removeAuctionRoom(item.auctionId)
        // waitingForSeller(item.auctionId)
        console.log(
            `Finished auction id: ${item.auctionId}. Waiting for seller response`
        )
        clearTimeout(timeout)
    }, item.auctionTime)
}

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
