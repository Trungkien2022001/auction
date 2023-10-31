package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.dto.auth.RegisterRequestDto;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    
    @Autowired
    CacheService<List<User>> cache;
    public ResponseEntity<?> findAll() throws Exception {
         List<User> users;
        final String key = "users";
        final int time = 24 * 7 * 60 * 60;
        users = cache.cachedExecute(key, time, true, (t) -> userRepository.findAll());
        return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
    }

    public List<User> find(int userId, User userRq) throws Exception {
        List<User> user;
        final String key = "user:" + userId;
        final int time = 24 * 7 * 60 * 60;
        user = cache.cachedExecute(key, time, true, (t) -> userRepository.findById(userId));
        if(user == null || user.isEmpty()){
            throw new Exception("User not found!");
        }
        
        // if(userRq.getId() != userId || userRq.getRole_id() != "admin" || userRq.getRole_id() != "admin_user"){
        //     System.out.println("hahahah");
        // }
        // User toReturned = user.get(0);
        // List<User> list = new ArrayList<>();
        // list.add(toReturned);
        return user;
    }

    // public Optional<User> findByUserName(String username){
    // Optional<User> user = Optional.of(new User());
    // user = userRepository.findByUsername(username);
    // return user;
    // }

    public ResponseEntity<?> update(int userId, RegisterRequestDto userDto) {
        // User user = userRepository.findById(userId);
        // if(user == null){
        // throw new EntityNotFoundException("User not found");
        // }
        // User updatedUser = UserDtoConvertor.toUpdateModel(user, userDto);
        // userRepository.save(updatedUser);
        // return new ResponseEntity<>(updatedUser, HttpStatus.ACCEPTED);
        return null;
    }

    public ResponseEntity<?> delete(int userId) {
        // User user = userRepository.findById(userId);
        // if (user == null){
        // throw new EntityNotFoundException("User not found");
        // }
        // userRepository.deleteById(userId);
        return null;
    }
}