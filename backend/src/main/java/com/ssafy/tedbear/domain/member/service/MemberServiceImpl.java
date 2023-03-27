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

import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberScore;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.domain.video.repository.WatchingVideoRepository;
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
	final WatchingVideoRepository watchingVideoRepository;

	@Value("${default-value.score}")
	int defaultScore;

	@Override
	public StreakListDto getStreak(long memberNo) {
		LocalDateTime firstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).atStartOfDay();
		Member member = getMember(memberNo);
		List<SpeakingRecord> speakingRecordList = speakingRecordRepository.findSpeakingRecordsByCreatedDateAfterAndMember(
			firstDay, member);
		Map<String, StreakDto> streakMap = new HashMap<>();
		for (SpeakingRecord speakingRecord : speakingRecordList) {
			String date = TimeParseUtil.time2String(speakingRecord.getCreatedDate());
			if (!streakMap.containsKey(date)) {
				streakMap.put(date, new StreakDto(date));
			}
			streakMap.get(date).increaseCount();
		}
		return new StreakListDto(streakMap);
	}

	@Override
	public ProblemListDto getProblemList() {

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

		return new ProblemListDto(problemSentenceList, problemWordList);

	}

	@Override
	@Transactional
	public void saveProblemResult(long memberNo, int testResult) {
		Member member = getMember(memberNo);
		member.initScore(defaultScore, testResult);
	}

	@Override
	@Transactional
	public void updateMemberScore(Member member, int diffScore) {
		member.getMemberScore().updateScore(diffScore);
	}

	@Override
	@Transactional
	public void increaseMemberLevel(Member member, int amount) {
		member.getMemberLevel().increaseLevel(amount);
	}

	@Override
	public Member getMember(long memberNo) {
		return memberRepository.findById(memberNo)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
	}

	@Override
	public PieDto getPie(long memberNo) {
		Member member = getMember(memberNo);

		return new PieDto(watchingVideoRepository.getCompleteVideoList(member)
			.stream()
			.map(watchingVideo -> watchingVideo.getVideo().getScore())
			.collect(Collectors.toList()));
	}

}
