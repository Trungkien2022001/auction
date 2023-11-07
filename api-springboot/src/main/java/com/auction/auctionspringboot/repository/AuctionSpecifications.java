package com.auction.auctionspringboot.repository;

import org.springframework.data.jpa.domain.Specification;

import com.auction.auctionspringboot.constant.ProductCategory;
import com.auction.auctionspringboot.model.Auction;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;

public class AuctionSpecifications {
    public static Specification<Auction> filterAuctions(String sort, String sortPrice,
            Integer sellerId, String name, String type, Long priceFrom, Long priceTo, String category) {
        // CriteriaQuery<Product> criteriaQuery =
        // getEntityManager().getCriteriaBuilder().createQuery(Product.class);
        return (Root<Auction> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if ("homepage".equals(type)) {
                predicates.add(cb.isNull(root.get("deletedAt")));
            }
            if (name != null) {
                predicates.add(cb.like(root.get("product").get("name"), "%" + name + "%"));
            }
            if (sellerId != null) {
                predicates.add(cb.equal(root.get("sellerId"), sellerId));
            }
            if (!category.equals("all") ){
                predicates.add(cb.equal(root.get("product").get("category_id"), ProductCategory.get(category)));
            }
            switch (sort) {
                case "featured":
                case "cheapest":
                case "expensive":
                case "latest":
                    predicates.add(cb.equal(root.get("status"), 2));
                    break;
                case "incoming":
                    predicates.add(cb.equal(root.get("status"), 1));
                    break;
                default:
                    break;
            }
            // switch (sorted) {
            // case 'featured':
            // case 'cheapest':
            // case 'latest':
            // case 'expensive':
            // this.where('a.status', 2)
            // break
            // case 'incoming':
            // this.where('a.status', 1)
            // break
            // default:
            // break
            // }

            // predicates.add(cb.between(root.get("product").get("start_price"), priceFrom,
            // priceTo));
            predicates.add(cb.greaterThanOrEqualTo(root.get("sellPrice").as(Double.class), priceFrom.doubleValue()));
            predicates.add(cb.lessThanOrEqualTo(root.get("sellPrice").as(Double.class), priceTo.doubleValue()));

            // Tương tự, thêm các điều kiện khác tương ứng

            query.where(predicates.toArray(new Predicate[0]));

            switch (sort) {
                case "featured":
                    query.orderBy(cb.desc(root.get("auctionCount")));
                    break;
                case "cheapest":
                    query.orderBy(cb.asc(root.get("sellPrice")));
                    break;
                case "expensive":
                    query.orderBy(cb.desc(root.get("sellPrice")));
                    break;
                case "incoming":
                case "latest":
                    query.orderBy(cb.desc(root.get("startTime")));
                    break;
                default:
                    // Logic mặc định
                    break;
            }
            return query.getRestriction();
        };
    }
}
