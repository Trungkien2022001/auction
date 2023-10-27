package com.auction.auctionspringboot.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_category")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(200)")
    private String name;

    @Column(name = "key", nullable = false, columnDefinition = "VARCHAR(100)")
    private String key;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "image", nullable = false, columnDefinition = "VARCHAR(500)")
    private String image;

    // Constructors, getters, and setters
}




