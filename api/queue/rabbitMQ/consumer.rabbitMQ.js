const amqp = require('amqplib')

async function receiveMessage() {
    // Tạo kết nối tới RabbitMQ
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    // Khai báo một queue có tên 'hello'
    const queueName = 'hello'
    await channel.assertQueue(queueName, { durable: false })

    console.log(`[*] Waiting for messages. To exit, press CTRL+C`)

    // Nhận tin nhắn từ queue 'hello'
    channel.consume(
        queueName,
        msg => {
            const message = msg.content.toString()
            console.log(`[x] Received: ${message}`)
        },
        { noAck: true }
    )
}

receiveMessage()
