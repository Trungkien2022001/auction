package com.auction.auctionspringboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("ngrok-skip-browser-warning","*");
                // .exposedHeaders("Access-Control-Allow-Origin");;
                // .allowCredentials(true);
    }
}
// public class WebConfig {

    
// }
