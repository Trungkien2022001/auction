package com.auction.auctionspringboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.auction.auctionspringboot.model.User;
import java.util.*;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // @Query("SELECT u, r FROM User u INNER JOIN Role r ON u.role.id = r.id")
    // List<User> findAll();
    Optional<User> findByEmail(String email);

    // List<User> findById(int id);
    
    @Query(nativeQuery = true, value = "SELECT * FROM user where email = :username")
    Optional<User> findByUsername(String username);

    @Query(nativeQuery = true, value = "SELECT * FROM user where username = :username or email = :email or phone = :phone")
    List<User> findByConditional(String username, String email, String phone);
}