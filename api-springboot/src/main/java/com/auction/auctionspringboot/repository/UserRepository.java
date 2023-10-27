package com.auction.auctionspringboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auction.auctionspringboot.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // @Query("SELECT u, r FROM User u INNER JOIN Role r ON u.role.id = r.id")
    // List<User> findAll();
}