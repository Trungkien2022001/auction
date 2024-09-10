package com.auction.auctionspringboot.kafka.producer;

// import org.apache.kafka.clients.admin.NewTopic;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.annotation.Order;
// import org.springframework.kafka.core.KafkaTemplate;
// import org.springframework.stereotype.Component;

// import com.auction.auctionspringboot.model.User;

// @Component
// @Configuration
public class UserKafkaProducer {

    // private final KafkaTemplate<String, User> kafkaTemplate;

    // @Value("${spring.kafka.topic.name}")
    // private String topic;

    // @Value("${spring.kafka.replication.factor:1}")
    // private int replicationFactor;

    // @Value("${spring.kafka.partition.number:1}")
    // private int partitionNumber;

    // public UserKafkaProducer(KafkaTemplate<String, User> kafkaTemplate) {
    //     this.kafkaTemplate = kafkaTemplate;
    // }

    // public void writeToKafka(User user) {
    //     kafkaTemplate.send(topic, "t", user);
    // }

    // @Bean
    // @Order(-1)
    // public NewTopic createNewTopic() {
    //     return new NewTopic(topic, partitionNumber, (short) replicationFactor);
    // }
}
