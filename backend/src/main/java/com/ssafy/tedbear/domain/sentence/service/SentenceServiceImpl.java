package com.ssafy.tedbear.domain.sentence.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceBookmarkRepository;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.global.common.FindMemberService;
import com.ssafy.tedbear.global.common.SearchDto;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SentenceServiceImpl implements SentenceService {
	private final SentenceRepository sentenceRepository;
	private final SpeakingRecordRepository speakingRecordRepository;
	private final SentenceBookmarkRepository sentenceBookmarkRepository;
	private final FindMemberService findMemberService;
	private final MemberService memberService;
	final int resultMaxCnt = 12;

	//스피킹 완료
	public void completeSpeaking(String memberUid, SpeakingDto.Request speakingDto) {
		Member member = findMemberService.findMember(memberUid);

		saveSpeakingRecord(member, speakingDto);
		memberService.increaseMemberLevel(member, 400);
		memberService.updateMemberScore(member, speakingDto.isMatchStatus() ? 800 : -500);

	}

	//스피킹 데이터 저장
	public void saveSpeakingRecord(Member member, SpeakingDto.Request speakingDto) {
		SpeakingRecord speakingRecord = SpeakingRecord.builder()
			.matchStatus(speakingDto.isMatchStatus())
			.sentence(new Sentence(speakingDto.getSentenceNo()))
			.member(member)
			.createdDate(LocalDateTime.now())
			.build();

		speakingRecordRepository.save(speakingRecord);

	}

	//추천 문장 리스트 불러오기
	@Transactional
	public SentenceDetailDto.ListResponse getRecommendList(String memberUid, int delta) {
		Member member = findMemberService.findMember(memberUid);
		int memberScore = member.getScore() + delta;
		List<Sentence> sentenceList = getRecommendSentence(memberScore);

		List<Sentence> checkedList = checkDuplicateVideo(sentenceList);

		updateBookmarkSentence(member, checkedList);

		return new SentenceDetailDto.ListResponse(checkedList);

	}

	private List<Sentence> getRecommendSentence(int memberScore) {
		int recommendScoreFlag = RecommendUtil.getRecommendScore(memberScore);
		int deltaScore = 10;

		List<Sentence> recommendList;
		do {
			recommendList = sentenceRepository.findByScoreBetween(Math.max(1, recommendScoreFlag - deltaScore),
				recommendScoreFlag + deltaScore);
			deltaScore += 3;
			log.debug(String.valueOf(recommendList.size()));
		} while (recommendList.size() < resultMaxCnt);
		return recommendList;
	}

	private List<Sentence> checkDuplicateVideo(List<Sentence> recommendList) {
		return recommendList.stream()
			.filter(distinctByKey(sentence -> sentence.getVideo().getWatchId()))
			.limit(resultMaxCnt)
			.collect(Collectors.toList());
	}

	public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
		Map<Object, Boolean> map = new ConcurrentHashMap<>();
		return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}

	public SentenceDetailDto.ListResponse searchSentence(String memberUid, SearchDto.Request condition,
		Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);
		List<Sentence> searchList = sentenceRepository.findSliceByContent(condition.getQuery(), pageable).getContent();
		updateBookmarkSentence(member, searchList);

		return new SentenceDetailDto.ListResponse(searchList);
	}

	//해당 문장 리스트에 북마크 정보 업데이트
	public void updateBookmarkSentence(Member member, List<Sentence> sentenceList) {
		Set<Long> bookmarkedSet = sentenceBookmarkRepository.findByMemberAndSentenceIn(member, sentenceList)
			.stream()
			.map(s -> s.getSentence().getNo())
			.collect(Collectors.toSet());

		sentenceList.forEach(s -> s.setBookmarked(bookmarkedSet.contains(s.getNo())));
	}

}
