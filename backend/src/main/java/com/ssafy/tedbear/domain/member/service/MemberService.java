package com.ssafy.tedbear.domain.member.service;

import com.ssafy.tedbear.domain.member.dto.FeelDto;
import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberScore;

public interface MemberService {
	StreakListDto getStreak(String memberUid);

	ProblemListDto getProblemList();

	PieDto getPie(String memberUid);

	void saveProblemResult(String memberUid, int testResult);

	void updateMemberScore(Member member, int diffScore);

	void increaseMemberLevel(Member member, int amount);

	LevelInfoDto getLevel(String memberUid);

	void updateScoreByFeel(String memberUid, FeelDto feelDto);
}
