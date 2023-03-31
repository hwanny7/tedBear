package com.ssafy.tedbear.domain.sentence.dto;

import java.time.LocalDateTime;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SentenceBookmark;

import lombok.Getter;

@Getter
public class SentenceBookmarkDto {
	Long sentenceNo;

	public SentenceBookmark toEntity(Member member, Sentence sentence) {
		return SentenceBookmark.builder().member(member).sentence(sentence).createdDate(LocalDateTime.now()).build();
	}

}
