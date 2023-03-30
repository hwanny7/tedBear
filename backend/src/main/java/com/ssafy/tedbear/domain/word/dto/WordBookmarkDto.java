package com.ssafy.tedbear.domain.word.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;

import lombok.Builder;
import lombok.Getter;

@Getter
public class WordBookmarkDto {
	Long wordNo;

	public WordBookmark toEntity(Member member) {
		Word word = word();
		return WordBookmark.builder().word(word).member(member).createdDate(LocalDateTime.now()).build();
	}

	public Word word() {
		return Word.builder().no(this.wordNo).build();
	}

	@Getter
	public static class WordBookmarkListResponse {
		List<WordList> wordBookmarkList;

		public WordBookmarkListResponse(List<WordList> wordBookmarkList) {
			this.wordBookmarkList = wordBookmarkList;
		}
	}

	@Builder
	@Getter
	public static class WordDetail {
		Long wordNo;
		String content;
		String mean;
	}

	@Builder
	@Getter
	public static class WordList {
		WordDetail wordInfo;
		List<String> sentenceContentList;
	}

}