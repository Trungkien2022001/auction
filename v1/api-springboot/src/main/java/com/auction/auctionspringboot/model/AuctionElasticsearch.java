package com.auction.auctionspringboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Document(indexName = "auction_idx")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionElasticsearch {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Integer, name = "id")
    private Integer auctionId;

    @Field(type = FieldType.Date, name = "start_time")
    private Date startTime;

    @Field(type = FieldType.Date, name = "end_time")
    private Date endTime;

    @Field(type = FieldType.Integer, name = "auction_time")
    private Integer auctionTime;

    @Field(type = FieldType.Integer, name = "product_id")
    private Integer productId;

    @Field(type = FieldType.Long, name = "start_price")
    private Long startPrice;

    @Field(type = FieldType.Long, name = "sell_price")
    private Long sellPrice;

    @Field(type = FieldType.Integer, name = "seller_id")
    private Integer sellerId;

    @Field(type = FieldType.Integer, name = "auction_count")
    private Integer auctionCount;

    @Field(type = FieldType.Integer, name = "status")
    private Integer status;

    @Field(type = FieldType.Text, name = "auction_status")
    private String auctionStatus;

    @Field(type = FieldType.Integer, name = "is_returned")
    private Integer isReturned;

    @Field(type = FieldType.Integer, name = "is_finished_soon")
    private Integer isFinishedSoon;

    @Field(type = FieldType.Date, name = "created_at")
    private Date createdAt;

    @Field(type = FieldType.Date, name = "updated_at")
    private Date updatedAt;

    @Field(type = FieldType.Text, name = "name")
    private String name;

    @Field(type = FieldType.Text, name = "description")
    private String description;

    @Field(type = FieldType.Text, name = "branch")
    private String branch;

    @Field(type = FieldType.Text, name = "image")
    private String image;

    @Field(type = FieldType.Integer, name = "category_id")
    private Integer categoryId;

    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Field(type = FieldType.Text, name = "key_word")
    private String keyWord;

    @Field(type = FieldType.Text, name = "product_status")
    private String productStatus;
}
