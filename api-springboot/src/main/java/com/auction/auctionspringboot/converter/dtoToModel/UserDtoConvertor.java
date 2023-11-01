package com.auction.auctionspringboot.converter.dtoToModel;

import com.auction.auctionspringboot.converter.dto.auth.RegisterRequestDto;
import com.auction.auctionspringboot.converter.dto.user.UpdateUserDto;
import com.auction.auctionspringboot.model.User;
import com.auction.auctionspringboot.utils.BCryptEncoder;

public class UserDtoConvertor {
    public static User toCreateModel(RegisterRequestDto userDto){
        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        String password_hash = BCryptEncoder.encodePassword(userDto.getPassword());
        user.setPassword_hash(password_hash);
        user.setAvatar(userDto.getAvatar());
        user.setPhone(userDto.getPhone());
        user.setBirthday(userDto.getBirthday());
        user.setAddress(userDto.getAddress());
        System.out.println(user);
        return user;
    }

    public static User toUpdateModel(User user, UpdateUserDto userDto){
        if(user == null){
            return null;
        }

        if(userDto.getName() != null){
            user.setName(userDto.getName());
        }

        if(userDto.getAddress() != null){
            user.setAddress(userDto.getAddress());
        }
        
        if(userDto.getPassword() != null){
            user.setPassword_hash(BCryptEncoder.encodePassword(userDto.getPassword()));
        }

        if (userDto.getAvatar() != null){
            user.setAvatar(userDto.getAvatar());
        }

        if (userDto.getBirthday() != null){
            user.setBirthday(userDto.getBirthday());
        }
        
        return user;
    }
}
