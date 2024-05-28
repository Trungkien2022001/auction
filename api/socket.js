/* eslint-disable global-require */
require('dotenv').config({ path: '.env' })
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
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
const { createMockAuction } = require('./mock/mockDataV2')
const { runMockRaise } = require('./mock/mockRaise')
const { logger } = require('./utils/winston')
const { initAuctionTime } = require('./controllers/socket/helper')
const {
    startChecking,
    authenticate,
    raise,
    clientSendMsg,
    adminSendMsg,
    updateAdminReadMsg,
    sellerConfirm,
    auctioneerConfirm,
    disconnect
} = require('./controllers/socket')
const { addToNewRoom } = require('./controllers/socket/auctionRoom')
const { handleJob } = require('./queue/handleJob')
const { createMockUser } = require('./mock/mockUser')

const listOnlineUser = []

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        logger.error('Socket Error', err)
        ctx.app.emit('error', err, ctx)
    }
})

app.use(config.corsOrigin ? cors({ origin: config.corsOrigin }) : cors())
app.use(bodyParser())
socketIO.on('connection', socket => {
    socket.on('authenticate', user => {
        // logger.info(`⚡⚡⚡: User ${user.username} with socketID ${socket.id} just connected!`)
        authenticate(user, socket, listOnlineUser)
    })

    socket.on('ping', () => {
        logger.info('PING PONG PING PONG')
    })

    socket.on('raise', async data => {
        await raise(data, socket, listOnlineUser, socketIO)
    })

    socket.on('add-to-new-room', (auctionId, userId) => {
        addToNewRoom(userId, socket.id, auctionId)
    })

    socket.on('client-send-msg', async data => {
        await clientSendMsg(data, listOnlineUser, socket, socketIO)
    })

    socket.on('admin-send-msg', async data => {
        await adminSendMsg(data, socket)
    })

    socket.on('admin-update-lst-user', params => {
        // FIXME
        const ad = listOnlineUser.find(i => i.user === params.admin_id)
        if (ad) {
            ad.chatRoom.push(`chat:${params.chat_id}`)
        }
    })

    socket.on('udpate-admin-read-msg', async item => {
        await updateAdminReadMsg(item)
    })

    socket.on('auctioneer_confirm', async data => {
        await auctioneerConfirm(data, listOnlineUser, socket)
    })

    socket.on('seller_confirm', async data => {
        await sellerConfirm(data, listOnlineUser, socket)
    })

    socket.on('disconnect', () => {
        disconnect(listOnlineUser, socket)
    })
})

startChecking(socketIO, listOnlineUser)

cron.schedule('* * * * *', async () => {
    try {
        logger.info(`Refreshing after 1 minute`)
        if(config.allowMock){
            await createMockAuction()
            await runMockRaise()
            await createMockUser()
        }
        await initAuctionTime(socketIO, listOnlineUser)
        // if (!config.production) {
        // Mock data
        // }
        
    } catch (err) {
        logger.error("CronJob Error!", err)
    }
})

cron.schedule('*/5 * * * *', async () => {
    try {
        logger.info(`Checking all auction after 5 minute`)
        await auctionModel.checkingAllAuction()
    } catch (err) {
        logger.error("CronJob Error!", err)
    }
})

if (config.isUseKafka && config.isUseKafkaOnSocketServer) {
    logger.info('Using Kafka On Socket Server')
    const kafka = require('kafka-node')


    const { Consumer } = kafka
    const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost })
    client.setMaxListeners(config.maxListeners)
    const consumer = new Consumer(
        client,
        [{ topic: config.topicName, partition: 0 }],
        { autoCommit: true }
    )

    consumer.on('message', async message => {
        await handleJob(message)

        consumer.commit(() => { })
    })

    consumer.on('error', err => {
        logger.error('Error connecting to Kafka:', err)
    })

    consumer.on('offsetOutOfRange', err => {
        logger.error('Offset out of range:', err)
    })
}

if (!module.parent) {
    server.listen(config.socket_port, () => {
        logger.info(
            `⚡⚡⚡⚡⚡⚡ Socket is running on port ${config.socket_port}`
        )
    })
}

process.on('unhandledRejection', err => {
    logger.error({ name: 'unhandledRejection' }, JSON.stringify(err))
})
