package com.ssafy.tedbear.domain.sentence.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

@Getter
public class SentenceProblemDto {
	String content;
	String mean;
	int score;

	public SentenceProblemDto(Sentence sentence) {
		this.content = sentence.getContent();
		this.mean = sentence.getTranslation();
		this.score = (sentence.getScore() / 10000 - 1) * 358;
	}
}
