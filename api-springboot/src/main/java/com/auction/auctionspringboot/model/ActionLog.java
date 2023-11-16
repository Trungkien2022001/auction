package com.auction.auctionspringboot.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "action_logs")
public class ActionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path", length = 50, nullable = false)
    private String path;

    @Column(name = "matched_route", length = 500, nullable = false)
    private String matchedRoute;

    @Column(name = "client_ip", length = 50, nullable = true)
    private String clientIp;

    @Column(name = "server_port", length = 6, columnDefinition = "varchar(10) default 8080")
    private String serverPort;

    @Column(name = "user", length = 200, nullable = false)
    private String user;

    @Column(name = "method", length = 10, nullable = false)
    private String method;

    @Column(name = "status", nullable = false, columnDefinition = "int default 200")
    private Integer status;

    @Lob
    @Column(name = "request", columnDefinition = "LONGTEXT")
    private String request;

    @Lob
    @Column(name = "response", columnDefinition = "LONGTEXT")
    private String response;

    @Lob
    @Column(name = "error", nullable = true, columnDefinition = "LONGTEXT")
    private String error;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;

}
