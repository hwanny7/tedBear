package com.ssafy.tedbear.global.common.oauth2;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Slf4j
public class CookieUtils {

	public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
		log.info("들어온 request: {}", request);
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					return Optional.of(cookie);
				}
			}
		}
		log.warn("refresh token이 cookie에 없음");
		return Optional.empty();
	}
}
