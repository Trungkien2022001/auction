package com.auction.auctionspringboot.kafka.consumer;

import org.springframework.stereotype.Component;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.kafka.support.KafkaHeaders;
// import org.springframework.messaging.handler.annotation.Header;
// import org.springframework.messaging.handler.annotation.Payload;

// import com.auction.auctionspringboot.model.User;
// import com.auction.auctionspringboot.service.UserService;

@Component
public class UserKafkaConsumer {

    // private static final Logger logger = LoggerFactory.getLogger(UserKafkaConsumer.class);

    // private final UserService userService;

    // public UserKafkaConsumer(UserService userService) {
    //     this.userService = userService;
    // }

    // @KafkaListener(topics = "${spring.kafka.topic.name}",
    //         concurrency = "${spring.kafka.consumer.level.concurrency:3}")
    // public void logKafkaMessages(@Payload User user,
    //                              @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
    //                              @Header(KafkaHeaders.RECEIVED_PARTITION) Integer partition,
    //                              @Header(KafkaHeaders.OFFSET) Long offset) {
    //     logger.info("Received a message contains a user information with id {}, from {} topic, " +
    //             "{} partition, and {} offset", user, topic, partition, offset);
    //     // userService.save(user);
    // }
}
