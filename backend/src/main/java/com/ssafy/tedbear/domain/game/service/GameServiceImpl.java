package com.ssafy.tedbear.domain.game.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.game.dto.ClueDto;
import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.GridDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.repository.WordRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService {
	private final WordRepository wordRepository;
	private final SentenceRepository sentenceRepository;
	private final MemberService memberService;

	public WordGameDto getQuestion(Long memberId) {
		Word randomWord = wordRepository.findNoByRand();
		Member member = memberService.getMember(memberId);
		// Sentence sentence = sentenceRepository.findByWordOrderByMemberScore(randomWord.getNo(), member.getScore())
		// 	.orElseThrow(() -> new IllegalStateException("해당 단어가 포함된 문장을 찾을 수 없습니다."));

		return null;
	}

	@Override
	public CrossWordDto getCrossWord() {
		List<GridDto> gridList = new ArrayList<>();
		List<ClueDto> clueList = new ArrayList<>();

		return new CrossWordDto(gridList, clueList, 4);
	}
}
