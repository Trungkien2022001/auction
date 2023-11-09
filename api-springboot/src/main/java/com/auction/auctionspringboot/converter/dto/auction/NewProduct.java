package com.auction.auctionspringboot.converter.dto.auction;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewProduct {
    private String name;
    private String branch;
    private String status;
    private String title;
    private String description;
    private String key_word;
    private int category_id;
    private String start_price;
    private List<String> images;

}