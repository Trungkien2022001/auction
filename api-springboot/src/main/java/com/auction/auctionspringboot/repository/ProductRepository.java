package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.auctionspringboot.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    
}
