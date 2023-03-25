package com.ssafy.tedbear.domain.word.service;

import javax.transaction.Transactional;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.dto.WordDto;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.word.repository.WordRepository;
import com.ssafy.tedbear.domain.word.repository.WordSentenceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class WordServiceImpl {
	private final WordRepository wordRepository;
	private final WordSentenceRepository wordSentenceRepository;

	public SentenceDetailDto.ContentListResponse searchWordRelatedSentence(String word, Pageable pageable) {
		List<Sentence> searchList = wordRepository.findByWord(word, pageable).getContent();

		return new SentenceDetailDto.ContentListResponse(searchList);
	}

	public WordDto.SearchWord searchWordDetail(Member member, String word){
		Word wordDetail = wordRepository.findByContent(word).orElseThrow(() -> new IllegalArgumentException("해당 단어가 DB에 없습니다."));
		WordBookmark wordBookmark = wordSentenceRepository.findByMemberAndWord(member, wordDetail).orElse(null);

		boolean bookMarked = false;
		if(wordBookmark != null) {
			bookMarked = true;
		}

		return WordDto.SearchWord.builder()
				.bookMarked(bookMarked)
				.mean(wordDetail.getMean())
				.build();
	}
}
