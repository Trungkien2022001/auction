package com.auction.auctionspringboot.converter.toDto.auth;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {

    @NotNull
    @Size(max = 50)
    private String name;

    @NotNull
    @Size(max = 20)
    private String email;

    @NotNull
    @Size(max = 50)
    private String username;

    @NotNull
    @Size(max = 500)
    private String password;

    @NotNull
    @Size(max = 1000)
    private String avatar;

    @NotNull
    @Size(max = 15)
    private String phone;

    @NotNull
    private Date birthday;

    @NotNull
    @Size(max = 1000)
    private String address;
}
