package com.auction.auctionspringboot.controller;

import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.dto.UserDto;
import com.auction.auctionspringboot.dtoToModel.UserDtoConvertor;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired 
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> create(
        @RequestBody
        UserDto userDto
    ) {
        User user = UserDtoConvertor.toCreateModel(userDto);
        return userService.create(user);
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        //TODO: process POST request
        
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> find(@PathVariable int userId) {
        System.out.println(userId);
        //TODO: process POST request
        
        return userService.find(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> update(@PathVariable int userId, @RequestBody UserDto userDto) {
        System.out.println(userDto);
        //TODO: process POST request
        
        return userService.update(userId, userDto);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> delete (@PathVariable int userId){
        try {
            
            return userService.delete(userId);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
}
