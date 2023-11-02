package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.repository.AuctionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private CacheService<List<Auction>> cacheService;

    public List<Auction> findAll() throws Exception {

        // List<Auction> auctions = auctionRepository.findAll();
        // String auctionsJson;
        List<Auction> auctions = cacheService.cachedExecute("t", 10000, true, (t) -> auctionRepository.findAll());

        // try {
        // auctionsJson = objectMapper.writeValueAsString(auctions);
        // stringRedisTemplate.opsForValue().set("myKey", auctionsJson);
        // } catch (JsonProcessingException e) {
        // e.printStackTrace();
        // }
        return auctions;
    }

    public Auction find(int auctionId) throws Exception {
        Auction auction;
        String key = "auction:" + auctionId;
        Auction cached = cacheService.get(key, Auction.class);
        auction = auctionRepository.findById(auctionId).orElse(null);
        if (cached != null) {
            auction = cached;
        } else {
            auction = auctionRepository.findById(auctionId).orElse(null);
            if (auction == null) {
                throw new Exception("Auction not found!");
            } else {
                cacheService.set(key, auction, 86400, true);
            }
        }
        return auction;
    }
}
