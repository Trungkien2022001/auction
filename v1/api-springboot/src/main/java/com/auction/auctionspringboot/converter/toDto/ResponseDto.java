package com.auction.auctionspringboot.converter.toDto;

public class ResponseDto<T> {
    private boolean success;
    private int statusCode;
    private String message;
    private T data;

    public ResponseDto(boolean success, int statusCode, String message, T data) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public ResponseDto(boolean success, T data) {
        this.success = success;
        this.statusCode = 200;
        this.message = "Success";
        this.data = data;
    }

    public ResponseDto(boolean success, int statusCode, String message) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
    }

    public ResponseDto(T data) {
        this.success = true;
        this.statusCode = 200;
        this.message = "Success";
        this.data = data;
    }

    public ResponseDto(int statusCode, T data) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = "Success";
        this.data = data;
    }

    public ResponseDto(int statusCode, String message) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

