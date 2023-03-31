package com.ssafy.tedbear.domain.log.service;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.log.entity.MemberShortsLog;
import com.ssafy.tedbear.domain.log.repository.MemberShortsLogRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.global.common.FindMemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberShortsLogService {
	private final MemberShortsLogRepository memberShortsLogRepository;
	private final FindMemberService findMemberService;
	private final MemberService memberService;

	public void watchedShorts(String memberUid, Long sentenceNo) {
		Member member = findMemberService.findMember(memberUid);
		Sentence sentence = new Sentence(sentenceNo);

		saveMemberShortsLog(member, sentence);
		memberService.increaseMemberLevel(member, 300);
		memberService.updateMemberScore(member, 600);

	}

	public void saveMemberShortsLog(Member member, Sentence sentence) {
		MemberShortsLog memberShortsLog = MemberShortsLogDto.toEntity(member, sentence);
		memberShortsLogRepository.save(memberShortsLog);
	}

}
