package com.auction.auctionspringboot.dtoToModel;

import com.auction.auctionspringboot.dto.UserDto;
import com.auction.auctionspringboot.model.User;

public class UserDtoConvertor {
    public static User toCreateModel(UserDto userDto){
        User user = new User();
        user.setId(userDto.getId());
        // user.setPassword(userDto.getPassword());
        // user.setFirst_name(userDto.getFirst_name());
        // user.setLast_name(userDto.getLast_name());
        user.setUsername(userDto.getUsername());
        System.out.println(user);
        return user;
    }

    public static User toUpdateModel(User user, UserDto userDto){
        if(user == null){
            return null;
        }
        if(userDto.getUsername() != null){
            user.setUsername(userDto.getUsername());
        }
        if(userDto.getFirst_name() != null){
            // user.setFirst_name(userDto.getFirst_name());
        }
        // if(userDto.getUsername() != null){
        //     user.setUsername(userDto.getUsername());
        // }

        return user;
    }
}
