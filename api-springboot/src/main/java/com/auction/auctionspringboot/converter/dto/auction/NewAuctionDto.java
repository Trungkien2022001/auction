package com.auction.auctionspringboot.converter.dto.auction;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewAuctionDto {

    @NotNull
    public Auction auction;

    @NotNull
    public Product product;
}

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// public
// class Auction {
//     private String start_time;
//     private int auction_time;
//     private int is_returned;
//     private int is_finished_soon;
// }

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// class Product {
//     private String name;
//     private String branch;
//     private String status;
//     private String title;
//     private String description;
//     private String key_word;
//     private int category_id;
//     private String start_price;
//     private List<String> images;

// }
