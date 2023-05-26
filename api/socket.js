/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
require('dotenv').config({ path: '.localenv' })
const debug = require('debug')('auction:socket')
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
const { insertMessage } = require('./models/message')

let auctions = []
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

checkingAllUpdate().then(() => {
    initAuctionTime()
})

cron.schedule('* * * * *', () => {
    console.log('')
    console.log(`----------Refreshing after 1 minute ----------------`)
    initAuctionTime()
})

cron.schedule('*/5 * * * *', () => {
    console.log('')
    console.log(
        `----------Checking all auction after 5 minute ----------------`
    )
    auctionModel.checkingAllAuction()
})

socketIO.on('connection', socket => {
    socket.on('authenticate', user => {
        // console.log(`⚡⚡⚡: User ${user.username} with socketID ${socket.id} just connected!`)
        if (user.id !== null) {
            addToRoom(user.id, socket.id).then(async id => {
                debug(
                    'authenticate',
                    user.id,
                    socket.id
                    // listOnlineUser[id].auctionRooms
                )
                socket.join(listOnlineUser[id].auctionRooms)
                // console.log(listOnlineUser)
            })
        }
        // console.log(socketIO.sockets.adapter.rooms)
    })
    socket.on('ping', () => {
        console.log('PING PONG PING PONG')
    })

    socket.on('raise', async data => {
        // console.log(data)
        await handleRaise(data)
        checkHasExistRoom(data.user.id, data.auction.product.id, socket)
        await socketIO
            .to(createRoomName(data.auction.product.id))
            .emit('raise-reply', data)
        await socketIO
            .to(createRoomName(data.auction.product.id))
            .emit('updateUI', {})
        const seller = listOnlineUser.find(
            i => i.user_id === data.auction.seller_info.id
        )
        if (seller) {
            socketIO.to(seller.socket).emit('notif-to-seller', {
                auction_id: data.auction.product.id
            })
        }
    })

    socket.on('add-to-new-room', (auctionId, userId) => {
        addToNewRoom(userId, socket.id, auctionId)
    })
    socket.on('client-send-msg', data => {
        insertMessage(data)
        // console.log(data)
        //    console.log(data)
    })
    socket.on('admin-send-msg', data => {
        insertMessage(data)
        //    console.log(data)
    })

    socket.on('auctioneer_confirm', ({ userId, auctionId, status }) => {
        // console.log({ userId, auctionId, status })
        auctionModel.auctioneerConfirm(userId, auctionId, status).then(id => {
            const seller = listOnlineUser.find(i => i.user_id === id)
            if (seller) {
                socket
                    .to(seller.socket)
                    .emit('auctioneer_confirm_server', { status, auctionId })
            }
        })
    })
    socket.on('seller_confirm', ({ userId, auctionId, status }) => {
        // console.log(userId, auctionId, status)
        auctionModel.sellerConfirm(userId, auctionId, status).then(id => {
            const auctioneer = listOnlineUser.find(i => i.user_id === id)
            if (auctioneer) {
                socket
                    .to(auctioneer.socket)
                    .emit('seller_confirm_server', { status, auctionId })
            }
        })
    })

    socket.on('disconnect', () => {
        const index = listOnlineUser.findIndex(item =>
            item.socket.includes(socket.id)
        )
        if (index !== -1) {
            // console.log(`⚡⚡⚡:socketID ${socket.id} just connected!`)
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

async function checkingAllUpdate() {
    await auctionModel.checkingAllAuction()
}

async function initAuctionTime() {
    const times = await auctionModel.getAllAuctionTime()
    auctions = times.map(item => {
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

    for (const item of auctions) {
        if (item.timeToStart > 0) {
            const timeout = setTimeout(() => {
                console.log(
                    `-----------Starting for auction id: ${item.auctionId}`
                )
                startAuction(item.auctionId).then(sellerId => {
                    const seller = listOnlineUser.find(
                        i => i.user_id === sellerId
                    )
                    if (seller) {
                        socketIO
                            .to(seller.socket)
                            .emit('startingAuctionSeller', {
                                auction_id: item.id
                            })
                    }
                    clearTimeout(timeout)
                })
            }, item.timeToStart)
        } else if (item.timeAuction > 0 && item.timeAuction < 120000) {
            const timeout = setTimeout(() => {
                finishAuction(item).then(result => {
                    const auctioneer = listOnlineUser.find(
                        i => i.user_id === result.auctioneer
                    )
                    const seller = listOnlineUser.find(
                        i => i.user_id === result.seller
                    )
                    if (auctioneer) {
                        socketIO
                            .to(auctioneer.socket)
                            .emit('finishedAuctionAuctioneer', {
                                auction_id: item.id
                            })
                    }
                    if (seller) {
                        socketIO
                            .to(seller.socket)
                            .emit('finishedAuctionSeller', {
                                auction_id: item.id
                            })
                    }
                    console.log(
                        `---------Finished auction id: ${item.auctionId}. Waiting for seller response`
                    )
                    clearTimeout(timeout)
                })
            }, item.timeAuction)
        }
    }

    console.log(
        `Auction Pending: ${auctions.filter(i => i.auctionStatus === 1).length}`
    )
    console.log(
        `Auction Processing: ${
            auctions.filter(i => i.auctionStatus === 2).length
        }`
    )
    console.log(
        `Auction Waiting for seller response: ${
            auctions.filter(i => i.auctionStatus === 3).length
        }`
    )
    console.log(
        `Auction Waiting for auctioneer response: ${
            auctions.filter(i => i.auctionStatus === 4).length
        }`
    )
}

async function handleRaise(data) {
    const { user, auction } = data
    // const maxRaise = await auctionModel.getHighestBet(auction.id)
    // if(bet <= maxRaise) {
    //     return {
    //         success: false,
    //         highestBet: maxRaise
    //     }
    // } else {
    await auctionModel.insertUserAuction(user.id, auction.product.id)
    const userIds = await auctionModel.getAllAuctioneerOfAuction(
        auction.product.id
    )
    const index = userIds.findIndex(i => i === user.id)
    userIds.splice(index, 1)
    await notificationModel.createNotification(
        4,
        user.id,
        auction.product.id,
        userIds
    )
    // }
}

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

    return index === -1 ? listOnlineUser.length - 1 : index
}

function checkHasExistRoom(userId, auctionId, socket) {
    if (userId === null) return
    const index = listOnlineUser.findIndex(item => item.user_id === userId)
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
    const index = listOnlineUser.findIndex(item => item.user_id === userId)
    const newRoomName = createRoomName(auctionId)
    if (index !== -1) {
        listOnlineUser[index].auctionRooms.push(newRoomName)
    }
}

function leaveRoom(socketId, index) {
    if (listOnlineUser[index].socket.length !== 1) {
        const socketIndex = listOnlineUser[index].socket.findIndex(
            i => i === socketId
        )
        listOnlineUser[index].socket.splice(socketIndex, 1)
    } else {
        listOnlineUser.splice(index, 1)
    }
}

// async function removeAuctionRoom(auctionId) {
//     await auctionModel.updateUserAuction(auctionId)

//     const auctionRoomName = createRoomsName(auctionId)
//     for (const i in listOnlineUser) {
//         const item = listOnlineUser[i]
//         const index = item.auctionRooms.findIndex(
//             name => name === auctionRoomName
//         )
//         if (index !== -1) {
//             listOnlineUser[i].auctionRooms.splice(index, 1)
//         }
//     }
// }

async function startAuction(id) {
    socketIO.emit('updateUI')
    const userId = await auctionModel.updateAuction({ status: 2 }, id)

    return userId
}

function createRoomsName(auctionArr) {
    if (auctionArr.length === 0) return []

    return auctionArr.map(i => {
        return `auction:${i.auction_id}`
    })
}

function createRoomName(id) {
    return `auction:${id}`
}

async function finishAuction(item) {
    socketIO.emit('updateUI')
    const result = await auctionModel.finishedAuction(item.auctionId)

    return result
}
