const kafka = require('kafka-node');
const { logger } = require('../../utils/winston');
const config = require('../../config');

const { Producer } = kafka;
const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost });

const admin = new kafka.Admin(client);

const topicToCheck = 'test'; // Thay thế 'your_topic_name' bằng tên topic bạn muốn kiểm tra và tạo

function checkAndCreateTopic() {
    admin.listTopics((err, topics) => {
        console.log(topics)
        if (err) {
            logger.error('Error checking topics:', err);
            return;
        }

        if (!topics[topicToCheck]) {
            // Topic chưa tồn tại, tạo mới
            admin.createTopics(
                [
                    {
                        topic: topicToCheck,
                        partitions: 1,
                        replicationFactor: 1,
                    },
                ],
                (createErr) => {
                    if (createErr) {
                        logger.error('Error creating topic:', createErr);
                    } else {
                        logger.info(`Topic ${topicToCheck} created successfully.`);
                    }
                }
            );
        } else {
            logger.info(`Topic ${topicToCheck} already exists.`);
        }
    });
}

// Gọi hàm để kiểm tra và tạo topic
checkAndCreateTopic();
