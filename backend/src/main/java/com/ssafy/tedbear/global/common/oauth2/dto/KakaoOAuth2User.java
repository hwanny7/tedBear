package com.ssafy.tedbear.global.common.oauth2.dto;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;

@Getter
public class KakaoOAuth2User extends CustomOAuth2User {

	private final Map<String, Object> account;
	private final Map<String, Object> profile;
	private final String uid;

	public KakaoOAuth2User(Map<String, Object> attributes, Collection<? extends GrantedAuthority> authorities,
		String uid) {
		super(attributes, authorities, uid);
		this.uid = uid;
		this.account = (Map<String, Object>)attributes.get("kakao_account");
		this.profile = (Map<String, Object>)account.get("profile");
	}

	@Override
	public String getEmail() {
		return (String)account.get("email");
	}

	@Override
	public String getNickname() {
		return (String)profile.get("nickname");
	}

	@Override
	public String getUid() {
		return this.uid;
	}
}
