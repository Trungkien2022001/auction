package com.auction.auctionspringboot.converter.toModel;

import com.auction.auctionspringboot.converter.toDto.auction.NewAuctionDto;
import com.auction.auctionspringboot.model.Product;
import com.auction.auctionspringboot.model.User;

public class ProductDtoConvertor {
    public static Product toCreateModel(NewAuctionDto req, User user) {
        Product product = new Product();

        product.setBranch(req.getProduct().getBranch());
        product.setName(req.getProduct().getName());
        product.setStatus(req.getProduct().getStatus());
        product.setTitle(req.getProduct().getTitle());
        product.setDescription(req.getProduct().getDescription());
        product.setKey_word(req.getProduct().getKey_word());
        product.setStart_price(Long.parseLong(req.getProduct().getStart_price()));
        product.setCategory_id(req.getProduct().getCategory_id());
        product.setImage(req.getProduct().getImages().getFirst());
        product.setSeller_id(user.getId());

        return product;
    }
}
