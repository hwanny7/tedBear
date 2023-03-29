package com.ssafy.tedbear.domain.word.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.word.dto.WordBookmarkDto;
import com.ssafy.tedbear.domain.word.dto.WordDto;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import com.ssafy.tedbear.domain.word.service.WordServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/word")
public class WordController {

	private final WordServiceImpl wordService;

	@GetMapping("/search")
	public ResponseEntity<WordDto.WordSearchResponse> searchWord(WordDto.Request query, Pageable pageable) {
		String word = query.getQuery();
		List<String> list = wordService.searchWordRelatedSentence(word, pageable);
		WordDto.SearchWord wordInfo = wordService.searchWordDetail("271521", word);

		return ResponseEntity
			.status(HttpStatus.OK)
			.body(WordDto.WordSearchResponse.builder().wordInfo(wordInfo).sentenceContentList(list).build());
	}

	@GetMapping("/list")
	public ResponseEntity<?> getWordBookMarkList(Pageable pageable) {
		List<WordBookmark> m = wordService.findWordBookmark("271521", pageable);
		return ResponseEntity.status(HttpStatus.OK).body(m);
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> saveWordBookmark(@RequestBody WordBookmarkDto wordBookmarkDto) {
		// Autentication에서 uid 가져와서 밑에 넣기!
		wordService.saveWordBookmark("271521", wordBookmarkDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteWordBookmark(@RequestBody WordBookmarkDto wordBookmarkDto) {
		wordService.deleteWordBookmark("271521", wordBookmarkDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}