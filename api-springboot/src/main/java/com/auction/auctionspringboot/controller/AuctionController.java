package com.auction.auctionspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.dto.ResponseDto;
import com.auction.auctionspringboot.converter.dto.auction.AuctionResponseConvertor;
import com.auction.auctionspringboot.converter.dto.auction.AuctionResponseDto;
import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.service.AuctionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Auction", description = "Auction management APIs")
@RequestMapping("/api/v1/auction")
public class AuctionController {
    @Autowired
    private AuctionService auctionService;

    @GetMapping()
    public ResponseEntity<?> findAll(
        @RequestParam("sort") String sort,
        @RequestParam("limit") int limit,
        @RequestParam(name = "sort_price", required = false) String sort_price,
        @RequestParam("page") int page,
        @RequestParam(name = "seller_id", required = false) Integer seller_id,
        @RequestParam("name") String name,
        @RequestParam(name = "type", required = false) String type,
        @RequestParam(name = "price_from", required = false) Long price_from,
        @RequestParam(name = "price_to", required = false) Long price_to,
        @RequestParam(name = "category", required = true) String category
    ) throws Exception {
        List<Auction> auctions = auctionService.findAll(sort, limit, sort_price, page, seller_id, name, type, price_from, price_to, category);
        List<AuctionResponseDto> lstAuctions= AuctionResponseConvertor.convertList(auctions);
        return new ResponseEntity<>(lstAuctions, HttpStatus.ACCEPTED);
    }

    

    @GetMapping("/{auctionId}")
    @Operation(summary = "Get Auction", tags = { "Auction" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = AuctionResponseDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> find(@PathVariable int auctionId) throws Exception {
        ResponseDto<AuctionResponseDto> resp;
        try {

            // ValidationUtil.validate(registerRequestDto);
            // User user = UserDtoConvertor.toCreateModel(registerRequestDto);
            Auction auction = auctionService.find(auctionId);
            AuctionResponseDto auctionResponseDto = AuctionResponseConvertor.convert(auction);
            resp = new ResponseDto<AuctionResponseDto>(
                    true,
                    400,
                    "Get Auction Success",
                    auctionResponseDto);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            resp = new ResponseDto<>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

    
    
    @PostMapping()
    @Operation(summary = "Create Auction", tags = { "Auction" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = AuctionResponseDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> create() throws Exception {
        ResponseDto<Integer> resp;
        try {

            // // ValidationUtil.validate(registerRequestDto);
            // // User user = UserDtoConvertor.toCreateModel(registerRequestDto);
            // Auction auction = auctionService.find(auctionId);
            // AuctionResponseDto auctionResponseDto = AuctionResponseConvertor.convert(auction);
            resp = new ResponseDto<>(
                    true,
                    400,
                    "Get Auction Success",
                    1);
            return new ResponseEntity<>("", HttpStatus.OK);
        } catch (Exception e) {
            resp = new ResponseDto<>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }
}
