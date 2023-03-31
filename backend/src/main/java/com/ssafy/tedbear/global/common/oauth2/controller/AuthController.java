package com.ssafy.tedbear.global.common.oauth2.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.global.common.oauth2.CookieUtils;
import com.ssafy.tedbear.global.common.oauth2.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api/reissue")
public class AuthController {

	private final AuthService authService;

	@GetMapping
	public ResponseEntity<String> reissueAccessToken(
		HttpServletRequest request,
		@RequestHeader("Authorization") String oldAccessToken) {
		oldAccessToken = oldAccessToken.substring(7);
		log.info("oldAccessToken: {}", oldAccessToken);

		// refresh-token 가져오기
		String refreshToken = CookieUtils.getCookie(request, "refreshToken")
			.orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
			.getValue();
		log.info("refreshToken: {}", refreshToken);

		String newAccessToken = authService.reissueAccessToken(oldAccessToken, refreshToken);
		if (newAccessToken == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", newAccessToken);

		return ResponseEntity.ok().headers(headers).body("success");
	}
}
