package com.auction.auctionspringboot.model;

import java.sql.Date;
import java.time.LocalDateTime;

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
@Table(name = "system_config")
public class SystemConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "version", nullable = false, columnDefinition = "VARCHAR(50)")
    private String version;

    // @Column(name = "value", nullable = false, columnDefinition = "json")
    // private JsonNode value;

    @Column(name = "created_by", nullable = false)
    private int createdBy;

    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;


    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private Date deletedAt;

    @Column(name = "system_version")
    private Integer systemVersion;

}
