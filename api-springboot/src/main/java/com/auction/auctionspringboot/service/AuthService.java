package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.dto.auth.LoginRequestDto;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;
import com.auction.auctionspringboot.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String login(LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        var user = userRepository.findByEmail(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return jwtToken;
    }

    public User create(User user) {
        System.out.println(user);
        User savedUser;
        savedUser = userRepository.save(user);
        System.out.println((savedUser));
        return savedUser;
    }
}
