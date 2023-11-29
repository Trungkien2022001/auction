package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auction.auctionspringboot.model.ActionLog;

@Repository
public interface LogRepository extends JpaRepository<ActionLog, Long>{
    
}
