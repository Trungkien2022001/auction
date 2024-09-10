package com.auction.auctionspringboot.redis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import com.auction.auctionspringboot.model.Auction;
import com.auction.auctionspringboot.repository.AuctionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RedisModel {
       @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private AuctionRepository auctionRepository;

    public String getAuctionsFromRedisOrDatabase(String key) {
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String auctionsJson = ops.get(key);

        if (auctionsJson != null) {
            // Nếu có dữ liệu trong Redis, trả về dữ liệu từ Redis
            return auctionsJson;
        } else {
            // Nếu không có dữ liệu trong Redis, thực hiện hàm fn và lưu kết quả vào Redis
            List<Auction> auctions = auctionRepository.findAll();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                auctionsJson = objectMapper.writeValueAsString(auctions);
                ops.set(key, auctionsJson);
                return auctionsJson;
            } catch (JsonProcessingException e) {
                // Xử lý ngoại lệ nếu cần
            }
        }
        return null; // hoặc giá trị mặc định nếu cần
    }
}
