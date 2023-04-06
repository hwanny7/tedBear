package com.ssafy.tedbear.domain.member.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.member.dto.FeelDto;
import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.domain.video.repository.WatchingVideoRepository;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.repository.WordRepository;
import com.ssafy.tedbear.global.common.FindMemberService;
import com.ssafy.tedbear.global.common.oauth2.MemberLevelRepository;
import com.ssafy.tedbear.global.util.RecommendUtil;
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
	final MemberLevelRepository memberLevelRepository;
	final FindMemberService findMemberService;
	@Value("${default-value.score}")
	int defaultScore;

	@Override
	public StreakListDto getStreak(String memberUid) {
		LocalDateTime firstDay = LocalDate.now().with(TemporalAdjusters.firstDayOfYear()).atStartOfDay();
		Member member = findMemberService.findMember(memberUid);
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

		// 2만번대 난이도의 문장, 3만번대 난이도의 문장 , ... , 7만번대 난이도의 문장 각 1개씩 총 6개 반환하기
		long randomNo = Math.abs(random.nextLong()) % 300000;

		// 스트림 사용 안하고 구현한 버전
		List<Sentence> initSentenceList = sentenceRepository.findByNoBetweenAndScoreBetween(randomNo, randomNo + 10000,
			20000, 79999);
		Map<Integer, List<Sentence>> scoreGroupSentence = new HashMap<>();
		for (Sentence sentence : initSentenceList) {
			int score = sentence.getScore();
			int scoreGroup = score / 10000;
			if (!scoreGroupSentence.containsKey(scoreGroup))
				scoreGroupSentence.put(scoreGroup, new ArrayList<>());
			scoreGroupSentence.get(scoreGroup).add(sentence);
		}

		List<Sentence> selectedSentenceList = new ArrayList<>();
		for (int key : scoreGroupSentence.keySet()) {
			List<Sentence> keySentenceList = scoreGroupSentence.get(key);
			int randomIdx = random.nextInt(keySentenceList.size());
			selectedSentenceList.add(keySentenceList.get(randomIdx));
		}

		// 스트림 사용한 버전
		List<Sentence> problemSentenceList =
			sentenceRepository.findByNoBetweenAndScoreBetween(randomNo, randomNo + 10000, 20000, 79999)
				.stream().collect(Collectors.groupingBy(x -> x.getScore() / 10000)).values().stream()
				.map(x -> x.stream().skip(random.nextInt(x.size() - 1)).limit(1).collect(Collectors.toList()))
				.flatMap(innerStream -> innerStream.stream()).collect(Collectors.toList());

		return new ProblemListDto(problemSentenceList, problemWordList);

	}

	@Override
	@Transactional
	public void saveProblemResult(String memberUid, int testResult) {
		Member member = findMemberService.findMember(memberUid);
		member.initScore(defaultScore, testResult);
	}

	@Override
	public LevelInfoDto getLevel(String memberUid) {
		Member member = findMemberService.findMember(memberUid);
		return new LevelInfoDto(member.getMemberLevel());
	}

	@Override
	@Transactional
	public void updateScoreByFeel(String memberUid, FeelDto feelDto) {
		Member member = findMemberService.findMember(memberUid);
		int delta = -(RecommendUtil.getDelta(feelDto.getDifficulty()) / 10);
		updateMemberScore(member, delta);
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
	public PieDto getPie(String memberUid) {
		Member member = findMemberService.findMember(memberUid);

		return new PieDto(watchingVideoRepository.getCompleteVideoList(member)
			.stream()
			.map(watchingVideo -> watchingVideo.getVideo().getScore())
			.collect(Collectors.toList()));
	}

}
