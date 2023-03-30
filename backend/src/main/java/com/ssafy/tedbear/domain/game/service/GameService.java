package com.ssafy.tedbear.domain.game.service;

import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.dto.WordGameResultDto;

public interface GameService {

	WordGameDto getQuestion(Long memberId);

	void completeWordGame(long memberId, WordGameResultDto wordGameResultDto);
	
	CrossWordDto getCrossWord(int boardSize);

}
