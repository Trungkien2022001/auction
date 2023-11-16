package com.auction.auctionspringboot.converter.toModel;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.auction.auctionspringboot.converter.dto.auction.NewAuctionDto;
import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.model.Product;
import com.auction.auctionspringboot.model.User;

public class AuctionDtoConvertor {
    public static Auction toCreateModel(NewAuctionDto req, User user, Product product){

        Auction auction = new Auction();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.parse(req.getAuction().getStart_time(), formatter);
        auction.setStartTime(startTime);
        auction.setAuction_time(req.getAuction().getAuction_time());
        auction.setIsReturned(req.getAuction().getIs_returned());
        auction.setIsFinishedSoon(req.getAuction().getIs_finished_soon());
        auction.setSellerId(user.getId());
        auction.setSeller(user);
        Long price = Long.parseLong(req.getProduct().getStart_price());
        auction.setStartPrice(price);
        auction.setSellPrice(price);

        auction.setProduct(product);
        auction.setProductId(product.getId());

        
        return auction;
    }
}
