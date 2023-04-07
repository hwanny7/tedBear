package com.ssafy.tedbear.domain.sentence.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.global.common.SearchDto;

public interface SentenceService {
	void completeSpeaking(String memberUid, SpeakingDto.Request speakingDto);

	void saveSpeakingRecord(Member member, SpeakingDto.Request speakingDto);

	SentenceDetailDto.ListResponse getRecommendList(String memberUid, int delta);

	SentenceDetailDto.ListResponse searchSentence(String memberUid, SearchDto.Request condition, Pageable pageable);

	void updateBookmarkSentence(Member member, List<Sentence> sentenceList);
}
