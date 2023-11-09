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
@Table(name = "chat_history")
public class ChatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "chat_id", nullable = false)
    private int chatId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;


    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}