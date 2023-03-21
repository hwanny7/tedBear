package com.ssafy.tedbear.domain.sentence.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

@Getter
public class SentenceInfo {
	String content;
	String translation;
	int startTime;

	public SentenceInfo(Sentence sentence) {
		this.content = sentence.getContent();
		this.translation = sentence.getTranslation();
		this.startTime = sentence.getStartTime();
	}
}
