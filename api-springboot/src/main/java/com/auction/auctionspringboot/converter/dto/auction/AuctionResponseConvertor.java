package com.auction.auctionspringboot.converter.dto.auction;

import java.util.List;
import java.util.stream.Collectors;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.model.Product;
import com.auction.auctionspringboot.model.User;

public class AuctionResponseConvertor {
    public static AuctionResponseDto convert (Auction auction){
        AuctionResponseDto resp = new AuctionResponseDto();
        Product product = auction.getProduct();
        // List<Image> img = product.getImages();

        User seller = auction.getSeller();
        seller.setPassword_hash("");
        seller.setCustom_config(null);
        seller.setRefresh_token(null);
        seller.setRole(null);
        seller.setRole_id(null);

        resp.setId(auction.getId());
        resp.setStart_time(auction.getStartTime());
        resp.setEnd_time(auction.getEndTime());
        resp.setStart_price(auction.getStartPrice());
        resp.setSell_price(auction.getSellPrice());
        resp.setAuction_count(auction.getAuctionCount());
        resp.setAuctioneer_win(auction.getAuctioneerWin());
        resp.setStatus_id(auction.getStatus());
        resp.setStatus(auction.getAuctionStatus().getName());
        resp.setIs_returned(auction.getIsReturned());
        resp.setIs_finished_soon(auction.getIsFinishedSoon());
        resp.setName(product.getName());
        resp.setDescription(product.getDescription());
        resp.setBranch(product.getBranch());
        resp.setCategory_id(product.getProductCategory().getId());
        resp.setCategory(product.getProductCategory().getName());
        resp.setTitle(product.getTitle());
        resp.setKey_word(product.getKey_word());
        resp.setProduct_status(product.getStatus());
        resp.setSeller_confirm_time(auction.getSellerConfirmTime());
        resp.setAuctioneer_confirm_time(auction.getAuctioneerConfirmTime());
        resp.setCreated_at(auction.getCreatedAt());
        resp.setUpdated_at(auction.getUpdatedAt());
        resp.setDeletedAt(auction.getDeletedAt());
        resp.setSeller(seller);
        resp.setImages(product.getImages());
        return resp ;
    }

    public static List<AuctionResponseDto> convertList(List<Auction> auctions) {
    return auctions.stream()
            .map(AuctionResponseConvertor::convert)
            .collect(Collectors.toList());
}
}
