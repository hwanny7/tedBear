package com.ssafy.tedbear.domain.member.service;

import com.ssafy.tedbear.domain.member.dto.ProblemList;
import com.ssafy.tedbear.domain.member.dto.StreakList;
import com.ssafy.tedbear.domain.member.entity.Member;

public interface MemberService {
	StreakList getStreak(Member member);

	ProblemList getProblemList();

}
