package com.auction.auctionspringboot.converter.dto.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Auction {
    private String start_time;
    private int auction_time;
    private int is_returned;
    private int is_finished_soon;
}