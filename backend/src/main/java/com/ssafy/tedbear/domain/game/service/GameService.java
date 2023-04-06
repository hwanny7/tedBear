package com.ssafy.tedbear.domain.game.service;

import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.dto.WordGameResultDto;

public interface GameService {

	WordGameDto getQuestion(String memberUid);

	void completeWordGame(String memberUid, WordGameResultDto wordGameResultDto);

	CrossWordDto getCrossWord(int boardSize);

}
