package com.auction.auctionspringboot.converter.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {
    private int id;
    private String first_name;
    private String last_name;
    private String username;
    private String password;
}
