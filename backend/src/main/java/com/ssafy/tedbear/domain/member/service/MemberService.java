package com.ssafy.tedbear.domain.member.service;

import com.ssafy.tedbear.domain.member.dto.FeelDto;
import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberScore;

public interface MemberService {
	StreakListDto getStreak(long memberNo);

	ProblemListDto getProblemList();

	Member getMember(long memberNo);

	PieDto getPie(long memberNo);

	void saveProblemResult(long memberNo, int testResult);

	void updateMemberScore(Member member, int diffScore);

	void increaseMemberLevel(Member member, int amount);

	LevelInfoDto getLevel(long memberNo);

	void updateScoreByFeel(long memberNo, FeelDto feelDto);
}
