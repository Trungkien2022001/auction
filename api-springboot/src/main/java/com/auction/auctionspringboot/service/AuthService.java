package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.toDto.auth.LoginRequestDto;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;
import com.auction.auctionspringboot.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    CacheService<List<User>> cache;

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

    public User register(User user) throws Exception {
        User savedUser = new User();
        List<User> existUser =  userRepository.findByConditional(user.getUsername(), user.getEmail(), user.getPhone());
        if (existUser.toString() != "[]"){
            throw new Exception("Username or Email or Phone is exited in our system, please try again!");
        }
        savedUser = userRepository.save(user);
        final String USERS_KEY = "users";
        cache.del(USERS_KEY);
        return savedUser;
    }
}
