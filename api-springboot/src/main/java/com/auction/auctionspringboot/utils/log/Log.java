package com.auction.auctionspringboot.utils.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Log {
    private static final Logger LOGGER = LoggerFactory.getLogger(Log.class);

    public static void info(String message) {
        LOGGER.info(message);
    }

    public static void error(String message, Throwable throwable) {
        LOGGER.error(message, throwable);
    }

    public static void trace(String message, Throwable throwable) {
        LOGGER.trace(message, throwable);
    }

    public static void warn(String message, Throwable throwable) {
        LOGGER.warn(message, throwable);
    }

    public static void debug(String message, Throwable throwable) {
        LOGGER.debug(message, throwable);
    }

    public static void info(String message, Class<?> clazz) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.info(message);
    }

    public static void error(String message, Class<?> clazz) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.error(message);
    }

    public static void trace(String message, Class<?> clazz) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.trace(message);
    }

    public static void warn(String message, Class<?> clazz) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.warn(message);
    }

    public static void debug(String message, Class<?> clazz) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.debug(message);
    }

}
