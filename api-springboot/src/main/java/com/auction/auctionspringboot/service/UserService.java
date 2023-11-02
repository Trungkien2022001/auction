package com.auction.auctionspringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.converter.dto.user.UpdateUserDto;
import com.auction.auctionspringboot.converter.dtoToModel.UserDtoConvertor;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    CacheService<List<User>> cache;

    public ResponseEntity<?> findAll() throws Exception {
        // List<User> users;
        // final String key = "users";
        // final int time = 24 * 7 * 60 * 60;
        // users = cache.cachedExecute(key, time, true, (t) -> userRepository.findAll());
        // return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    public User find(int userId, User userRq) throws Exception {
        User user = new User();
        String key = "user:" + userRq;
        User cached = cache.get(key, User.class);
        if (cached != null) {
            user = cached;
        } else {
            user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                throw new Exception("User not found!");
            } else {
                cache.set(key, user, 86400, true);

            }
        }
        if (userId != userRq.getId() || !userRq.getRole().isDashboard_user() || !userRq.getRole().isAdmin()) {
            user.setPassword_hash("");
            user.setCustom_config(null);
            user.setRefresh_token(null);
            user.setRole(null);
            user.setRole_id(null);
        }
        return user;
    }

    public User update(int userId, UpdateUserDto userDto, User userRq) throws Exception {
        if (userId == userRq.getId() || userRq.getRole().isDashboard_user() || userRq.getRole().isAdmin()) {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                throw new EntityNotFoundException("User not found");
            }
            User updatedUser = UserDtoConvertor.toUpdateModel(user, userDto);
            userRepository.save(updatedUser);
            return updatedUser;
        } else {
            throw new Exception("You dont have permission to do this!");
        }

    }

    /*
     * Pls dont use this method hahahaha
     */
    public ResponseEntity<?> delete(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
        return null;
    }
}