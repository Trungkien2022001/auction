package com.auction.auctionspringboot.converter.dtoToModel;

import com.auction.auctionspringboot.converter.dto.auth.RegisterRequestDto;
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

    public static User toUpdateModel(User user, RegisterRequestDto userDto){
        if(user == null){
            return null;
        }
        if(userDto.getUsername() != null){
            user.setUsername(userDto.getUsername());
        }
        // if(userDto.getFirst_name() != null){
        //     // user.setFirst_name(userDto.getFirst_name());
        // }
        // if(userDto.getUsername() != null){
        //     user.setUsername(userDto.getUsername());
        // }

        return user;
    }
}
