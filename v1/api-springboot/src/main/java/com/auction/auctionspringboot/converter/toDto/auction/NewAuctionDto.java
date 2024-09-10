package com.auction.auctionspringboot.converter.toDto.auction;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewAuctionDto {

    @NotNull
    public NewAuction auction;

    @NotNull
    public NewProduct product;
}