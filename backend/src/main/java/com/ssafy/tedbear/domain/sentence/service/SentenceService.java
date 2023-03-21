package com.ssafy.tedbear.domain.sentence.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.bookmark.repository.SentenceBookmarkRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;
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

	public SentenceDetailDto.ListResponse getRecommendList(Member member) {
		int memberScore = member.getScore();
		int recommendScoreFlag = RecommendUtil.getRecommendScore(memberScore);
		int deltaScore = 10;

		List<Sentence> recommendList = new ArrayList<>();
		do {
			recommendList.addAll(sentenceRepository.findByScoreBetween(Math.max(1, recommendScoreFlag - deltaScore),
				recommendScoreFlag + deltaScore));
			deltaScore += 3;
			log.debug(String.valueOf(recommendList.size()));
		} while (recommendList.size() < resultMaxCnt);

		return new SentenceDetailDto.ListResponse(recommendList.stream()
			.limit(resultMaxCnt)
			.peek(sentence -> sentence.setBookmarked(
				sentenceBookmarkRepository.findByMemberAndSentence(member, sentence).isPresent()))
			.collect(Collectors.toList()));

	}

}
