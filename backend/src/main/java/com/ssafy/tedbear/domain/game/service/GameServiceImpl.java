package com.ssafy.tedbear.domain.game.service;

import java.util.Optional;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.game.dto.ClueDto;
import com.ssafy.tedbear.domain.game.dto.CrossWordDto;
import com.ssafy.tedbear.domain.game.dto.GridDto;
import com.ssafy.tedbear.domain.game.dto.WordGameDto;
import com.ssafy.tedbear.domain.game.dto.WordGameResultDto;
import com.ssafy.tedbear.domain.game.repository.GameRecordRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.repository.SentenceRepository;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.repository.WordRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GameServiceImpl implements GameService {
	private final WordRepository wordRepository;
	private final SentenceRepository sentenceRepository;
	private final MemberService memberService;
	private final GameRecordRepository gameRecordRepository;

	@Override
	public WordGameDto getQuestion(Long memberId) {
		Word randomWord = wordRepository.findNoByRand();
		Member member = memberService.getMember(memberId);

		Optional<Sentence> sentence;
		do {
			sentence = sentenceRepository.findByWordOrderByMemberScore(randomWord.getNo(), member.getScore());
		} while (!sentence.isPresent());

		return new WordGameDto(randomWord, sentence.get());
	}

	@Override
<<<<<<< backend/src/main/java/com/ssafy/tedbear/domain/game/service/GameServiceImpl.java
	public void completeWordGame(long memberId, WordGameResultDto wordGameResultDto) {
		gameRecordRepository.save(wordGameResultDto.toEntity(memberId));
	}

=======
	public CrossWordDto getCrossWord() {
		List<GridDto> gridList = new ArrayList<>();
		List<ClueDto> clueList = new ArrayList<>();

		return new CrossWordDto(gridList, clueList, 4);
	}
>>>>>>> backend/src/main/java/com/ssafy/tedbear/domain/game/service/GameServiceImpl.java
}
