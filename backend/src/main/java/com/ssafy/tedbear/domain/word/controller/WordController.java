package com.ssafy.tedbear.domain.word.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.word.dto.WordBookmarkDto;
import com.ssafy.tedbear.domain.word.dto.WordDto;
import com.ssafy.tedbear.domain.word.service.WordServiceImpl;
import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api/word")
public class WordController {

	private final WordServiceImpl wordService;

	@GetMapping("/search")
	public ResponseEntity<WordDto.WordSearchResponse> searchWord(@AuthenticationPrincipal CustomOAuth2User user,
		WordDto.Request query, Pageable pageable) {
		String word = query.getQuery();
		List<String> list = wordService.searchWordRelatedSentence(word, pageable);
		WordDto.SearchWord wordInfo = wordService.searchWordDetail(user.getUid(), word);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(WordDto.WordSearchResponse.builder().wordInfo(wordInfo).sentenceContentList(list).build());
	}

	@GetMapping("/bookmark/list")
	public ResponseEntity<WordBookmarkDto.WordBookmarkListResponse> getWordBookMarkList(
		@AuthenticationPrincipal CustomOAuth2User user, Pageable pageable) {
		WordBookmarkDto.WordBookmarkListResponse wordBookmarkList = wordService.findWordBookmark(user.getUid(),
			pageable);
		return ResponseEntity.status(HttpStatus.OK).body(wordBookmarkList);
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> saveWordBookmark(@AuthenticationPrincipal CustomOAuth2User user,
		@RequestBody WordBookmarkDto wordBookmarkDto) {
		wordService.saveWordBookmark(user.getUid(), wordBookmarkDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteWordBookmark(@AuthenticationPrincipal CustomOAuth2User user,
		@RequestBody WordBookmarkDto wordBookmarkDto) {
		wordService.deleteWordBookmark(user.getUid(), wordBookmarkDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}