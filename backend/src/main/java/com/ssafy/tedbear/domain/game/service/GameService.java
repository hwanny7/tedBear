package com.ssafy.tedbear.domain.game.service;

import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.dto.WordGameResultDto;
import com.ssafy.tedbear.domain.member.entity.Member;

public interface GameService {

	WordGameDto getQuestion(Member member);

	void completeWordGame(Member member, WordGameResultDto wordGameResultDto);

	CrossWordDto getCrossWord(int boardSize);

}
