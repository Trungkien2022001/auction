package com.auction.auctionspringboot.converter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginationDto {

    // private boolean paged;

    private int page_number;

    private int page_size;

    private long total_elements;

    private int total_pages;

    // private boolean first;

    // private boolean sorted;

    // private boolean empty;

}