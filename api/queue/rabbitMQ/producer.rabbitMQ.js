const amqp = require('amqplib')
const config = require('../../config')
const { logger } = require('../../utils/winston')

async function sendMessage(message, action, queueName = config.topicName) {
    try {
        const connection = await amqp.connect(config.rabbitMQHost)
        const channel = await connection.createChannel()

        await channel.assertQueue(queueName, { durable: false })
        channel.sendToQueue(
            queueName,
            Buffer.from(
                JSON.stringify({
                    action,
                    data: message
                })
            )
        )

        logger.info(`[x] Sent! Action: ${action}, Message: ${message}`)
    } catch (error) {
        logger.error('Error sending message:', error)
    }
}

// Sử dụng hàm sendMessage với một message cụ thể
// sendMessage('Hello, RabbitMQ!');
module.exports = {
    sendMessage
}
