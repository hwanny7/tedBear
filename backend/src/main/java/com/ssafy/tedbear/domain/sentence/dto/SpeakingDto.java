package com.ssafy.tedbear.domain.sentence.dto;

import lombok.Getter;

public class SpeakingDto {
	@Getter
	public static class Request {
		private boolean matchStatus;
		private Long sentenceNo;

	}

}
