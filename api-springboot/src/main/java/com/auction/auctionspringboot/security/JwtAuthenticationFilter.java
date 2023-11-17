package com.auction.auctionspringboot.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final List<Pattern> whitelistPatterns = Arrays.asList(
      Pattern.compile("/api/v1/auth/.*"),
      Pattern.compile("/v2/api-docs.*"),
      Pattern.compile("/v3/api-docs.*"),
      Pattern.compile("/api/v1/auction/.*"),
      Pattern.compile("/swagger-resources.*"),
      Pattern.compile("/configuration/ui.*"),
      Pattern.compile("/configuration/security.*"),
      Pattern.compile("/swagger-ui/.*"),
      Pattern.compile("/public/.*"),
      Pattern.compile("/webjars.*"),
      Pattern.compile("/swagger-ui.html.*"));

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    
    String requestUri = request.getRequestURI();
    if (whitelistPatterns.stream().anyMatch(pattern -> pattern.matcher(requestUri).matches())) {
      response.addHeader("Access-Control-Allow-Origin", "*");
      // response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      response.setHeader("Access-Control-Allow-Headers", "*");
      filterChain.doFilter(request, response);
      return;
    }

    try {
      String jwt;
      final String userEmail;
      String authHeader = request.getHeader("Authorization");
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        jwt = request.getHeader("x-access-token");
        if (jwt == null) {
          filterChain.doFilter(request, response);
          return;
        }
      } else {
        jwt = authHeader.substring(7);
      }
      userEmail = jwtService.extractUsername(jwt);
      if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
        if (jwtService.isTokenValid(jwt, userDetails)) {
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
              userDetails,
              null,
              userDetails.getAuthorities());
          authToken.setDetails(
              new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      }
      response.setHeader("Access-Control-Allow-Origin", "*");
      // response.setHeader("Access-Control-Allow-Credentials", "true");
      response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      response.setHeader("Access-Control-Allow-Headers", "*");
      filterChain.doFilter(request, response);
    } catch (Exception e) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("Invalid token," + e.getMessage());
    }
  }
}
