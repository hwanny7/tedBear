package com.ssafy.tedbear.domain.game.dto;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Getter;

@Getter
public class WordGameDto {
	Long wordNo;
	String answer;
	String sentence;
	int score;

	WordGameDto.Hint hint;

	public WordGameDto(Word word, Sentence sentence) {
		this.wordNo = word.getNo();
		this.answer = word.getContent();
		this.sentence = sentence.getContent().replace(word.getContent(), "tedbear");
		this.score = sentence.getScore();
		this.hint = new Hint(sentence);
	}

	@Getter
	static class Hint {
		int startTime;
		int endTime;
		String watchId;

		Hint(Sentence sentence) {
			this.startTime = sentence.getStartTime();
			this.endTime = sentence.getEndTime();
			this.watchId = sentence.getVideo().getWatchId();

		}
	}

}
