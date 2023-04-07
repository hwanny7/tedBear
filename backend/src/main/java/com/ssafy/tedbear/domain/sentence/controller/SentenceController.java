package com.ssafy.tedbear.domain.sentence.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import com.ssafy.tedbear.domain.sentence.dto.MemberShortsLogDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkStatusDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SpeakingDto;
import com.ssafy.tedbear.domain.sentence.service.SentenceBookmarkServiceImpl;
import com.ssafy.tedbear.domain.sentence.service.SentenceServiceImpl;
import com.ssafy.tedbear.global.common.SearchDto;
import com.ssafy.tedbear.global.common.oauth2.dto.CustomOAuth2User;
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
	private final SentenceServiceImpl sentenceService;
	private final SentenceBookmarkServiceImpl sentenceBookmarkService;

	@PostMapping("/speaking")
	public ResponseEntity<?> completeSpeaking(@RequestBody SpeakingDto.Request speakingDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		sentenceService.completeSpeaking(user.getName(), speakingDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/recommend/list/{difficulty}")
	public ResponseEntity<SentenceDetailDto.ListResponse> getRecommendSentence(
		@PathVariable("difficulty") String difficulty, @AuthenticationPrincipal CustomOAuth2User user) {
		int delta = RecommendUtil.getDelta(difficulty);
		SentenceDetailDto.ListResponse recommendList = sentenceService.getRecommendList(user.getName(), delta);
		return new ResponseEntity<>(recommendList, HttpStatus.OK);
	}

	@PostMapping("/shorts")
	public ResponseEntity<?> saveShortsLog(@RequestBody MemberShortsLogDto.Request shorLogRequest,
		@AuthenticationPrincipal CustomOAuth2User user) {
		memberShortsLogService.watchedShorts(user.getName(), shorLogRequest.getSentenceNo());
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchSentence(SearchDto.Request searchCondition,
		@PageableDefault(sort = "startTime") Pageable pageable, @AuthenticationPrincipal CustomOAuth2User user) {
		SentenceDetailDto.ListResponse listResponse = sentenceService.searchSentence(user.getName(), searchCondition,
			pageable);
		return new ResponseEntity<>(listResponse, HttpStatus.OK);
	}

	//==북마크==//
	@GetMapping("/bookmark/list")
	public ResponseEntity<?> getBookmarkedSentenceList(Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		SentenceBookmarkDetailDto.ListResponse bookmarkList = sentenceBookmarkService.getBookmarkList(user.getName(),
			pageable);
		return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> postSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		sentenceBookmarkService.saveSentenceBookmark(user.getName(), sentenceBookmarkDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteSentenceBookmark(@RequestBody SentenceBookmarkDto sentenceBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		sentenceBookmarkService.deleteSentenceBookmark(user.getUid(), sentenceBookmarkDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/bookmark/{sentenceId}")
	public ResponseEntity<SentenceBookmarkStatusDto> getBookmarkStatus(@PathVariable Long sentenceId,
		@AuthenticationPrincipal CustomOAuth2User user) {
		SentenceBookmarkStatusDto bookmarkStatusDto = sentenceBookmarkService.getBookmarkStatus(user.getUid(),
			sentenceId);
		return new ResponseEntity<>(bookmarkStatusDto, HttpStatus.OK);
	}

}