package com.auction.auctionspringboot.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;

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

    public String get(String key){
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String cached = ops.get(key);
        return cached;
    }

    public <T> R cachedExecute(String key, long ttlInSeconds, boolean json, Function<T, R> fn) throws Exception {
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String cached = ops.get(key);

        R toReturned = null;
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new Jdk8Module());
        if (cached == null) {
            R val = fn.apply(null);
            String valString;
            try {
                valString = objectMapper.writeValueAsString(val);
                ops.set(key, valString);
                stringRedisTemplate.expire(key, ttlInSeconds, TimeUnit.SECONDS);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            return val;
        }
        if (json == true) {
            try {
                toReturned = objectMapper.readValue(cached, new TypeReference<R>() {});
                return (R) toReturned;
            } catch (JsonMappingException e) {
                e.printStackTrace();
                return null;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        } else {
            return null;
        }

    }

    public Boolean destroy(String key) {
        return stringRedisTemplate.delete(key);
    }

    public <T> void setExpired(String key, T value, int tll) {
        stringRedisTemplate.expire(key, tll, TimeUnit.SECONDS);
    }

    public <T> void setValueWithExpired(String key, T value, Boolean json, int tll) {
        stringRedisTemplate.expire(key, tll, TimeUnit.SECONDS);
    }

}
