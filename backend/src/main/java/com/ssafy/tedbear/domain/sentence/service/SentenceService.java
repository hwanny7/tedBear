package com.ssafy.tedbear.domain.sentence.service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.sentence.repository.SpeakingRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SentenceService {
	private final SpeakingRecordRepository speakingRecordRepository;
	private final SentenceRepository sentenceRepository;

	public void saveSpeakingRecord(Member member, SpeakingDto.Request speakingDto) {
		Sentence sentence = getSentence(speakingDto);

		SpeakingRecord speakingRecord = SpeakingRecord.builder()
			.matchStatus(speakingDto.isMatchStatus())
			.sentence(sentence)
			.member(member)
			.createdDate(LocalDateTime.now())
			.build();

		speakingRecordRepository.save(speakingRecord);

	}

	private Sentence getSentence(SpeakingDto.Request speakingDto) {
		return sentenceRepository.findById(speakingDto.getSentenceNo())
			.orElseThrow(() -> new NoSuchElementException("해당 문장을 찾을 수 없습니다"));
	}

	public static Member getMember() {

		return null;
	}
}
