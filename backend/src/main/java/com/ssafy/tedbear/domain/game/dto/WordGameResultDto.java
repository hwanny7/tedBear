package com.ssafy.tedbear.domain.game.dto;

import java.time.LocalDateTime;

import com.ssafy.tedbear.domain.game.entity.GameRecord;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Getter;

@Getter
public class WordGameResultDto {
	Long wordNo;
	Long tryCnt;

	public GameRecord toEntity(Member member) {
		return GameRecord.builder()
			.tryCnt(tryCnt)
			.createdDate(LocalDateTime.now())
			.member(member)
			.word(Word.builder().no(this.wordNo).build())
			.build();
	}
}
