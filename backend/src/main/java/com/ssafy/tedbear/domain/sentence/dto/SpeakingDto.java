package com.ssafy.tedbear.domain.sentence.dto;

import lombok.Getter;
import lombok.Setter;

public class SpeakingDto {
	@Getter
	@Setter
	public static class Request {
		private boolean matchStatus;
		private Long sentenceNo;

	}

}
