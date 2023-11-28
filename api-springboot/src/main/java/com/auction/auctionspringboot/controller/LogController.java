package com.auction.auctionspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.service.LogService;
import com.auction.auctionspringboot.utils.PagingHelper;
import com.auction.auctionspringboot.converter.dto.PaginationDto;
import com.auction.auctionspringboot.converter.dto.ResponseDto;
import com.auction.auctionspringboot.converter.dto.ResponseWithPaginationDto;
import com.auction.auctionspringboot.model.ActionLog;
import com.auction.auctionspringboot.model.User;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Log", description = "Log Management APIs")
@RequestMapping("/api/v1/log")
public class LogController {

    @Autowired
    private LogService logService;
    @GetMapping()
    public ResponseEntity<?> getAll(){
        ResponseWithPaginationDto<List<ActionLog>> resp;
        try {
            Page<ActionLog> logsPages = logService.findAll();
            List<ActionLog> logs = logsPages.getContent();
            PaginationDto paging = PagingHelper.buildPaging(logsPages);
            resp = new ResponseWithPaginationDto<List<ActionLog>>(logs, paging);
            return new ResponseEntity<>(resp, HttpStatus.OK);
            
        } catch (Exception e) {
            resp = new ResponseWithPaginationDto<List<ActionLog>>(
                    false,
                    400,
                    e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
    }
}
