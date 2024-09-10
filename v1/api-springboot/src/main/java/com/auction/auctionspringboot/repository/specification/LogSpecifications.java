package com.auction.auctionspringboot.repository.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.auction.auctionspringboot.model.ActionLog;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class LogSpecifications {
    public static Specification<ActionLog> filterLogs(String userEmail, Integer userId, String path,
            Integer status, String content) {
        return (Root<ActionLog> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (path != null && !path.isEmpty()) {
                predicates.add(cb.like(root.get("path"), "%" + path + "%"));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (userEmail != null) {
                predicates.add(cb.equal(root.get("user"), userEmail));
            }

            if (content != null && !content.isEmpty()) {
                predicates.add(cb.or(
                        cb.like(root.get("request"), "%" + content + "%"),
                        cb.like(root.get("response"), "%" + content + "%")));
            }

            if (!predicates.isEmpty()) {
                query.where(predicates.toArray(new Predicate[0]));
            }

            return query.getRestriction();
        };
    }
}
