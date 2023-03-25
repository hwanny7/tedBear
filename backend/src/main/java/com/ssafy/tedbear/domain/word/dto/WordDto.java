package com.ssafy.tedbear.domain.word.dto;

import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class WordDto {

	@Getter
	@Setter
	public static class Request{
		String query;
	}

	@Builder
	@Getter
	public static class SearchWord{
		boolean bookMarked;
		String mean;
	}

	@Builder
	@Getter
	public static class WordSearchResponse{
		SearchWord wordInfo;
		SentenceDetailDto.ContentListResponse sentenceContentList;
	}
}
