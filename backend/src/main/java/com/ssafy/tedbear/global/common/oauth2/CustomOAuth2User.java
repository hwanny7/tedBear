package com.ssafy.tedbear.global.common.oauth2;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;
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

	public Member toEntity(String nickname, MemberLevel memberLevel) {
		return Member.builder()
			.uid(uid)
			.nickname(nickname)
			.snsType(SnsType.KAKAO)
			.memberLevel(memberLevel)
			.build();
	}
}
