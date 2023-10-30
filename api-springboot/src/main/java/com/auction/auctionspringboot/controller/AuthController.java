package com.auction.auctionspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.dto.LoginRequestDto;
import com.auction.auctionspringboot.converter.dto.LoginResponseDto;
import com.auction.auctionspringboot.converter.dto.ResponseDto;
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
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginDto) {
        ResponseDto<LoginResponseDto> resp;
        try {
            String token = authService.login(loginDto);
            resp = new ResponseDto<LoginResponseDto>(
                    true,
                    400,
                    "Login Success",
                    new LoginResponseDto(loginDto.getUsername(), token)
                    );
                     return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            resp = new ResponseDto<LoginResponseDto>(
                    false,
                    400,
                    "Login Failed: Invalid Username or Password");
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

}
