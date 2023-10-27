package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.repository.AuctionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    ObjectMapper objectMapper = new ObjectMapper();

    public List<Auction> findAll() {
        
        List<Auction> auctions = auctionRepository.findAll();
        String auctionsJson;
        try {
            auctionsJson = objectMapper.writeValueAsString(auctions);
            stringRedisTemplate.opsForValue().set("myKey", auctionsJson);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return auctions;
    }
}
