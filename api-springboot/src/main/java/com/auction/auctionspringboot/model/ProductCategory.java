package com.auction.auctionspringboot.model;

import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Value;

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

    @Column(name = "keyword", nullable = false, columnDefinition = "VARCHAR(100)")
    private String key;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "image", nullable = false, length = 500, columnDefinition = "varchar(500) default ''")
    // @Value()
    private String image;

    // Constructors, getters, and setters
}




