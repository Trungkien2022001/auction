package com.auction.auctionspringboot.repository;


import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.auction.auctionspringboot.model.AuctionElasticsearch;

public interface AuctionElasticsearchRepository extends ElasticsearchRepository<AuctionElasticsearch, String> {
}
