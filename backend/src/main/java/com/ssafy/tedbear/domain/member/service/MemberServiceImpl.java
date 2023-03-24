package com.ssafy.tedbear.domain.member.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.member.dto.ProblemList;
import com.ssafy.tedbear.domain.member.dto.Streak;
import com.ssafy.tedbear.domain.member.dto.StreakList;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.repository.WordRepository;
import com.ssafy.tedbear.global.util.TimeParseUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	final MemberRepository memberRepository;
	final SpeakingRecordRepository speakingRecordRepository;
	final SentenceRepository sentenceRepository;
	final WordRepository wordRepository;

	@Value("${default-value.score}")
	int defaultScore;

	@Override
	public StreakList getStreak(long memberNo) {
		LocalDateTime firstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).atStartOfDay();
		Member member = getMember(memberNo);
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

	@Override
	public ProblemList getProblemList() {

		Random random = new Random();

		// 단어는 CEFR 다 가져와서, 난이도별로 1개씩 총 6개
		List<Word> problemWordList =
			wordRepository.findByScoreIsNot(0)
				.stream()
				.collect(Collectors.groupingBy(Word::getScore))
				.values()
				.stream()
				.map(x -> x.stream()
					.skip(random.nextInt(x.size() - 1))
					.limit(1)
					.collect(Collectors.toList()))
				.flatMap(Collection::stream)
				.collect(Collectors.toList());

		// 문장은 랜덤인덱스부터 만개 가져와서 문장 2,3,4,5,6,7만번대 각 1개씩 총 6개
		long randomNo = Math.abs(random.nextLong()) % 300000;
		List<Sentence> problemSentenceList =
			sentenceRepository
				.findByNoBetweenAndScoreBetween(randomNo, randomNo + 10000, 20000, 79999)
				.stream()
				.collect(Collectors.groupingBy(x -> x.getScore() / 10000))
				.values()
				.stream()
				.map(x -> x.stream()
					.skip(random.nextInt(x.size() - 1))
					.limit(1)
					.collect(Collectors.toList()))
				.flatMap(innerStream -> innerStream.stream())
				.collect(Collectors.toList());

		return new ProblemList(problemSentenceList, problemWordList);

	}

	@Override
	@Transactional
	public void saveProblemResult(long memberNo, int testResult) {
		Member member = getMember(memberNo);
		member.initScore(defaultScore, testResult);
	}

	@Override
	public Member getMember(long memberNo) {
		return memberRepository.findById(memberNo)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
	}

}
