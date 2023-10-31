package com.auction.auctionspringboot.converter.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private int id;

    private int name;

    private int username;

    private String password;
}
