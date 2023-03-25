package com.ssafy.tedbear.domain.word.controller;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.word.service.WordServiceImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.word.dto.WordDto;

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
	public ResponseEntity<?> searchWord(WordDto.Request query, Pageable pageable){
		String word = query.getQuery();
		SentenceDetailDto.ContentListResponse list = wordService.searchWordRelatedSentence(word, pageable);
		WordDto.SearchWord wordInfo = wordService.searchWordDetail(Member.builder().no((long)1).build(), word);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(WordDto.WordSearchResponse.builder().wordInfo(wordInfo).sentenceContentList(list).build());
	}
}
