package com.auction.auctionspringboot.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user1", nullable = false)
    private int user1;

    @Column(name = "user2", nullable = false)
    private int user2;

    @Column(name = "last_msg", nullable = false, columnDefinition = "TEXT")
    private String lastMsg;

    @Column(name = "last_message_by", nullable = false, columnDefinition = "TEXT")
    private String lastMessageBy;

    @Column(name = "is_read", nullable = false, columnDefinition = "tinyint default 0")
    private int isRead;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;


    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

}
