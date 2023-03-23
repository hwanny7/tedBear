package com.ssafy.tedbear.domain.sentence.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.sentence.repository.SentenceBookmarkRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
import com.ssafy.tedbear.global.common.SearchDto;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SentenceService {
	private final SentenceRepository sentenceRepository;
	private final SpeakingRecordRepository speakingRecordRepository;
	private final SentenceBookmarkRepository sentenceBookmarkRepository;
	final int resultMaxCnt = 12;

	public Sentence getSentence(Long sentenceNo) {
		return sentenceRepository.findById(sentenceNo)
			.orElseThrow(() -> new NoSuchElementException("해당 문장을 찾을 수 없습니다"));
	}

	//스피킹 데이터 저장
	public void saveSpeakingRecord(Member member, SpeakingDto.Request speakingDto) {
		SpeakingRecord speakingRecord = SpeakingRecord.builder()
			.matchStatus(speakingDto.isMatchStatus())
			.sentence(getSentence(speakingDto.getSentenceNo()))
			.member(member)
			.createdDate(LocalDateTime.now())
			.build();

		speakingRecordRepository.save(speakingRecord);

	}

	@Transactional
	public SentenceDetailDto.ListResponse getRecommendSentence(Member member) {
		int memberScore = member.getScore();
		List<Sentence> recommendList = getRecommendList(memberScore);
		recommendList = checkDuplicateVideo(recommendList);

		return new SentenceDetailDto.ListResponse(recommendList.stream()
			.limit(resultMaxCnt)
			.peek(sentence -> sentence.setBookmarked(
				sentenceBookmarkRepository.findByMemberAndSentence(member, sentence).isPresent()))
			.collect(Collectors.toSet()));

	}

	private List<Sentence> getRecommendList(int memberScore) {
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

	private static List<Sentence> checkDuplicateVideo(List<Sentence> recommendList) {
		return recommendList.stream()
			.filter(distinctByKey(sentence -> sentence.getVideo().getWatchId()))
			.collect(Collectors.toList());
	}

	public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
		Map<Object, Boolean> map = new ConcurrentHashMap<>();
		return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}

	public SentenceDetailDto.ListResponse searchSentence(SearchDto.Request condition, Pageable pageable) {
		Slice<Sentence> sliceByContent = sentenceRepository.findSliceByContent(condition.getQuery(), pageable);
		return new SentenceDetailDto.ListResponse(sliceByContent);
	}

}
