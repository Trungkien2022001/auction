package com.auction.auctionspringboot.interceptors;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class RequestCounterInterceptor implements HandlerInterceptor {
      private AtomicInteger requestCount = new AtomicInteger(0);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        requestCount.incrementAndGet();
        return true;
    }

    public int getRequestCount() {
        return requestCount.get();
    }
}
