package com.ssafy.tedbear.domain.sentence.controller;

import java.util.NoSuchElementException;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.log.service.MemberShortsLogService;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.service.SentenceBookmarkService;
import com.ssafy.tedbear.domain.sentence.service.SentenceService;
import com.ssafy.tedbear.global.common.SearchDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/sentence")
public class SentenceController {
	private final MemberRepository memberRepository;
	private final MemberShortsLogService memberShortsLogService;
	private final SentenceService sentenceService;
	private final SentenceBookmarkService sentenceBookmarkService;

	@PostMapping("/speaking/{memberNo}")
	public ResponseEntity<?> saveSpeakingRecord(@PathVariable Long memberNo,
		@RequestBody SpeakingDto.Request speakingDto) {

		Member member = memberRepository.findById(memberNo)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		sentenceService.saveSpeakingRecord(member, speakingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/recommend/list")
	public ResponseEntity<SentenceDetailDto.ListResponse> getRecommendSentence() {
		Member member = memberRepository.findById(2L).orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));

		SentenceDetailDto.ListResponse recommendList = sentenceService.getRecommendList(member);
		return new ResponseEntity<>(recommendList, HttpStatus.OK);
	}

	@PostMapping("/shorts")
	public ResponseEntity<?> saveShortsLog(@RequestBody MemberShortsLogDto.Request shorLogRequest) {
		Member member = memberRepository.findById(2L).orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));

		memberShortsLogService.saveMemberShortsLog(member, shorLogRequest.getSentenceNo());
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchSentence(SearchDto.Request searchCondition, Pageable pageable) {
		SentenceDetailDto.ListResponse listResponse = sentenceService.searchSentence(Member.builder().no(2L).build(),
			searchCondition, pageable);
		return new ResponseEntity<>(listResponse, HttpStatus.OK);
	}

	//==북마크==//
	@GetMapping("/bookmark/list")
	public ResponseEntity<?> getBookmarkedSentenceList() {

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> postSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto) {
		Long memberId = 2L;
		sentenceBookmarkService.saveSentenceBookmark(memberId, sentenceBookmarkDto);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto) {
		Long memberId = 2L;
		sentenceBookmarkService.deleteSentenceBookmark(memberId, sentenceBookmarkDto);

		return new ResponseEntity<>(HttpStatus.OK);
	}

}