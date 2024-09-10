package com.auction.auctionspringboot.converter.toDto.user;

import java.sql.Date;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequestDto {

    @Size(max = 50)
    private String name;

    @Size(max = 500)
    private String password;

    @Size(max = 1000)
    private String avatar;

    private Date birthday;

    @Size(max = 1000)
    private String address;
}