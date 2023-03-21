package com.ssafy.tedbear.domain.sentence.controller;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.service.SentenceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/sentence")
public class SentenceController {
	private final MemberRepository memberRepository;
	private final SentenceService sentenceService;

	@PostMapping("/speaking/{memberNo}")
	public ResponseEntity<?> saveSpeakingRecord(@PathVariable Long memberNo,
		@RequestBody SpeakingDto.Request speakingDto) {

		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		sentenceService.saveSpeakingRecord(member, speakingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/recommend/list")
	public ResponseEntity<SentenceDetailDto.ListResponse> getRecommendList() {
		Member member = memberRepository.findById(2L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));

		SentenceDetailDto.ListResponse recommendList = sentenceService.getRecommendList(member);
		return new ResponseEntity<>(recommendList, HttpStatus.OK);
	}

}