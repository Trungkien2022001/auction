package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.dto.UserDto;
import com.auction.auctionspringboot.dtoToModel.UserDtoConvertor;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> findAll(){
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> find(int userId){
        Optional<User> user = Optional.of(new User());
        user = userRepository.findById(userId);
        // System.out.println(user.getRole());
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> update(int userId, UserDto userDto){
       User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            throw new EntityNotFoundException("User not found");
        }
        User updatedUser = UserDtoConvertor.toUpdateModel(user, userDto);
        userRepository.save(updatedUser);
        return new ResponseEntity<>(updatedUser, HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> create(User user){
        System.out.println(user);
        User savedUser;
        savedUser = userRepository.save(user);
        System.out.println((savedUser));
        return new ResponseEntity<>(savedUser, HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> delete(int userId){
        User user = userRepository.findById(userId).orElse(null);
        if (user == null){
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
        return null;
    }
}
