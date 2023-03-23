package com.ssafy.tedbear.global.common.oauth2;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ssafy.tedbear.global.common.oauth2.jwt.JwtAccessDeniedHandler;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtAuthenticationFilter;
import com.ssafy.tedbear.global.common.oauth2.jwt.JwtProvider;
import com.ssafy.tedbear.global.common.oauth2.service.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final CorsFilterConfig corsFilterConfig;

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new OAuth2LoginSuccessHandler(userRepository, jwtProvider);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// http.csrf().disable()
		// 	.oauth2Login() // oauth 로그인
		// 	.userInfoEndpoint() // 로그인된 유저 정보 가져오기
		// 	.userService(customOAuth2UserService); // 가져온 유저 정보를 해당 객체가 처리
		http.csrf().disable()
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.formLogin().disable();
		http.authorizeHttpRequests()
			// 그외 모든 요청은 허용
			.anyRequest().permitAll()
			.and()
			.logout()
			.logoutSuccessUrl("/")
			.and()
			.oauth2Login()
			.authorizationEndpoint()
			.baseUri("/oauth")

			.and()
			.redirectionEndpoint()
			.baseUri("/users")

			.and()
			.successHandler(authenticationSuccessHandler()) // 로그인 성공 시 token 만듦
			.userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정을 저장
			.userService(customOAuth2UserService); // OAuth2 로그인 성공 시, 후작업을 진행할 UserService 인터페이스 구현체 등록
		// jwt 사용을 위해 session 해제
		// http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// jwt 필터 추가
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		// jwt 인증 실패 시 exception handler 등록
		http.exceptionHandling()
			.accessDeniedHandler(jwtAccessDeniedHandler)
			.authenticationEntryPoint(jwtAuthenticationEntryPoint);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.addAllowedOrigin("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
