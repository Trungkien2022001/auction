package com.auction.auctionspringboot.utils;

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

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class RecordLogAspect {
    @Pointcut("@annotation(com.auction.auctionspringboot.annotation.SaveLog)")
    public void saveLogPointcut() {
    }

    @AfterReturning(pointcut = "saveLogPointcut()", returning = "result")
    public void recordLog(JoinPoint joinPoint, Object result) {
        // Lấy thông tin từ joinPoint và ghi log theo mô hình của bạn
        // Ví dụ: ghi log vào ActionLog
        ActionLog actionLog = new ActionLog();
        actionLog.setPath(getPath());
        actionLog.setMatchedRoute(getMatchedRoute());
        // Thêm các thông tin khác từ joinPoint vào actionLog

        // Ghi log request, response, error, status, v.v.
        // Đoạn mã để ghi log request và response có thể sử dụng ObjectMapper để chuyển
        // đổi thành JSON
        ObjectMapper objectMapper = new ObjectMapper();
        // try {
        //     // actionLog.setRequest(objectMapper.writeValueAsString(getRequest()));
        //     // actionLog.setResponse(objectMapper.writeValueAsString(result));
        // } catch (JsonProcessingException e) {
        //     System.out.println(e.getMessage());
        //     // Xử lý exception nếu cần thiết
        // }
        System.out.println(actionLog);
        // Lưu actionLog vào cơ sở dữ liệu hoặc làm bất kỳ xử lý logging nào khác
    }

    private String getPath() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();
        return request.getRequestURI();
    }

    private String getMatchedRoute() {
        // Lấy thông tin route khớp từ HttpServletRequest (nếu cần)
        // Ví dụ: return request.getAttribute("matchedRoute").toString();
        return "Test";
    }

    private HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }
}
