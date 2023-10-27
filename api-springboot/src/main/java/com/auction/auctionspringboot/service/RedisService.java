package com.auction.auctionspringboot.service;

import com.auction.auctionspringboot.model.Auction;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private final StringRedisTemplate stringRedisTemplate;

    public RedisService(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void saveAuctionsWithExpiration(List<Auction> auctions, String key, long expirationInSeconds) {
        // Chuyển đổi danh sách auctions thành chuỗi JSON
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String auctionsJson = objectMapper.writeValueAsString(auctions);

            // Lưu chuỗi JSON vào Redis với khóa "myKey"
            stringRedisTemplate.opsForValue().set(key, auctionsJson);

            // Đặt thời gian tồn tại cho khóa (số giây)
            stringRedisTemplate.expire(key, expirationInSeconds, TimeUnit.SECONDS);
        } catch (JsonProcessingException e) {
            // Xử lý ngoại lệ nếu có lỗi trong quá trình chuyển đổi thành JSON
        }
    }
}
