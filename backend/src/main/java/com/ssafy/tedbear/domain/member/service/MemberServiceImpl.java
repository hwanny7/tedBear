package com.ssafy.tedbear.domain.member.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.dto.Streak;
import com.ssafy.tedbear.domain.member.dto.StreakList;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.global.util.TimeParseUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	final MemberRepository memberRepository;
	final SpeakingRecordRepository speakingRecordRepository;

	@Override
	public StreakList getStreak(Member member) {
		LocalDateTime firstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).atStartOfDay();
		List<SpeakingRecord> speakingRecordList = speakingRecordRepository.findSpeakingRecordsByCreatedDateAfterAndMember(
			firstDay, member);
		Map<String, Streak> streakMap = new HashMap<>();
		for (SpeakingRecord speakingRecord : speakingRecordList) {
			String date = TimeParseUtil.time2String(speakingRecord.getCreatedDate());
			if (!streakMap.containsKey(date)) {
				streakMap.put(date, new Streak(date));
			}
			streakMap.get(date).increaseCount();
		}
		return new StreakList(streakMap);
	}
}
