package com.ssafy.tedbear.domain.sentence.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

@Getter
public class SentenceProblem {
	String content;
	String mean;
	int score;

	public SentenceProblem(Sentence sentence) {
		this.content = sentence.getContent();
		this.mean = sentence.getTranslation();
		this.score = (sentence.getScore() / 10000 - 1) * 358;
	}
}
