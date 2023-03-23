package com.ssafy.tedbear.global.common.oauth2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.global.common.oauth2.User;
import com.ssafy.tedbear.global.common.oauth2.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	String clientId;

	@Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
	String redirectUrl;
	private final UserRepository userRepository;

	@GetMapping("/test")
	public ResponseEntity<?> test(Authentication authentication) {
		return ResponseEntity.status(HttpStatus.OK).body(authentication.getPrincipal());
	}

	@GetMapping
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@PostMapping
	public void abc() {
		log.debug("인증이 필요한 서비스에 접근");
	}
}
