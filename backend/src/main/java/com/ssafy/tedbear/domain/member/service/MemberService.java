package com.ssafy.tedbear.domain.member.service;

import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.entity.Member;

public interface MemberService {
	StreakListDto getStreak(long memberNo);

	ProblemListDto getProblemList();

	Member getMember(long memberNo);

	PieDto getPie(long memberNo);

	void saveProblemResult(long memberNo, int testResult);

}
