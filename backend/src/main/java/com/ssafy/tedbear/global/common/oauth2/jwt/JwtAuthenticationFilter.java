package com.ssafy.tedbear.global.common.oauth2.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.tedbear.global.common.oauth2.CookieUtils;
import com.ssafy.tedbear.global.common.oauth2.service.AuthService;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtProvider jwtProvider;
	private final AuthService authService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		log.info("request method: {}", request.getMethod());
		log.info("jwt filter");
		String token = parseBearerToken(request);

		try {
			if (StringUtils.hasText(token) && jwtProvider.validateToken(token)) { // 토큰이 있고 유효하다면
				log.info("들어온 access-token: " + token);
				Authentication authentication = jwtProvider.getAuthentication(token);
				SecurityContextHolder.getContext().setAuthentication(authentication); // 인증정보를 authentication에 넣는다.

				log.info("{}의 인증정보 저장", authentication.getName());
			} else if (StringUtils.hasText(token)) {
				try {
					// refreshToken 가져온다.
					String refreshToken = CookieUtils.getCookie(request, "refresh")
						.orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
						.getValue();
					log.info("refreshToken: {}", refreshToken);

					// 새 accessToken을 가져온다.
					String newAccessToken = authService.reissueAccessToken(token, refreshToken);
					// 새 access token을 헤더에 추가한다.
					response.addHeader("Authorization", "Bearer " + newAccessToken);
				} catch (Exception e) {
					log.info("refresh token이 유효하지 않습니다.");
				}
			} else {
				log.info("유효한 JWT 토큰이 없습니다.");
			}
		} catch (ExpiredJwtException e) {
			request.setAttribute("exception", JwtExceptionCode.EXPIRE.name());
		}

		filterChain.doFilter(request, response);
	}

	private String parseBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring((7));
		}

		return null;
	}
}
