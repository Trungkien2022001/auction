require('dotenv').config({ path: '.env' })
const kafka = require('kafka-node')
const { logger } = require('../../utils/winston')
const config = require('../../config')
const { handleJob } = require('../handleJob')

kafka.emitter().setMaxListeners(10)

const { Consumer } = kafka
const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost })
client.setMaxListeners(20)
const consumer = new Consumer(
    client,
    [{ topic: config.topicName, partition: 0 }],
    { autoCommit: true }
)

consumer.on('message', async message => {
    await handleJob(message)

    consumer.commit(() => {})
})

consumer.on('error', err => {
    logger.error('Error connecting to Kafka:', err)
})

consumer.on('offsetOutOfRange', err => {
    logger.error('Offset out of range:', err)
})
