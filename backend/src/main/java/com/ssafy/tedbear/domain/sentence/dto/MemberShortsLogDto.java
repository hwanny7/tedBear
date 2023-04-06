package com.ssafy.tedbear.domain.sentence.dto;

import com.ssafy.tedbear.domain.log.entity.MemberShortsLog;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.Getter;

public class MemberShortsLogDto {
	@Getter
	public static class Request {
		Long sentenceNo;
	}

	public static MemberShortsLog toEntity(Member member, Sentence sentence) {
		return MemberShortsLog.builder().member(member).sentence(sentence).build();

	}
}
