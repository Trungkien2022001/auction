const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

const topic = 'test-topic';

producer.on('ready', () => {
  console.log('Producer is ready');

  // Gửi tin nhắn đến topic
  const payloads = [
    {
      topic: topic,
      messages: 'Hello, Kafka!'
    }
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message:', err);
    } else {
      console.log('Message sent:', data);
    }

    // Đóng producer sau khi gửi tin nhắn
    producer.close();
  });
});

producer.on('error', (err) => {
  console.error('Error connecting to Kafka:', err);
});
