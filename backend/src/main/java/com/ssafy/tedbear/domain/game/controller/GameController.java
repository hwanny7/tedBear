package com.ssafy.tedbear.domain.game.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.service.GameService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/game")
public class GameController {
	private final GameService gameService;

	@GetMapping("/word")
	public ResponseEntity<WordGameDto> getWordGame() {
		WordGameDto question = gameService.getQuestion(2L);
		return new ResponseEntity<>(question, HttpStatus.OK);
	}

	@GetMapping("/crossword")
	public ResponseEntity<CrossWordDto> getCrossWordGame() {
		return ResponseEntity.ok(gameService.getCrossWord());
	}
}
