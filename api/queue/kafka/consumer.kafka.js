const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'test-topic', partition: 0 }], { autoCommit: false });

consumer.on('message', (message) => {
  console.log('Received message:', message.value);

  // Xác nhận rằng tin nhắn đã được xử lý (nếu không sẽ được xử lý lại khi consumer khởi động lại)
  consumer.commit(true);
});

consumer.on('error', (err) => {
  console.error('Error connecting to Kafka:', err);
});

consumer.on('offsetOutOfRange', (err) => {
  console.error('Offset out of range:', err);
});
