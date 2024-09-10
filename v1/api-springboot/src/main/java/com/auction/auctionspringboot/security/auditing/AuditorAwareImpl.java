package com.auction.auctionspringboot.security.auditing;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import com.auction.auctionspringboot.model.User;

public class AuditorAwareImpl implements AuditorAware<User> {

	private Optional<User> auditor = Optional.empty();
	public void setAuditor(User auditor) {
		this.auditor = Optional.of(auditor);
	}

	public Optional<User> getCurrentAuditor() {
		return auditor;
	}
}
