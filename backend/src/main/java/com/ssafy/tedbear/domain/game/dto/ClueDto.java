package com.ssafy.tedbear.domain.game.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClueDto {
	int clue;
	String answer;
	int length;
	String dir;
	int index;
	String dic;
	WordGameDto.Hint shorts;

	public ClueDto(Word word, Sentence sentence, int clueIdx, int boardIdx, String direction) {
		this.answer = word.getContent();
		this.dic = word.getMean();
		this.length = this.answer.length();
		this.shorts = new WordGameDto.Hint(sentence);
		this.index = boardIdx;
		this.clue = clueIdx;
		this.dir = direction;
	}

	public ClueDto(Word word, int clueIdx, int boardIdx, String direction) {
		this.answer = word.getContent();
		this.dic = word.getMean();
		this.length = this.answer.length();
		this.shorts = null;
		this.index = boardIdx;
		this.clue = clueIdx;
		this.dir = direction;
	}
}
