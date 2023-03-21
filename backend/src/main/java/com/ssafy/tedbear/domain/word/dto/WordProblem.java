package com.ssafy.tedbear.domain.word.dto;

import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Getter;

@Getter
public class WordProblem {
	String content;
	String mean;
	int score;

	public WordProblem(Word word) {
		this.content = word.getContent();
		this.mean = word.getMean();
		this.score = word.getScore();
	}
}
