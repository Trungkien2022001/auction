package com.auction.auctionspringboot.utils;

import org.springframework.data.domain.Page;

import com.auction.auctionspringboot.converter.dto.PaginationDto;

public class PagingHelper {
    public static <T> PaginationDto buildPaging(Page<T> data){
        PaginationDto paging = new PaginationDto();

        // paging.setPaged(data.getPageable().getPaged());
        paging.setPage_number(data.getNumber());
        paging.setPage_size(data.getSize());
        paging.setTotal_pages(data.getTotalPages());
        paging.setTotal_elements(data.getTotalElements());
        // paging.setFirst(data.getR());

        return paging;
    }
}
