package com.auction.auctionspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.annotation.SaveLog;
import com.auction.auctionspringboot.converter.toDto.ResponseDto;
import com.auction.auctionspringboot.converter.toDto.auth.LoginRequestDto;
import com.auction.auctionspringboot.converter.toDto.auth.LoginResponseDto;
import com.auction.auctionspringboot.converter.toDto.auth.RegisterRequestDto;
import com.auction.auctionspringboot.converter.toModel.UserDtoConvertor;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.service.AuthService;
import com.auction.auctionspringboot.utils.ValidationUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@Tag(name = "Auth", description = "Auth management APIs")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @SaveLog
    @Operation(summary = "Login", tags = { "Auth" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = LoginResponseDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginDto) {
        ResponseDto<LoginResponseDto> resp;
        try {
            ValidationUtil.validate(loginDto);
            String token = authService.login(loginDto);
            resp = new ResponseDto<LoginResponseDto>(
                    true,
                    400,
                    "Login Success",
                    new LoginResponseDto(loginDto.getUsername(), token));
            return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            resp = new ResponseDto<LoginResponseDto>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Register", tags = { "Auth" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = RegisterRequestDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> create(@RequestBody RegisterRequestDto registerRequestDto) {
                ResponseDto<User> resp;
        try {
                
                ValidationUtil.validate(registerRequestDto);
                User user = UserDtoConvertor.toCreateModel(registerRequestDto);
                User savedUser= authService.register(user);
                resp = new ResponseDto<User>(
                    true,
                    400,
                    "Register Success",
                    savedUser);
                 return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resp = new ResponseDto<>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }

    }

}
