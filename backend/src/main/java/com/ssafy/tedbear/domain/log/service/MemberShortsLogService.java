package com.ssafy.tedbear.domain.log.service;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.log.entity.MemberShortsLog;
import com.ssafy.tedbear.domain.log.repository.MemberShortsLogRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberShortsLogService {
	private final MemberShortsLogRepository memberShortsLogRepository;

	public void saveMemberShortsLog(Member member, Long sentenceNo) {
		Sentence sentence = Sentence.builder().no(sentenceNo).build();

		MemberShortsLog memberShortsLog = MemberShortsLogDto.toEntity(member, sentence);

		memberShortsLogRepository.save(memberShortsLog);
	}

}
