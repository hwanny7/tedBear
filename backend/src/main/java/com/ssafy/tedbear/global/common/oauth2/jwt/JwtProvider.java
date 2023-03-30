package com.ssafy.tedbear.global.common.oauth2.jwt;

import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtProvider {

	private final String SECRET_KEY;

	public static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L * 60 * 60; // 1분 (잠깐 1시간으로 변경)
	public static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 7; // 7일
	private final String AUTHORITIES_KEY = "role";

	public JwtProvider(@Value("${app.auth.token-secret}") String secretKey) {
		this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public String createAccessToken(Authentication authentication) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + ACCESS_TOKEN_VALIDATE_TIME);

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();

		String uid = oAuth2User.getUid();
		String role = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));

		return Jwts.builder()
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
			.setSubject(uid)
			.claim(AUTHORITIES_KEY, role)
			.setIssuer("issuer")
			.setIssuedAt(now)
			.setExpiration(validity)
			.compact();
	}

	public String createRefreshToken(Authentication authentication) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + REFRESH_TOKEN_VALIDATE_TIME);

		return Jwts.builder()
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
			.setIssuer("issuer")
			.setIssuedAt(now)
			.setExpiration(validity)
			.compact();
	}

	public Authentication getAuthentication(String accessToken) {
		Claims claims = parseClaims(accessToken);

		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new).collect(Collectors.toList());

		return new UsernamePasswordAuthenticationToken(new CustomOAuth2User(claims.getSubject()), "", authorities);
	}

	private Claims parseClaims(String accessToken) {
		try {
			return Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException e) {
			log.info("만료된 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			log.info("지원되지 않는 토큰입니다.");
		} catch (IllegalStateException e) {
			log.info("토큰이 잘못되었습니다.");
		}

		return false;
	}
}
