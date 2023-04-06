package com.ssafy.tedbear.domain.sentence.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

@Getter
public class SentenceDetailDto {
	Long no;
	int score;
	int startTime;
	int endTime;
	String content;
	boolean bookmarked;
	String watchId;

	Double gunningFog;

	Double fleschReadingEase;

	Double fleschKincaidGradeLevel;

	//원본 비디오 영상 링크

	public SentenceDetailDto(Sentence sentence) {
		this.no = sentence.getNo();
		this.score = sentence.getScore() == 0 ? 10 : (sentence.getScore() - 1) / 10000;
		this.startTime = sentence.getStartTime();
		this.endTime = sentence.getEndTime();
		this.content = sentence.getContent();
		this.watchId = sentence.getVideo().getWatchId();
		this.bookmarked = sentence.isBookmarked();
		this.gunningFog = sentence.getGunningFog();
		this.fleschReadingEase = sentence.getFleschReadingEase();
		this.fleschKincaidGradeLevel = sentence.getFleschKincaidGradeLevel();
	}

	@Getter
	public static class ListResponse {
		List<SentenceDetailDto> sentenceList;

		public ListResponse(List<Sentence> list) {
			this.sentenceList = list.stream().map((SentenceDetailDto::new)).collect(Collectors.toList());
		}
	}

	public static List<String> ContentListResponse(List<Sentence> list) {
		return list.stream().map(Sentence::getContent).collect(Collectors.toList());
	}
}
