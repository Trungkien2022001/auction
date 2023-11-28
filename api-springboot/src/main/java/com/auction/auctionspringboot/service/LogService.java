package com.auction.auctionspringboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.auction.auctionspringboot.model.ActionLog;
import com.auction.auctionspringboot.repository.LogRepository;

@Service
public class LogService {
    
    @Autowired
    private LogRepository logRepository;

    public Page<ActionLog> findAll() throws Exception{
        PageRequest pageRequest = PageRequest.of(1, 20);
        Page<ActionLog> pageLogs= logRepository.findAll(pageRequest);
        // List<ActionLog> logs = pageLogs.getContent();
        return pageLogs;
    }
}
