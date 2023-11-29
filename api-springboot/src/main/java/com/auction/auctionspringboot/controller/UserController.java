package com.auction.auctionspringboot.controller;

import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.converter.dto.ResponseDto;
import com.auction.auctionspringboot.converter.dto.user.UpdateUserRequestDto;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.service.UserService;
import com.auction.auctionspringboot.utils.AppUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@Tag(name = "User", description = "User management APIs")
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    @Operation(summary = "Get All User", tags = { "User" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> findAll() throws Exception {

        return userService.findAll();
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get User", tags = { "User" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> find(@PathVariable int userId) {
        ResponseDto<User> resp;
        try {
            User userRq = AppUtil.getAuthenticatedUser();

            User user = userService.find(userId, userRq);
            resp = new ResponseDto<User>(user);
            return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            resp = new ResponseDto<User>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update User", tags = { "User" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = User.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> update(@PathVariable int userId, @RequestBody UpdateUserRequestDto userDto) {
        ResponseDto<User> resp;
        try {
            User userRq = AppUtil.getAuthenticatedUser();
            User user = userService.update(userId, userDto, userRq);
            resp = new ResponseDto<User>(user);
            return new ResponseEntity<>(resp, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            resp = new ResponseDto<User>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }

    /*
     * Dont use
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> delete(@PathVariable int userId) {
        try {

            return userService.delete(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
