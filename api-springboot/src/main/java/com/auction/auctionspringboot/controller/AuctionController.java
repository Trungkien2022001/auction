package com.auction.auctionspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.service.AuctionService;

@RestController
@RequestMapping("/api/v1/auction")
public class AuctionController {
    @Autowired
    private AuctionService auctionService;

    @GetMapping()
    public ResponseEntity<?> findAll(){
        List<Auction> auctions = auctionService.findAll();
        return new ResponseEntity<>(auctions, HttpStatus.ACCEPTED);
    }
}
