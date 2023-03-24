package com.ssafy.tedbear.global.common.oauth2;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;

import com.ssafy.tedbear.global.common.oauth2.service.AuthService;
import com.ssafy.tedbear.global.common.oauth2.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;
import com.ssafy.tedbear.domain.member.entity.MemberScore;
import com.ssafy.tedbear.domain.model.SnsType;

public class CustomOAuth2User implements OAuth2User {

	private Map<String, Object> attributes; // 받아온 정보가 담김
	private Collection<? extends GrantedAuthority> authorities;
	private String uid;
	private String email;
	private String nickname;

	public CustomOAuth2User(Map<String, Object> attributes, Collection<? extends GrantedAuthority> authorities,
		String uid) {
		this.attributes = attributes;
		this.authorities = authorities;
		this.uid = uid;
	}

	public CustomOAuth2User(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public String getUid() {
		return uid;
	}

	public String getNickname() {
		return nickname;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getName() {
		return getUid();
	}

	public Member toEntity(String nickname, MemberLevel memberLevel, MemberScore memberScore, String refreshToken) {
		Member member =  Member.builder()
			.uid(uid)
			.nickname(nickname)
			.snsType(SnsType.KAKAO)
			.memberLevel(memberLevel)
			.memberScore(memberScore)
			.refreshToken(refreshToken)
			.createdDate(LocalDateTime.now())
			.build();

		return member;
	}
}
