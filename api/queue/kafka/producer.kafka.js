const kafka = require('kafka-node')
const { logger } = require('../../utils/winston')
const config = require('../../config')

const { Producer } = kafka
const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost })
client.setMaxListeners(20)
const producer = new Producer(client)

producer.on('ready', () => {
    logger.info('Kafka Producer is ready!')
})

producer.on('error', err => {
    logger.error(`Error connecting to Kafka:${err}`)
})

async function sendToQueue(data, action, topicName = config.topicName) {
    logger.info(`Send job........., action: ${action}, data: ${JSON.stringify(data)}`)
    producer.send(
        [
            {
                topic: topicName,
                messages: JSON.stringify({
                    data,
                    action
                })
            }
        ],
        err => {
            if (err) {
                logger.error('Error sending message:', err)
            }

            // producer.close();
        }
    )
}

module.exports = {
    sendToQueue
}
