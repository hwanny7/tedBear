package com.ssafy.tedbear.global.common.oauth2.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;
import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;
import com.ssafy.tedbear.global.common.oauth2.KakaoOAuth2User;
import com.ssafy.tedbear.global.common.oauth2.MemberLevelRepository;
import com.ssafy.tedbear.global.common.oauth2.UserRepository;
import com.ssafy.tedbear.global.common.oauth2.exception.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	private final MemberRepository memberRepository;

	private final UserRepository userRepository;
	private final MemberLevelRepository memberLevelRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		log.info("oauth provider: {}", registrationId);

		CustomOAuth2User customOAuth2User = new KakaoOAuth2User(
			oAuth2User.getAttributes(),
			Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
			String.valueOf(oAuth2User.getAttributes().get("id"))
		);

		Member user = saveOrUpdate(customOAuth2User);
		log.info("oauth login success - user : {}", user);

		return customOAuth2User;
	}

	private Member saveOrUpdate(CustomOAuth2User oAuth2User) {
		MemberLevel memberLevel = MemberLevel.builder().levelExp(1).build();
		Member member = memberRepository.findByUid(oAuth2User.getUid())
			.map(entity -> entity.update(oAuth2User.getNickname()))
			.orElse(oAuth2User.toEntity(oAuth2User.getNickname(), memberLevel));

		memberLevelRepository.save(memberLevel);
		return memberRepository.save(member);
	}
}
