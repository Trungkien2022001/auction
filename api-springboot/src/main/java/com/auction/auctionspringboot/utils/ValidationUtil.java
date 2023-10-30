package com.auction.auctionspringboot.utils;

import java.util.HashSet;
import java.util.Set;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class ValidationUtil {
     private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private static final Validator validator = factory.getValidator();

    public static <T> void validate(T object) throws Exception {
        Set<String> errors = new HashSet<>();

        Set<ConstraintViolation<T>> violations = validator.validate(object);
        for (ConstraintViolation<T> violation : violations) {
            errors.add(violation.getPropertyPath().toString() + " " + violation.getMessage());
        }

        if (!errors.isEmpty()) {
            throw new Exception(String.join(",", errors));
        }
    }
}
