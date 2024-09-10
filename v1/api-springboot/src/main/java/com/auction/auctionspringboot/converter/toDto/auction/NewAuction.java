package com.auction.auctionspringboot.converter.toDto.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewAuction {
    private String start_time;
    private int auction_time;
    private int is_returned;
    private int is_finished_soon;
}