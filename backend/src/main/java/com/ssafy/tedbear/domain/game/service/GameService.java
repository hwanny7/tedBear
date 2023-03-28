package com.ssafy.tedbear.domain.game.service;

import com.ssafy.tedbear.domain.game.dto.WordGameDto;

public interface GameService {
	public WordGameDto getQuestion(Long memberId);
}
