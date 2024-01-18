const debug = require('debug')('auction:socket')
const config = require('../../config')
const { QUEUE_ACTION } = require('../../config/constant/queueActionConstant')
const auctionModel = require('../../models/auction')
const messageModel = require('../../models/message')
const { insertMessage } = require('../../models/message')
const { sendToQueue } = require('../../queue/kafka/producer.kafka')
const { handleRaise } = require('./auctionRaise')
const {
    addToRoom,
    checkHasExistRoom,
    createRoomName,
    leaveRoom
} = require('./auctionRoom')
const { initAuctionTime } = require('./helper')

async function startChecking(socketIO) {
    await auctionModel.checkingAllAuction()
    await initAuctionTime(socketIO, listOnlineUser)
}

async function authenticate(user, socket, listOnlineUser) {
    if (user.id !== null) {
        addToRoom(
            user.id,
            socket.id,
            user.role_id === 'admin',
            listOnlineUser
        ).then(async id => {
            debug('authenticate', user.id, socket.id)
            socket.join([
                ...listOnlineUser[id].auctionRooms,
                ...listOnlineUser[id].chatRoom
            ])
        })
    }
}

async function raise(data, socket, listOnlineUser, socketIO) {
    await handleRaise(data)
    checkHasExistRoom(data.user.id, data.auction.id, socket, listOnlineUser)
    await socketIO.to(createRoomName(data.auction.id)).emit('raise-reply', data)
    await socketIO.to(createRoomName(data.auction.id)).emit('updateUI', {})
    const seller = listOnlineUser.find(
        i => i.user_id === data.auction.seller_id
    )
    if (config.isUseElasticSearch) {
        sendToQueue(
            {
                auction_id: data.auction.id,
                auction_count: data.auction.auction_count + 1,
                sell_price: Math.parseInt(data.bet.bet_price)
            },
            QUEUE_ACTION.UPDATE_AUCTION
        )
    }
    if (seller) {
        socketIO.to(seller.socket).emit('notif-to-seller', {
            auction_id: data.auction.product.id
        })
    }
    socketIO.to(seller.socket).emit('updateUI')
}

async function clientSendMsg(data, listOnlineUser, socket) {
    let chatId = await insertMessage(data)
    if (!data.chat_id) {
        const index = listOnlineUser.findIndex(i => i.user_id === data.user_id)
        if (index !== -1) {
            listOnlineUser[index].chatRoom.push(`chat:${chatId}`)
            socket.join([`chat:${chatId}`])
            const lstAdmin = listOnlineUser.filter(i => i.is_admin)
            for (let i = 0; i < lstAdmin.length; i += 1) {
                const ad = lstAdmin[i]
                socket.to(ad.chatRoom).emit('new-user-join-chat', chatId)
            }
        }
        socket.to(`chat:${chatId}`).emit('updateFirstMessUI')
    } else {
        chatId = data.chat_id
    }
    socket
        .to(`chat:${chatId}`)
        .emit('receive-client-msg', { ...data, chat_id: chatId })
}
async function adminSendMsg(data, socket) {
    const chatID = await insertMessage(data)

    socket.to(`chat:${data.chat_id || chatID}`).emit('receive-admin-msg', {
        ...data,
        chat_id: data.chat_id || chatID
    })
}

async function updateAdminReadMsg(data, socket) {
    await messageModel.updateIsRead(data.user_id)

    socket.to(`chat:${data.chat_id}`).emit('updateUI')
}

async function auctioneerConfirm(data, listOnlineUser, socket) {
    const { userId, auctionId, status } = data
    auctionModel.auctioneerConfirm(userId, auctionId, status).then(id => {
        const seller = listOnlineUser.find(i => i.user_id === id)
        if (seller) {
            socket
                .to(seller.socket)
                .emit('auctioneer_confirm_server', { status, auctionId })
        }
    })
}
async function sellerConfirm(data, listOnlineUser, socket) {
    const { userId, auctionId, status } = data
    auctionModel.sellerConfirm(userId, auctionId, status).then(id => {
        const auctioneer = listOnlineUser.find(i => i.user_id === id)
        if (auctioneer) {
            socket
                .to(auctioneer.socket)
                .emit('seller_confirm_server', { status, auctionId })
        }
    })
}
async function disconnect(listOnlineUser, socket) {
    const index = listOnlineUser.findIndex(item =>
        item.socket.includes(socket.id)
    )
    if (index !== -1) {
        socket.leave(listOnlineUser[index].auctionRooms)
        leaveRoom(socket.id, index, listOnlineUser)
    }
}

module.exports = {
    startChecking,
    authenticate,
    raise,
    clientSendMsg,
    adminSendMsg,
    updateAdminReadMsg,
    auctioneerConfirm,
    sellerConfirm,
    disconnect
}
