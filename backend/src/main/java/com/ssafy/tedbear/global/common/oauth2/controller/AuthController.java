package com.ssafy.tedbear.global.common.oauth2.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.global.common.oauth2.CookieUtils;
import com.ssafy.tedbear.global.common.oauth2.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final AuthService authService;

	/***
	 * refresh 토큰 확인해서 access 토큰 재발급
	 * @param request
	 * @param oldAccessToken
	 * @return
	 */
	@GetMapping
	public String reissueAccessToken(HttpServletRequest request,
		@RequestHeader("Authorization") String oldAccessToken) {
		oldAccessToken = oldAccessToken.substring(7);
		log.info("oldAccessToken: {}", oldAccessToken);
		String refreshToken = CookieUtils.getCookie(request, "refresh")
			.orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
			.getValue();
		log.info("refreshToken: {}", refreshToken);

		String newAccessToken = authService.reissueAccessToken(oldAccessToken, refreshToken);
		log.info("newAccessToken: {}", newAccessToken);

		return newAccessToken;
	}
}
