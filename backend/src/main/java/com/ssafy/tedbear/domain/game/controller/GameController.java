package com.ssafy.tedbear.domain.game.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.dto.WordGameResultDto;
import com.ssafy.tedbear.domain.game.service.GameService;
import com.ssafy.tedbear.global.common.oauth2.dto.CustomOAuth2User;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api/game")
public class GameController {
	private final GameService gameService;

	@GetMapping("/word")
	public ResponseEntity<WordGameDto> getWordGame(@AuthenticationPrincipal CustomOAuth2User user) {
		WordGameDto question = gameService.getQuestion(user.getName());
		return new ResponseEntity<>(question, HttpStatus.OK);
	}

	@GetMapping("/word/demo")
	public ResponseEntity<WordGameDto> getWordGameDemo(@AuthenticationPrincipal CustomOAuth2User user, @RequestParam Integer num) {
		WordGameDto question = gameService.getQuestionDemo(num);
		return new ResponseEntity<>(question, HttpStatus.OK);
	}

	@PostMapping("/word")
	public ResponseEntity<WordGameDto> postWordGame(@RequestBody WordGameResultDto wordGameResultDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		gameService.completeWordGame(user.getName(), wordGameResultDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/crossword/{difficulty}")
	public ResponseEntity<CrossWordDto> getCrossWordGame(@PathVariable String difficulty) {
		return ResponseEntity.ok(gameService.getCrossWord(RecommendUtil.getBoardSize(difficulty)));
	}
}
