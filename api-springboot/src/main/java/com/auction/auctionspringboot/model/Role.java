package com.auction.auctionspringboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
public class Role {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "description")
    private String description;

    @Column(name = "admin", columnDefinition = "tinyint default 0")
    private int admin;

    @Column(name = "user", columnDefinition = "tinyint default 1")
    private int user;

    @Column(name = "auction", columnDefinition = "tinyint default 0")
    private int auction;

    @Column(name = "homepage", columnDefinition = "tinyint default 0")
    private int homepage;

    @Column(name = "dashboard_auction", columnDefinition = "tinyint default 0")
    private int dashboard_auction;

    @Column(name = "dashboard_user", columnDefinition = "tinyint default 0")
    private int dashboard_user;

    @Column(name = "dashboard_chat", columnDefinition = "tinyint default 0")
    private int dashboard_chat;

    @Column(name = "dashboard_action_log", columnDefinition = "tinyint default 0")
    private int dashboard_action_log;

    @Column(name = "dashboard_config", columnDefinition = "tinyint default 0")
    private int dashboard_config;

    @Column(name = "dashboard_money", columnDefinition = "tinyint default 0")
    private int dashboard_money;

}
