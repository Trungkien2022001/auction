package com.auction.auctionspringboot.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created_by", nullable = false)
    private int createdBy;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "banner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BannerImage> bannerImages;

}
