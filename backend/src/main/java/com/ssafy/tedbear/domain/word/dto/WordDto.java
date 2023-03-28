package com.ssafy.tedbear.domain.word.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class WordDto {

	@Getter
	@Setter
	public static class Request {
		String query;
	}

	@Builder
	@Getter
	public static class SearchWord {
		Long wordNo;
		boolean bookMarked;
		String mean;
	}

	@Builder
	@Getter
	public static class WordSearchResponse {
		SearchWord wordInfo;
		List<String> sentenceContentList;
	}
}
