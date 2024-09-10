package com.auction.auctionspringboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auction.auctionspringboot.service.LogService;
import com.auction.auctionspringboot.utils.PagingHelper;
import com.auction.auctionspringboot.converter.toDto.PaginationDto;
import com.auction.auctionspringboot.converter.toDto.ResponseWithPaginationDto;
import com.auction.auctionspringboot.model.ActionLog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Log", description = "Log Management APIs")
@RequestMapping("/api/v1/log")
public class LogController {

    @Autowired
    private LogService logService;

    @GetMapping()
    @Operation(summary = "Get All Logs", tags = {"Log"})
     @ApiResponses({
            @ApiResponse(responseCode = "200", content = {
                    @Content(schema = @Schema(implementation = ActionLog.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", content = { @Content(schema = @Schema()) }) })
    public ResponseEntity<?> getAll(
        @RequestParam(name = "page", required = false) Integer page,
        @RequestParam(name = "limit", required = false) Integer limit,
        @RequestParam(name = "user_id", required = false) Integer userId,
        @RequestParam(name = "user_email", required = false) String userEmail,
        @RequestParam(name = "path", required = false) String path,
        @RequestParam(name = "status", required = false) Integer status,
        @RequestParam(name = "content", required = false) String content
    ){
        ResponseWithPaginationDto<List<ActionLog>> resp;
        try {
            Page<ActionLog> logsPages = logService.findAll(page, limit, userId, userEmail, path, status, content);
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
