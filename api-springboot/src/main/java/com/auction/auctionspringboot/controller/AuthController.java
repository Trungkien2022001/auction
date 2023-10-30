package com.auction.auctionspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ValidationUtils;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.dto.ResponseDto;
import com.auction.auctionspringboot.converter.dto.auth.LoginRequestDto;
import com.auction.auctionspringboot.converter.dto.auth.LoginResponseDto;
import com.auction.auctionspringboot.service.AuthService;
import com.auction.auctionspringboot.utils.ValidationUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@Tag(name = "Auth", description = "Auth management APIs")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping()
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

}
