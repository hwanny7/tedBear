package com.ssafy.tedbear.global.common.oauth2.service;

import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@Component
public class AuthService {

	private final MemberRepository memberRepository;
	private final JwtProvider jwtProvider;


	public String reissueAccessToken(String oldAccessToken, String refreshToken) {
		if (!jwtProvider.validateToken(refreshToken)) {
			throw new RuntimeException("invalid refresh token");
		}

		Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);
		String uid = ((CustomOAuth2User)authentication.getPrincipal()).getUid();

		log.info("access token reissue 대상: {}", uid);

		Member member = memberRepository.findByUid(uid)
			.orElseThrow(() -> new RuntimeException("Not found user"));

		// refresh토큰이 같지 않으면
		if (!refreshToken.equals(member.getRefreshToken())) {
			throw new RuntimeException("invalid refresh token");
		}

		return jwtProvider.createAccessToken(authentication);
	}

}
