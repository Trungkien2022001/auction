package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.auction.auctionspringboot.model.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Integer>, JpaSpecificationExecutor<Auction> {
    
    // @Query("select u from auction u limit 100")
    // List<Auction> findAll();
    
    // @Query(nativeQuery = true, value = "SELECT a.* FROM auction as a inner join product as p on a.product_id = p.id LIMIT 10")
    // List<Auction> findAll();
}
