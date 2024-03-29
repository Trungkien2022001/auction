package com.auction.auctionspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.toDto.ResponseDto;
import com.auction.auctionspringboot.converter.toDto.auctionElasticsearch.GetAuctionElasticsearchResponseDto;
import com.auction.auctionspringboot.model.AuctionElasticsearch;
import com.auction.auctionspringboot.service.AuctionElasticsearchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@Tag(name = "Auction Elasticsearch", description = "Auction Elasticsearch management APIs")
@RequestMapping("/api/v1/auction-elasticsearch")
public class AuctionElasticsearchController {
    @Autowired
    private AuctionElasticsearchService auctionElasticsearchService;

    @GetMapping()
    @Operation(summary = "Get Auction In Elasticsearch", tags = { "Auction Elasticsearch" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = AuctionElasticsearch.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> find() {
        ResponseDto<GetAuctionElasticsearchResponseDto> resp;
        // return new ResponseEntity<>(resp, HttpStatus.OK);
         try {

            // ValidationUtil.validate(registerRequestDto);
            // User user = UserDtoConvertor.toCreateModel(registerRequestDto);
            GetAuctionElasticsearchResponseDto response = auctionElasticsearchService.find("7Wt3V4wBNwa_lydW4yJ8");
            resp = new ResponseDto<GetAuctionElasticsearchResponseDto>(
                    true,
                    400,
                    "Get Auction Success",
                    response);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            resp = new ResponseDto<>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }
}
