package com.auction.auctionspringboot.utils;

import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.auction.auctionspringboot.model.ActionLog;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.core.instrument.util.IOUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Aspect
@Component
public class RecordLogAspect {
    @Pointcut("@annotation(com.auction.auctionspringboot.annotation.SaveLog)")
    public void saveLogPointcut() {

    }

    @AfterReturning(pointcut = "saveLogPointcut()", returning = "result")
    public void recordLog(JoinPoint joinPoint, Object result) throws Throwable {
        // Lấy thông tin từ joinPoint và ghi log theo mô hình của bạn
        // Ví dụ: ghi log vào ActionLog
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getResponse();
        ActionLog actionLog = new ActionLog();
        actionLog.setPath(getPath());
        actionLog.setMatchedRoute(getMatchedRoute(request));
        actionLog.setClientIp(getClientIP(request));
        actionLog.setServerPort(getServerPort(request));
        actionLog.setMethod(getMethod(request));
        actionLog.setStatus(getStatus(response));
        // Thêm các thông tin khác từ joinPoint vào actionLog

        // Ghi log request, response, error, status, v.v.
        // Đoạn mã để ghi log request và response có thể sử dụng ObjectMapper để chuyển
        // đổi thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        Object requestBody = getRequestBody(request);
        Object queryObj = getRequestParameters(request);
        Object requestObj = new RequestWrap(requestBody, queryObj);
        try {
            actionLog.setRequest(objectMapper.writeValueAsString(requestObj));
            actionLog.setResponse(objectMapper.writeValueAsString(result));
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(actionLog);
        // Lưu actionLog vào cơ sở dữ liệu hoặc làm bất kỳ xử lý logging nào khác
    }

    private String getPath() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        return request.getServletPath();
    }

    private String getMatchedRoute(HttpServletRequest request) {
        return request.getRequestURI();
    }

    private String getMethod(HttpServletRequest request) {
        return request.getMethod();
    }

    private int getStatus(HttpServletResponse response) {
        return response.getStatus();
    }

    private String getServerPort(HttpServletRequest request) {
        return String.valueOf(request.getServerPort());
    }

    private String getRequestBody(HttpServletRequest request) throws IOException {
        // Đọc InputStream từ body của request
        try {
            String body = IOUtils.toString(request.getInputStream(), StandardCharsets.UTF_8);
            return body;
        } catch (IOException e) {
            throw new IOException("Error reading request body", e);
        }
    }

    private String getClientIP(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    private Map<String, String[]> getRequestParameters(HttpServletRequest request) {
        return request.getParameterMap();
    }
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class RequestWrap {
    private Object body;
    private Object query;
}