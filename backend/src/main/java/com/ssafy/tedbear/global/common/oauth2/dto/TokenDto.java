package com.ssafy.tedbear.global.common.oauth2.dto;

import lombok.Builder;
import lombok.Getter;

public class TokenDto {

	@Getter
	@Builder
	public static class Request {
		boolean result;
		String newAccessToken;
	}
}
