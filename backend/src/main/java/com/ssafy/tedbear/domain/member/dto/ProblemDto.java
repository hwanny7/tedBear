package com.ssafy.tedbear.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

public class ProblemDto {
	@Getter
	@Setter
	public static class Request {
		int testResult;
	}
}
