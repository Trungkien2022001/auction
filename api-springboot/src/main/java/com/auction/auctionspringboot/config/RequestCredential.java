package com.auction.auctionspringboot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.auction.auctionspringboot.model.User;

@Component
@Configuration
public class RequestCredential {

    @Bean
    @Autowired
    public static User getCreds() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = new User();
        if (authentication != null && authentication.isAuthenticated()
                && authentication instanceof UsernamePasswordAuthenticationToken) {
            UsernamePasswordAuthenticationToken auth = (UsernamePasswordAuthenticationToken) authentication;
            Object principal = auth.getPrincipal();
            if (principal instanceof User) {
                user = (User) principal;
            }
        }
        return user;
    }
}
