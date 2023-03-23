package com.ssafy.tedbear.global.common.oauth2;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	/** CORS 설정 */
	// 1시간
	private final long MAX_AGE_SECS = 3600;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
			.addMapping("/**")
			.allowedOrigins("localhost", "3.36.50.141") // 외부에서 들어오는 허용 url
			.allowedMethods("GET", "POST") // 허용되는 메서드
			.allowedHeaders("*") // 모든 헤더 허용
			.allowCredentials(true) // 자격 증명 허용
			.maxAge(MAX_AGE_SECS); // 허용 시간
	}
}
