package com.auction.auctionspringboot.service;

import com.auction.auctionspringboot.model.Auction;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
public class CacheService<R> {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public <T> R cachedExecute(String key, long ttlInSeconds, boolean json, Function<T, R> fn) {
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String cached = ops.get(key);

        R toReturned = null;
        if (cached == null) {
            ObjectMapper objectMapper = new ObjectMapper();
            R val = fn.apply(null);
            String valString;
            try {
                valString = objectMapper.writeValueAsString(val);
                ops.set(key, valString);
                stringRedisTemplate.expire(key, ttlInSeconds, TimeUnit.SECONDS);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            return  val;
        } 
        if (json == true) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                toReturned = objectMapper.readValue(cached, new TypeReference<R>() {
                });
                return toReturned;
            } catch (JsonMappingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                 return null;
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                 return null;
            }
        } else {
            return null;
        }

    }

    public Boolean destroy(String key){
        return stringRedisTemplate.delete(key);
    }

    public <T> void setExpired(String key, T value, int tll){
        stringRedisTemplate.expire(key, tll, TimeUnit.SECONDS);
    }

    public <T> void setValueWithExpired(String key, T value, Boolean json, int tll){
        stringRedisTemplate.expire(key, tll, TimeUnit.SECONDS);
    }

}
