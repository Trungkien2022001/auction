package com.auction.auctionspringboot.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "auction")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    // @Column(name = "auction_time", nullable = false)
    // private int auctionTime;

    @Column(name = "product_id", nullable = false)
    private int productId;

    @Column(name = "start_price", nullable = false)
    private int startPrice;

    @Column(name = "sell_price")
    private Integer sellPrice;

    @Column(name = "seller_id", nullable = false)
    private int sellerId;

    @Column(name = "auction_count", nullable = false)
    private int auctionCount;

    @Column(name = "auctioneer_win")
    private Integer auctioneerWin;

    @Column(name = "status", nullable = false)
    @JsonIgnore
    private int status;

    @Column(name = "is_returned", nullable = false)
    private int isReturned;

    @Column(name = "is_finished_soon", nullable = false)
    private int isFinishedSoon;

    @Column(name = "seller_confirm_time")
    private Timestamp sellerConfirmTime;

    @Column(name = "auctioneer_confirm_time")
    private Timestamp auctioneerConfirmTime;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private Timestamp deletedAt;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;

    @OneToOne
    @JoinColumn(name = "status", insertable = false, updatable = false)
    private AuctionStatus auctionStatus;

    @OneToOne
    @JoinColumn(name = "seller_id", insertable = false, updatable = false)
    private User seller;

    @OneToOne
    @JoinColumn(name = "auction_time", insertable = false, updatable = false)
    private AuctionTime auctionTime;

}
