package com.auction.auctionspringboot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class HealthController {
    @GetMapping("/health-check")
    public String postMethodName() {
        
        return "OK!";
    }
    
}
