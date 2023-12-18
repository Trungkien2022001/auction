package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.AuctionElasticsearch;
import com.auction.auctionspringboot.repository.AuctionElasticsearchRepository;

@Service
public class AuctionElasticsearchService {
    @Autowired
    private AuctionElasticsearchRepository auctionElasticsearchRepository;

    public AuctionElasticsearch find(String auctionId){
        return auctionElasticsearchRepository.findById(auctionId).orElse(null);
    }
}
