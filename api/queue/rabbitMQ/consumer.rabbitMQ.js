const amqp = require('amqplib')
const config = require('../../config')
const { logger } = require('../../utils/winston')
const { handleJob } = require('../handleJob')

async function receiveMessage() {
    // Tạo kết nối tới RabbitMQ
    const connection = await amqp.connect(config.rabbitMQHost)
    const channel = await connection.createChannel()

    // Khai báo một queue có tên 'hello'
    const queueName = config.topicName
    await channel.assertQueue(queueName, { durable: false })

    logger.info(`[*] Waiting for messages. To exit, press CTRL+C`)

    channel.consume(
        queueName,
        async msg => {
            const message = msg.content.toString()
            await handleJob(message)
        },
        { noAck: true }
    )
}

receiveMessage()
