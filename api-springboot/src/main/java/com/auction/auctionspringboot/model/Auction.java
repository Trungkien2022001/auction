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
@Table(name = "product")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private int id;

    @Column(name = "name", length = 500, nullable = false, columnDefinition = "varchar(500) default '0'")
    private String name;

    @Column(name = "description", length = 5000, nullable = false, columnDefinition = "varchar(5000) default '0'")
    private String description;

    @Column(name = "branch", length = 100)
    private String branch;

    @Column(name = "image", length = 5000, nullable = false, columnDefinition = "varchar(5000) default '0'")
    private String image;

    @Column(name = "category_id", nullable = false, columnDefinition = "int default 0")
    private int category_id;

    @Column(name = "title", length = 1000, nullable = false, columnDefinition = "varchar(1000) character set utf8mb4 collate utf8mb4_0900_ai_ci not null")
    private String title;

    @Column(name = "start_price", nullable = false, columnDefinition = "int default 0")
    private int start_price;

    @Column(name = "key_word", length = 1000, nullable = false, columnDefinition = "varchar(1000) default '0'")
    private String key_word;

    @Column(name = "status", length = 200, nullable = false, columnDefinition = "varchar(200) character set utf8mb4 collate utf8mb4_0900_ai_ci not null default 'Còn mới'")
    private String status;

    @Column(name = "seller_id", nullable = false)
    private int seller_id;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "datetime default current_timestamp")
    private Date created_at;

    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private Date updated_at;

    @Column(name = "deleted_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private Date deleted_at;

    // Định nghĩa quan hệ với bảng User bằng cách thêm annotaion @ManyToOne và @JoinColumn
    // @ManyToOne
    // @JoinColumn(name = "seller_id", referencedColumnName = "id", insertable = false, updatable = false)
    // private User user;

    // Constructors, getters, and setters...
}
