exports.createRoomsName = ids => {
    return ids.map(id => `auction:${id}`)
}
exports.joinRoom = (auctionId, user, socket) => {
    socket.join(exports.createRoomsName(auctionId))
}
