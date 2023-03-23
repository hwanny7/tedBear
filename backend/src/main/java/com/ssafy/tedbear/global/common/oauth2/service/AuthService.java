package com.ssafy.tedbear.global.common.oauth2.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;
import com.ssafy.tedbear.global.common.oauth2.User;
import com.ssafy.tedbear.global.common.oauth2.UserRepository;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	public String reissueAccessToken(String oldAccessToken, String refreshToken) {
		if (!jwtProvider.validateToken(refreshToken)) {
			throw new RuntimeException("invalid refresh token");
		}

		Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);
		String email = ((CustomOAuth2User)authentication.getPrincipal()).getEmail();

		log.info("access token reissue 대상: {}", email);

		User findUser = userRepository.findByEmail(email)
			.orElseThrow(() -> new RuntimeException("Not found user"));

		if (!refreshToken.equals(findUser.getRefreshToken())) {
			throw new RuntimeException("invalid refresh token");
		}

		return jwtProvider.createAccessToken(authentication);
	}
}
