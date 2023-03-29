package com.ssafy.tedbear.global.common.oauth2.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
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
	private final MemberRepository memberRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		log.info("request method: {}", request.getMethod());
		log.info("jwt filter");
		String token = parseBearerToken(request);
		Authentication authentication = jwtProvider.getAuthentication(token);

		try {
			if (StringUtils.hasText(token) && jwtProvider.validateToken(token)) { // 토큰이 있고 유효하다면
				SecurityContextHolder.getContext().setAuthentication(authentication); // 인증정보를 authentication에 넣는다.

				log.info("{}의 인증정보 저장", authentication.getName());
			} else if (StringUtils.hasText(token)) {
				try {
					// refreshToken 가져온다.
					String refreshToken = CookieUtils.getCookie(request, "refresh")
						.orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
						.getValue();
					log.info("refreshToken: {}", refreshToken);

					// DB에 있는 refresh token과 같은지 확인
					DBRefreshToken(refreshToken, authentication.getName());

					// refresh token 만료 검사
					jwtProvider.validateToken(refreshToken);

					// 새 accessToken을 가져온다.
					String newAccessToken = authService.reissueAccessToken(token, refreshToken);
					// 새 access token을 헤더에 추가한다.
					response.addHeader("Authorization", "Bearer " + newAccessToken); // 여기 변경
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

	private void DBRefreshToken(String refreshToken, String uid){ // 받은 refresh token을 DB에 있는 토큰과 비교
		Member member = memberRepository.findByUid(uid).orElseThrow(() -> new IllegalArgumentException("refresh-token이 존재하지 않습니다."));
		if(!member.getRefreshToken().equals(refreshToken)){
			throw new IllegalArgumentException("refresh-token이 일치하지 않습니다."); // 로그인 페이지로 이동
		}
	}
}
