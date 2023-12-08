const amqp = require('amqplib')

async function sendMessage() {
    // Tạo kết nối tới RabbitMQ
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    // Khai báo một queue có tên 'hello'
    const queueName = 'hello'
    await channel.assertQueue(queueName, { durable: false })

    // Gửi tin nhắn đến queue 'hello'
    const message = 'Hello, RabbitMQ!'
    channel.sendToQueue(queueName, Buffer.from(message))

    console.log(`[x] Sent: ${message}`)

    // Đóng kết nối sau khi gửi tin nhắn
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
}

sendMessage()
