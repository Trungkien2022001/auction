package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.Chat;
import com.auction.auctionspringboot.repository.ChatRepository;

@Service
public class ChatService {
    @Autowired
    private ChatRepository messageRepository;

    public Chat findOne(int userId){
        Chat msg = messageRepository.findById(userId).orElse(null);
        return msg;
    }

    public List<Chat> findAll() {
        return messageRepository.findAll();
    }
}
