package com.auction.auctionspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.dto.ResponseDto;
import com.auction.auctionspringboot.converter.dto.auction.GetAuctionResponseConvertor;
import com.auction.auctionspringboot.converter.dto.auction.GetAuctionResponseDto;
import com.auction.auctionspringboot.converter.dto.auction.NewAuctionDto;
import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.service.AuctionService;
import com.auction.auctionspringboot.utils.Log;
import com.auction.auctionspringboot.utils.ValidationUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Auction", description = "Auction management APIs")
@CrossOrigin(origins = "http://localhost:3000")
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
            @RequestParam(name = "category", required = true) String category) throws Exception {
        List<Auction> auctions = auctionService.findAll(sort, limit, sort_price, page, seller_id, name, type,
                price_from, price_to, category);
        List<GetAuctionResponseDto> lstAuctions = GetAuctionResponseConvertor.convertList(auctions);
        return new ResponseEntity<>(lstAuctions, HttpStatus.ACCEPTED);
    }

    @PostMapping("/{auctionId}")
    @Operation(summary = "Get Auction", tags = { "Auction" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = GetAuctionResponseDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> find(@PathVariable int auctionId) throws Exception {
        Log.info("Get auction");
        ResponseDto<GetAuctionResponseDto> resp;
        try {

            // ValidationUtil.validate(registerRequestDto);
            // User user = UserDtoConvertor.toCreateModel(registerRequestDto);
            Auction auction = auctionService.find(auctionId);
            GetAuctionResponseDto auctionResponseDto = GetAuctionResponseConvertor.convert(auction);
            resp = new ResponseDto<GetAuctionResponseDto>(
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
                    @Content(schema = @Schema(implementation = GetAuctionResponseDto.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> create(
        @RequestBody
        NewAuctionDto request
        
    ) throws Exception {
        ResponseDto<Auction> resp;
        try {

            ValidationUtil.validate(request);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Object obj = authentication.getPrincipal();
            User actionUser;
            if(obj instanceof User){
                actionUser = (User) authentication.getPrincipal();
            } else {
                throw new Exception("Not authorize!");
            }
            Auction auction = auctionService.create(request, actionUser);
            // AuctionResponseDto auctionResponseDto = AuctionResponseConvertor.convert(auction);
            resp = new ResponseDto<Auction>(
                    true,
                    400,
                    "Get Auction Success",
                    auction);
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
