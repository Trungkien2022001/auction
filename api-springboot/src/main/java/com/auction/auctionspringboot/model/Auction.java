package com.auction.auctionspringboot.model;
import java.sql.Date;

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
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "auction_time", nullable = false)
    private int auctionTime;

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
    private int status;

    @Column(name = "is_returned", nullable = false)
    private int isReturned;

    @Column(name = "is_finished_soon", nullable = false)
    private int isFinishedSoon;

    @Column(name = "seller_confirm_time")
    private Date sellerConfirmTime;

    @Column(name = "auctioneer_confirm_time")
    private Date auctioneerConfirmTime;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;

}
