package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.repository.AuctionRepository;
import com.auction.auctionspringboot.repository.AuctionSpecifications;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private CacheService<List<Auction>> cacheService;

    private final Long MAX_PRICE = 99999999999L;

    public List<Auction> findAll(
        String sort,
        int limit,
        String sortPrice,
        int page,
        Integer sellerId,
        String name,
        String type,
        Long priceFrom,
        Long priceTo,
        String category
    ) throws Exception {
        // List<Auction> auctions = cacheService.cachedExecute("t", 10000, true, (t) ->
        // auctionRepository.findAll());

        // return auctions;
        if(priceFrom == null){
            priceFrom = 5000L;
        }

        if(priceTo == null){
            priceTo = MAX_PRICE;
        }
        List<Auction> auction;
        // String key = "auction";
        // List<Auction> cached = (List<Auction>) cacheService.get(key, Auction.class);
        Page<Auction> pageAuctions = auctionRepository.findAll(
            AuctionSpecifications.filterAuctions(sort, sortPrice, sellerId, name, type, priceFrom, priceTo, category),
            PageRequest.of(page - 1, limit)
        );
        auction = pageAuctions.getContent();
        // if (cached != null) {
        //     auction = cached;
        // } else {
        //     auction = auctionRepository.findAll();
        //     ;
        //     cacheService.set(key, auction, 86400, true);
        // }
        return auction;
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
