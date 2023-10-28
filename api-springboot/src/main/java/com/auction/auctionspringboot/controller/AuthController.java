package com.auction.auctionspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.dto.LoginDto;
import com.auction.auctionspringboot.service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @GetMapping()
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
       
        
        return new ResponseEntity<>(authService.login(loginDto), HttpStatus.ACCEPTED);
    }
    
}
