package com.auction.auctionspringboot.model;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Collection;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.auction.auctionspringboot.constant.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, unique = true)
    private int id;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "username", length = 100)
    private String username;
    
    @Column(name = "email", length = 50, nullable = false)
    private String email;
    
    @Column(name = "phone", length = 15)
    private String phone;
    
    @Column(name = "password_hash", length = 255, nullable = false)
    private String password_hash;
    
    @Column(name = "avatar", length = 1000, nullable = false)
    private String avatar;
    
    @Column(name = "birthday")
    private Date birthday;
    
    @Column(name = "amount", nullable = false)
    private int amount;
    
    @Column(name = "prestige", nullable = false)
    private int prestige = 0;
    
    @Column(name = "is_verified", nullable = false)
    private int is_verified = 0;
    
    @Column(name = "is_blocked", length = 50, nullable = false)
    private String is_blocked = "";
    
    @Column(name = "address", length = 1000)
    private String address;
    
    @Column(name = "refresh_token", length = 50)
    private String refresh_token;
    
    @Column(name = "rating", nullable = false)
    private Float rating= 0.0f;
    
    @Column(name = "sell_failed_count_by_seller", nullable = false)
    private Integer sell_failed_count_by_seller = 0;
    
    @Column(name = "sell_failed_count_by_auctioneer", nullable = false)
    private Integer sell_failed_count_by_auctioneer = 0;
    
    @Column(name = "sell_success_count", nullable = false)
    private Integer sell_success_count = 0;
    
    @Column(name = "buy_cancel_count_by_seller", nullable = false)
    private Integer buy_cancel_count_by_seller = 0;
    
    @Column(name = "buy_cancel_count_by_auctioneer", nullable = false)
    private Integer buy_cancel_count_by_auctioneer = 0;
    
    @Column(name = "buy_success_count", nullable = false)
    private Integer buy_success_count = 0;
    
    @Column(name = "custom_config", columnDefinition = "json")
    private String custom_config;

    @CreatedDate
    @Column(name = "created_at", nullable = false, columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false, columnDefinition = "datetime default current_timestamp ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
    
    @Column(name = "del_flag", nullable = false)
    private int del_flag;
    
    @Column(name = "role_id")
    private String role_id = "user";
    
    
    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Role role;
    
    public Object orElseThrow(Object object) {
      return null;
    }

    @CreatedDate
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return RoleType.mapToRoleType(role_id).getAuthorities();
    }

    @Override
    @JsonIgnore
    public String getPassword() {
      return password_hash;
    }
  
    @Override
    public String getUsername() {
      return email;
    }
  
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
      return true;
    }
  
    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
      return true;
    }
  
    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
      return true;
    }
  
    @Override
    @JsonIgnore
    public boolean isEnabled() {
      return true;
    }

    // @ManyToOne
    // @JoinColumn(name = "id", referencedColumnName = "selled_id", insertable = false, updatable = false)
    // private Product product;
    
}
