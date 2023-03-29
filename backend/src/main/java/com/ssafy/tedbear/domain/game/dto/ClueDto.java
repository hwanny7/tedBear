package com.ssafy.tedbear.domain.game.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClueDto {
	int clueIdx;
	int boardIdx;
	int length;
	String answer;
	String mean;
	WordGameDto.Hint shorts;
	String direction;

	public ClueDto(Word word, Sentence sentence, int clueIdx, int boardIdx, String direction) {
		this.answer = word.getContent();
		this.mean = word.getMean();
		this.shorts = new WordGameDto.Hint(sentence);
		this.boardIdx = boardIdx;
		this.clueIdx = clueIdx;
		this.direction = direction;
	}

	public ClueDto(Word word, int clueIdx, int boardIdx, String direction) {
		this.answer = word.getContent();
		this.mean = word.getMean();
		this.shorts = null;
		this.boardIdx = boardIdx;
		this.clueIdx = clueIdx;
		this.direction = direction;
	}
}
