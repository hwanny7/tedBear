package com.ssafy.tedbear.global.common;

import lombok.Getter;
import lombok.Setter;

public class SearchDto {
	@Getter
	@Setter
	public static class Request {
		String query;
	}

}
