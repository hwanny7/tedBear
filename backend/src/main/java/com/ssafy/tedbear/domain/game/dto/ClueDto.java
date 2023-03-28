package com.ssafy.tedbear.domain.game.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.entity.Word;

public class ClueDto {
	int clueIdx;
	int boardIdx;
	int length;
	String answer;
	String mean;
	WordGameDto.Hint shorts;
	String direction;

	ClueDto(Word word, Sentence sentence, int clueIdx, int boardIdx, String direction) {
		this.answer = word.getContent();
		this.mean = word.getMean();
		this.shorts = new WordGameDto.Hint(sentence);
		this.boardIdx = boardIdx;
		this.clueIdx = clueIdx;
		this.direction = direction;
	}
}
