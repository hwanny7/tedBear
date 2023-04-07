package com.ssafy.tedbear.global.common;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FindMemberService {
	private final MemberRepository memberRepository;

	public Member findMember(String memberUid) {
		return memberRepository.findByUid(memberUid)
			.orElse(memberRepository.findById(1L).get());
	}

	public Member findMemberOnlyMember(String memberUid) {
		Member member = memberRepository.findByUid(memberUid).get();
		if (member.getNo() == 1L) {
			throw new IllegalArgumentException();
		}
		return member;
	}
}
