package com.auction.auctionspringboot.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "url", nullable = false, columnDefinition = "VARCHAR(2000)")
    private String url;

    // @Column(name = "product_id", nullable = false)
    // private int productId;

    @Column(name = "isSuccess", nullable = false)
    @JsonIgnore
    private int isSuccess;

    @Column(name = "deleted_at")
    @JsonIgnore
    private Timestamp  deletedAt;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product; 

    // Constructors, getters, and setters
}