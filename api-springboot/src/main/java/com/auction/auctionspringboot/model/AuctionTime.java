package com.auction.auctionspringboot.model;

import java.sql.Time;

import jakarta.persistence.Column;
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
@Table(name = "auction_time")
public class AuctionTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "time", nullable = false)
    private int time;

    @Column(name = "time_full", nullable = false)
    private Time timeFull;

    // Constructors, getters, and setters
}
