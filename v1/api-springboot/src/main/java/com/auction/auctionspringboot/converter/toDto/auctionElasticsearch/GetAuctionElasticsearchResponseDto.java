package com.auction.auctionspringboot.converter.toDto.auctionElasticsearch;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAuctionElasticsearchResponseDto {
    private String id;

    private Integer auctionId;

    private Date startTime;

    private Date endTime;

    private Integer auctionTime;

    private Integer productId;

    private Long startPrice;

    private Long sellPrice;

    private Integer sellerId;

    private Integer auctionCount;

    private Integer status;

    private String auctionStatus;

    private Integer isReturned;

    private Integer isFinishedSoon;

    private Date createdAt;

    private Date updatedAt;

    private String name;

    // private String description;

    private String branch;

    private String image;

    private Integer categoryId;

    private String title;

    private String keyWord;

    private String productStatus;
}
