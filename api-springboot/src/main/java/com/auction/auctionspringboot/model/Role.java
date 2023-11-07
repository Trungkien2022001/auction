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

    @Column(name = "admin")
    private boolean admin;

    @Column(name = "user")
    private boolean user;

    @Column(name = "auction")
    private boolean auction;

    @Column(name = "homepage")
    private boolean homepage;

    @Column(name = "dashboard_auction")
    private boolean dashboard_auction;

    @Column(name = "dashboard_user")
    private boolean dashboard_user;

    @Column(name = "dashboard_chat")
    private boolean dashboard_chat;

    @Column(name = "dashboard_action_log")
    private boolean dashboard_action_log;

    @Column(name = "dashboard_config")
    private boolean dashboard_config;

    @Column(name = "dashboard_money")
    private boolean dashboard_money;

}
