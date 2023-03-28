package com.ssafy.tedbear.domain.word.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceDetailDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.dto.WordBookmarkDto;
import com.ssafy.tedbear.domain.word.dto.WordDto;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import com.ssafy.tedbear.domain.word.repository.WordBookmarkRepository;
import com.ssafy.tedbear.domain.word.repository.WordRepository;
import com.ssafy.tedbear.domain.word.repository.WordSentenceRepository;
import com.ssafy.tedbear.global.common.FindMemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class WordServiceImpl {
	private final WordRepository wordRepository;
	private final WordSentenceRepository wordSentenceRepository;
	private final WordBookmarkRepository wordBookmarkRepository;
	private final FindMemberService findMemberService;

	/***
	 * 단어 검색 - 단어와 연관된 문장 가져오기
	 * @param word
	 * @param pageable
	 * @return 단어와 연관된 문장들
	 */
	public SentenceDetailDto.ContentListResponse searchWordRelatedSentence(String word, Pageable pageable) {
		List<Sentence> searchList = wordRepository.findByWord(word, pageable).getContent();

		return new SentenceDetailDto.ContentListResponse(searchList);
	}

	/***
	 * 단어검색 - 북마크, 의미
	 * @param member
	 * @param word
	 * @return 북마크 여부, 단어 의미
	 */
	public WordDto.SearchWord searchWordDetail(Member member, String word) {
		Word wordDetail = wordRepository.findByContent(word)
			.orElseThrow(() -> new IllegalArgumentException("해당 단어가 DB에 없습니다."));
		WordBookmark wordBookmark = wordSentenceRepository.findByMemberAndWord(member, wordDetail).orElse(null);

		boolean bookMarked = false;
		if (wordBookmark != null) {
			bookMarked = true;
		}

		return WordDto.SearchWord.builder()
			.bookMarked(bookMarked)
			.mean(wordDetail.getMean())
			.build();
	}

	public void saveWordBookmark(String memberNo, WordBookmarkDto wordBookmarkDto) {
		Member member = findMemberService.findMember(memberNo);
		wordBookmarkRepository.findByMemberAndWord(member, wordBookmarkDto.word())
			.ifPresentOrElse(noEntity -> {
					throw new IllegalArgumentException("이미 존재하는 북마크입니다.");
				},
				() -> wordBookmarkRepository.save(
					wordBookmarkDto.toEntity(member)
				));
	}
}