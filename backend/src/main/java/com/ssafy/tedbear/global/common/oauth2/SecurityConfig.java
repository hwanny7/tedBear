package com.ssafy.tedbear.global.common.oauth2;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ssafy.tedbear.domain.member.repository.MemberRepository;
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
	private final JwtProvider jwtProvider;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final MemberRepository memberRepository;
	private final MemberLevelRepository memberLevelRepository;
	private final MemberScoreRepository memberScoreRepository;

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new OAuth2LoginSuccessHandler(memberRepository, memberLevelRepository, memberScoreRepository,
			jwtProvider);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.httpBasic().disable()
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.csrf().disable()
			.formLogin().disable();
		http.anonymous().authenticationFilter(customAnonymousFilter());
		http.authorizeHttpRequests()
			.antMatchers(HttpMethod.OPTIONS, "/**/*")
			.permitAll() // options 메서드 열어두기! Authorization 헤더를 사용하기 때문에 Preflight 넣어줌

			.antMatchers(HttpMethod.GET) // GET요청은 열어두고
			.permitAll()
			.anyRequest().authenticated() // 그 외 요청은 권한확인
			.and()
			.logout()
			.logoutSuccessUrl("/")
			.and()
			.oauth2Login()
			.authorizationEndpoint()
			.baseUri("/oauth")

			.and()
			.redirectionEndpoint()
			.baseUri("/oauth2/callback/*")

			.and()
			.successHandler(authenticationSuccessHandler()) // 로그인 성공 시 token 만듦
			.userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정을 저장
			.userService(customOAuth2UserService); // OAuth2 로그인 성공 시, 후작업을 진행할 UserService 인터페이스 구현체 등록
		// jwt 사용을 위해 session 해제
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

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

		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
		configuration.setAllowCredentials(true); // 클라이언트 요청이 쿠키를 통해 자격 증명을 하는 경우 true

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	protected CustomAnonymousFilter customAnonymousFilter() throws Exception {
		return new CustomAnonymousFilter();
	}

	public static class CustomAnonymousFilter extends AnonymousAuthenticationFilter {
		private final Logger log = LoggerFactory.getLogger(getClass());

		public CustomAnonymousFilter() {
			super("ANONYMOUS_FILTER");
		}

		@Override
		public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {

			if (SecurityContextHolder.getContext().getAuthentication() == null) {
				Authentication authentication = createAuthentication((HttpServletRequest)req);

				SecurityContextHolder.getContext().setAuthentication(authentication);
				if (log.isDebugEnabled()) {
					log.debug("Anonymous user:{}", SecurityContextHolder.getContext().getAuthentication());
				}
			}

			chain.doFilter(req, res);
		}

		@Override
		protected Authentication createAuthentication(HttpServletRequest request) {
			List<? extends GrantedAuthority> authorities = Collections
				.unmodifiableList(Arrays.asList(new SimpleGrantedAuthority("ANONYMOUS_USER")));
			CustomOAuth2User principal = new CustomOAuth2User("253243", authorities);
			return new AnonymousAuthenticationToken("ANONYMOUS", principal, authorities);
		}
	}
}
