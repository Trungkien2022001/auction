package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.auctionspringboot.model.Image;

public interface ImageRepository extends JpaRepository<Image, Integer>{

    
}
