package com.ssafy.tedbear.domain.sentence.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkStatusDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.service.SentenceBookmarkService;
import com.ssafy.tedbear.domain.sentence.service.SentenceService;
import com.ssafy.tedbear.global.common.FindMemberService;
import com.ssafy.tedbear.global.common.SearchDto;
import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api/sentence")
public class SentenceController {
	private final MemberShortsLogService memberShortsLogService;
	private final SentenceService sentenceService;
	private final SentenceBookmarkService sentenceBookmarkService;
	private final FindMemberService findMemberService;

	@PostMapping("/speaking")
	public ResponseEntity<?> saveSpeakingRecord(
		@RequestBody SpeakingDto.Request speakingDto, @AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		sentenceService.saveSpeakingRecord(member, speakingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/recommend/list/{difficulty}")
	public ResponseEntity<SentenceDetailDto.ListResponse> getRecommendSentence(
		@PathVariable("difficulty") String difficulty, @AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		int delta = RecommendUtil.getDelta(difficulty);
		SentenceDetailDto.ListResponse recommendList = sentenceService.getRecommendList(member, delta);
		return new ResponseEntity<>(recommendList, HttpStatus.OK);
	}

	@PostMapping("/shorts")
	public ResponseEntity<?> saveShortsLog(@RequestBody MemberShortsLogDto.Request shorLogRequest,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		memberShortsLogService.saveMemberShortsLog(member, shorLogRequest.getSentenceNo());
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchSentence(SearchDto.Request searchCondition, Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		SentenceDetailDto.ListResponse listResponse = sentenceService.searchSentence(member, searchCondition, pageable);
		return new ResponseEntity<>(listResponse, HttpStatus.OK);
	}

	//==북마크==//
	@GetMapping("/bookmark/list")
	public ResponseEntity<?> getBookmarkedSentenceList(Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		SentenceBookmarkDetailDto.ListResponse bookmarkList = sentenceBookmarkService.getBookmarkList(member.getNo(),
			pageable);
		return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> postSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		sentenceBookmarkService.saveSentenceBookmark(member, sentenceBookmarkDto);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		sentenceBookmarkService.deleteSentenceBookmark(member, sentenceBookmarkDto);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/bookmark/{sentenceId}")
	public ResponseEntity<SentenceBookmarkStatusDto> getBookmarkStatus(@PathVariable Long sentenceId,
		@AuthenticationPrincipal CustomOAuth2User user) {
		Member member = findMemberService.findMember(user.getName());
		SentenceBookmarkStatusDto bookmarkStatusDto = sentenceBookmarkService.getBookmarkStatus(member, sentenceId);
		return new ResponseEntity<>(bookmarkStatusDto, HttpStatus.OK);
	}

}