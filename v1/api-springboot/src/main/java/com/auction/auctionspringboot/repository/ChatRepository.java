package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auction.auctionspringboot.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer>{
    
}
