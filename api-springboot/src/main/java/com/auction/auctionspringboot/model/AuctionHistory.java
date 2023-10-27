package com.auction.auctionspringboot.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "auction_history")
public class AuctionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "auction_id", nullable = false)
    private int auctionId;

    @Column(name = "auctioneer_id", nullable = false)
    private int auctioneerId;

    @Column(name = "bet_time", nullable = false)
    private Date betTime;

    @Column(name = "bet_amount", nullable = false)
    private Integer betAmount;

    @Column(name = "is_success", nullable = false)
    private Boolean isSuccess;

    @Column(name = "is_blocked", nullable = false)
    private Integer isBlocked;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    // Constructors, getters, and setters
}
