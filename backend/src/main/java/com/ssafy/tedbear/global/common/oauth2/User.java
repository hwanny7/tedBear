package com.ssafy.tedbear.global.common.oauth2;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class User {

	@Id
	private Long id;
	private String email;
	private String nickname;
	private String refreshToken;

	public User() {
	}

	@Builder
	public User(Long id, String email, String nickname, String refreshToken) {
		this.id = id;
		this.email = email;
		this.nickname = nickname;
		this.refreshToken = refreshToken;
	}

	public static User of(CustomOAuth2User oAuth2User) {
		User user = new User();
		user.email = oAuth2User.getEmail();
		user.nickname = oAuth2User.getNickname();
		return user;
	}

	public void update(String email, String nickname) {
		this.email = email;
		this.nickname = nickname;
	}

	public void updateRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
}
