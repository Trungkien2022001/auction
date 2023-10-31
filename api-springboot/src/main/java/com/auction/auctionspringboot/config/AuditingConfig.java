package com.auction.auctionspringboot.config;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.auction.auctionspringboot.auditing.AuditorAwareImpl;

@SpringBootApplication
@EnableJpaAuditing
@Configuration
class AuditingConfiguration {

	@Bean
	AuditorAwareImpl auditorAware() {
		return new AuditorAwareImpl();
	}
}