package com.auction.auctionspringboot.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.toDto.auctionElasticsearch.GetAuctionElasticsearchResponseDto;
import com.auction.auctionspringboot.model.AuctionElasticsearch;
import com.auction.auctionspringboot.repository.AuctionElasticsearchRepository;

@Service
public class AuctionElasticsearchService {
    @Autowired
    private AuctionElasticsearchRepository auctionElasticsearchRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public AuctionElasticsearchService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public GetAuctionElasticsearchResponseDto find(String auctionId){
        AuctionElasticsearch auctionElasticsearch = auctionElasticsearchRepository.findById(auctionId).orElse(null);
        return modelMapper.map(auctionElasticsearch, GetAuctionElasticsearchResponseDto.class);
    }
}
