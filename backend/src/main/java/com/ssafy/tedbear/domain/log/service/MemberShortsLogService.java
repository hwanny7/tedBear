package com.ssafy.tedbear.domain.log.service;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.log.entity.MemberShortsLog;
import com.ssafy.tedbear.domain.log.repository.MemberShortsLogRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.service.SentenceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberShortsLogService {
	private final MemberShortsLogRepository memberShortsLogRepository;
	private final SentenceService sentenceService;

	public void saveMemberShortsLog(Member member, Long sentenceNo) {
		Sentence sentence = sentenceService.getSentence(sentenceNo);

		MemberShortsLog memberShortsLog = MemberShortsLogDto.toEntity(member, sentence);

		memberShortsLogRepository.save(memberShortsLog);
	}

}
