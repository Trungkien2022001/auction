package com.auction.auctionspringboot.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.ActionLog;
import com.auction.auctionspringboot.repository.LogRepository;
import com.auction.auctionspringboot.repository.specification.LogSpecifications;

@Service
public class LogService {
    
    @Autowired
    private LogRepository logRepository;

    public Page<ActionLog> findAll(Integer page, Integer limit, Integer userId, String userEmail, String path, Integer status, String content) throws Exception{
        if (page == null) {
            page = 1;
        }
        if(limit == null) {
            limit = 100;
        }
        PageRequest pageRequest = PageRequest.of(page - 1, limit);
        Page<ActionLog> pageLogs= logRepository.findAll(
            LogSpecifications.filterLogs(userEmail, userId, path, status, content),
            pageRequest);
        return pageLogs;
    }
}
