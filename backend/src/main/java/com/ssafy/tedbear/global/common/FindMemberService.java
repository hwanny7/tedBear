package com.ssafy.tedbear.global.common;

import java.util.NoSuchElementException;

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
			.orElseThrow(() -> new NoSuchElementException("해당 UID에 해당하는 회원이 존재하지 않습니다."));
	}
}
