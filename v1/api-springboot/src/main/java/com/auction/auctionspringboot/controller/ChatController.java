package com.auction.auctionspringboot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.toDto.ResponseDto;
import com.auction.auctionspringboot.model.Chat;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.service.ChatService;
import com.auction.auctionspringboot.utils.AppUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/message")
@Tag(name = "Chat", description = "Chat Management APIs")
public class ChatController {

    @Autowired
    private ChatService messageService;

    @GetMapping("/{userId}")
    @Operation(summary = "Get Chat", tags = "Chat")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Chat.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public  ResponseEntity<?> getOne() {

        ResponseDto<Chat> resp;
        try {
            // User userRq = AppUtil.getAuthenticatedUser();

            Chat chat = messageService.findOne(6);
            resp = new ResponseDto<Chat>(chat);
            return new ResponseEntity<>(resp, HttpStatus.OK);

        } catch (Exception e) {
            resp = new ResponseDto<Chat>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping()
    @Operation(summary = "Get All Chat", tags = "Chat")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = Chat.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public  ResponseEntity<?> getAll() {

        ResponseDto<List<Chat>> resp;
        try {
            // User userRq = AppUtil.getAuthenticatedUser();

            List<Chat> chats = messageService.findAll();
            resp = new ResponseDto<List<Chat>>(chats);
            return new ResponseEntity<>(resp, HttpStatus.OK);

        } catch (Exception e) {
            resp = new ResponseDto<List<Chat>>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

}
