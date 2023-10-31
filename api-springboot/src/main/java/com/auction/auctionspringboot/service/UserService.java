package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.dto.auth.RegisterRequestDto;
import com.auction.auctionspringboot.converter.dtoToModel.UserDtoConvertor;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    
    @Autowired
    private UserRepository userRepository;

    @Autowired CacheService<Optional<User>> cache;

    public ResponseEntity<?> findAll(){
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> find(int userId){
        Optional<User> user = Optional.of(new User());
        final String key = "user:" + userId;
        final int time = 24*7*60*60;
        user = cache.cachedExecute(key,time ,true, (t)->userRepository.findById(userId)) ;
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    public Optional<User> findByUserName(String username){
        Optional<User> user = Optional.of(new User());
        user = userRepository.findByUsername(username);
        return user;
    }

    public ResponseEntity<?> update(int userId, RegisterRequestDto userDto){
       User user = userRepository.findById(userId).orElse(null);
        if(user == null){
            throw new EntityNotFoundException("User not found");
        }
        User updatedUser = UserDtoConvertor.toUpdateModel(user, userDto);
        userRepository.save(updatedUser);
        return new ResponseEntity<>(updatedUser, HttpStatus.ACCEPTED);
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
