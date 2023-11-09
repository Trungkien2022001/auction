package com.auction.auctionspringboot.converter.dto.auction;

import java.time.LocalDateTime;
import java.util.List;

import com.auction.auctionspringboot.model.Image;
import com.auction.auctionspringboot.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionResponseDto {
    private int id;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private int auction_time;
    private int start_price;
    private int sell_price;
    private int seller_id;
    private int auction_count;
    private Integer auctioneer_win;
    private int status_id;
    private String status;
    private int is_returned;
    private int is_finished_soon;
    private String name;
    private String description;
    private String branch;
    private int category_id;
    private String category;
    private String title;
    private String key_word;
    private String product_status;
    private User seller;
    private List<Image> images;
    private LocalDateTime seller_confirm_time;
    private LocalDateTime auctioneer_confirm_time;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private LocalDateTime deletedAt;
}
