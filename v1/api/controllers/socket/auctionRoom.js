const auctionModel = require('../../models/auction')
const messageModel = require('../../models/message')

const createRoomsName = ids => {
    return ids.map(id => `auction:${id.auction_id}`)
}

function createRoomName(id) {
    return `auction:${id}`
}

const joinRoom = (auctionId, user, socket) => {
    socket.join(createRoomName(auctionId))
}

async function addToRoom(userId, socketId, isAdmin, listOnlineUser) {
    const index = listOnlineUser.findIndex(item => item.user_id === userId)
    if (index !== -1) {
        listOnlineUser[index].socket.push(socketId)

        return index
    }
    const auctionIds = await auctionModel.getAllAuctionOfUser(userId)
    const sellerAuctionIds = await auctionModel.getAllAuctionOfSeller(userId)
    let chatRoom
    let chatIds
    if (isAdmin) {
        chatIds = await await messageModel.getChatIdOfAdmin(userId)
        chatRoom = chatIds.map(id => `chat:${id}`)
    } else {
        chatIds = await await messageModel.getChatIdOfUser(userId)
        if (chatIds) {
            chatRoom = [`chat:${chatIds}`]
        }
    }
    const auctionRooms = createRoomsName([...auctionIds, ...sellerAuctionIds])
    listOnlineUser.push({
        user_id: userId,
        is_admin: isAdmin,
        socket: [socketId],
        auctionRooms,
        chatRoom: chatRoom || []
    })

    return index === -1 ? listOnlineUser.length - 1 : index
}

async function addToNewRoom(userId, auctionId, listOnlineUser) {
    if (userId === null) return
    const index = listOnlineUser.findIndex(item => item.user_id === userId)
    const newRoomName = createRoomName(auctionId)
    if (index !== -1) {
        listOnlineUser[index].auctionRooms.push(newRoomName)
    }
}

function checkHasExistRoom(userId, auctionId, socket, listOnlineUser) {
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

function leaveRoom(socketId, index, listOnlineUser) {
    if (listOnlineUser[index].socket.length !== 1) {
        const socketIndex = listOnlineUser[index].socket.findIndex(
            i => i === socketId
        )
        listOnlineUser[index].socket.splice(socketIndex, 1)
    } else {
        listOnlineUser.splice(index, 1)
    }

    return listOnlineUser
}

async function removeAuctionRoom(auctionId, listOnlineUser) {
    await auctionModel.updateUserAuction(auctionId)

    const auctionRoomName = createRoomName(auctionId)
    for (let i = 0; i < listOnlineUser.length; i += 1) {
        const item = listOnlineUser[i]
        const index = item.auctionRooms.findIndex(
            name => name === auctionRoomName
        )
        if (index !== -1) {
            listOnlineUser[i].auctionRooms.splice(index, 1)
        }
    }
}

module.exports = {
    addToRoom,
    joinRoom,
    createRoomsName,
    checkHasExistRoom,
    addToNewRoom,
    createRoomName,
    leaveRoom,
    removeAuctionRoom
}
