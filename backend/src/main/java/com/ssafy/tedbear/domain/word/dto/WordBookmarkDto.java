package com.ssafy.tedbear.domain.word.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import com.ssafy.tedbear.domain.word.entity.WordSentence;

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

	@Getter
	public static class WordList {
		WordDetail wordInfo;
		List<String> sentenceContentList;

		public WordList(WordDetail wordInfo, List<WordSentence> wordSenteceList) {
			this.wordInfo = wordInfo;
			this.sentenceContentList = wordSenteceList.stream()
				.map(ws -> ws.getSentence().getContent())
				.collect(Collectors.toList());

		}
	}

}