package com.auction.auctionspringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.auction.auctionspringboot.model.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Integer> {
    
    // @Query("select u from auction u limit 100")
    // List<Auction> findAll();
    
    @Query(nativeQuery = true, value = "SELECT * FROM auction LIMIT 1")
    List<Auction> findAll();
}
