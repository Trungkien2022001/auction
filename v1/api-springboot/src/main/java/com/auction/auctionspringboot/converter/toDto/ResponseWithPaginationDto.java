package com.auction.auctionspringboot.converter.toDto;

import lombok.Data;

@Data
public class ResponseWithPaginationDto<T> {
    private boolean success;
    private int statusCode;
    private String message;
    private PaginationDto paging;
    private T data;

    public ResponseWithPaginationDto(boolean success, int statusCode, String message, T data, PaginationDto paging) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.paging = paging;
        this.data = data;
    }

    public ResponseWithPaginationDto(boolean success, T data, PaginationDto paging) {
        this.success = success;
        this.statusCode = 200;
        this.message = "Success";
        this.paging = paging;
        this.data = data;
    }

    public ResponseWithPaginationDto(boolean success, int statusCode, String message, PaginationDto paging) {
        this.success = success;
        this.statusCode = statusCode;
        this.paging = paging;
        this.message = message;
    }

    public ResponseWithPaginationDto(boolean success, int statusCode, String message) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }

    public ResponseWithPaginationDto(T data, PaginationDto paging) {
        this.success = true;
        this.statusCode = 200;
        this.message = "Success";
        this.paging = paging;
        this.data = data;
    }

    public ResponseWithPaginationDto(int statusCode, T data, PaginationDto paging) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = "Success";
        this.paging = paging;
        this.data = data;
    }

    public ResponseWithPaginationDto(int statusCode, String message, PaginationDto paging) {
        this.success = true;
        this.statusCode = statusCode;
        this.paging = paging;
        this.message = message;
    }

}
