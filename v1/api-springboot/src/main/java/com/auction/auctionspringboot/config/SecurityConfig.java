package com.auction.auctionspringboot.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.auction.auctionspringboot.security.JwtAuthenticationFilter;
import com.auction.auctionspringboot.utils.Log;

import static com.auction.auctionspringboot.constant.Permission.ADMIN_CREATE;
import static com.auction.auctionspringboot.constant.Permission.ADMIN_DELETE;
import static com.auction.auctionspringboot.constant.Permission.ADMIN_READ;
import static com.auction.auctionspringboot.constant.Permission.ADMIN_UPDATE;
import static com.auction.auctionspringboot.constant.Permission.MANAGER_CREATE;
import static com.auction.auctionspringboot.constant.Permission.MANAGER_DELETE;
import static com.auction.auctionspringboot.constant.Permission.MANAGER_READ;
import static com.auction.auctionspringboot.constant.Permission.MANAGER_UPDATE;
import static com.auction.auctionspringboot.constant.RoleType.ADMIN;
import static com.auction.auctionspringboot.constant.RoleType.MANAGER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

        private static final String[] WHITE_LIST_URL = {
                        "/api/v1/auth/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/api/v1/auction/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/public/**",
                        "/actuator/**",
                        "/**",
                        "/webjars/**",
                        "/swagger-ui.html"
        };
        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        // private final LogoutHandler logoutHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                Log.info("Init SecurityFilterChain", SecurityConfig.class);
                http
                        .csrf(AbstractHttpConfigurer::disable)
                        // .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                        // .cors(cors -> cors.disable())
                        .authorizeHttpRequests(
                                req -> req.requestMatchers(WHITE_LIST_URL)
                                        .permitAll()
                                        .requestMatchers("/api/v1/management/**")
                                        .hasAnyRole(ADMIN.name(), MANAGER.name())
                                        .requestMatchers(GET, "/api/v1/management/**")
                                        .hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
                                        .requestMatchers(POST, "/api/v1/management/**")
                                        .hasAnyAuthority(ADMIN_CREATE.name(),
                                                        MANAGER_CREATE.name())
                                        .requestMatchers(PUT, "/api/v1/management/**")
                                        .hasAnyAuthority(ADMIN_UPDATE.name(),
                                                        MANAGER_UPDATE.name())
                                        .requestMatchers(DELETE, "/api/v1/management/**")
                                        .hasAnyAuthority(ADMIN_DELETE.name(),
                                                        MANAGER_DELETE.name())
                                        .anyRequest()
                                        .authenticated())
                        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                        .authenticationProvider(authenticationProvider)
                        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Thêm các origins cần cho
                                                                                         // phép
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                configuration.setAllowCredentials(true);
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
