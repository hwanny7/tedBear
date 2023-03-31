package com.ssafy.tedbear.domain.sentence.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

@Getter
public class SentenceBookmarkDetailDto {
	Long no;
	String content;
	String translation;
	boolean bookmarked;
	int score;
	String watchId;
	int startTime;
	int endTime;

	public SentenceBookmarkDetailDto(Sentence sentence) {
		this.no = sentence.getNo();
		this.content = sentence.getContent();
		this.translation = sentence.getTranslation();
		this.bookmarked = true;
		this.score = sentence.getScore();
		this.watchId = sentence.getVideo().getWatchId();
		this.startTime = sentence.getStartTime();
		this.endTime = sentence.getEndTime();
	}

	@Getter
	public static class ListResponse {
		List<SentenceBookmarkDetailDto> sentenceList;

		public ListResponse(List<Sentence> list) {
			this.sentenceList = list.stream().map(SentenceBookmarkDetailDto::new).collect(Collectors.toList());
		}
	}
}
