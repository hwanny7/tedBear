package com.ssafy.tedbear.domain.word.service;

import java.util.List;
import java.util.stream.Collectors;

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
	public List<String> searchWordRelatedSentence(String word, Pageable pageable) {
		List<Sentence> searchList = wordRepository.findByWord(word, pageable).getContent();

		return SentenceDetailDto.ContentListResponse(searchList);
	}

	/***
	 * 단어 검색 - 단어 가져오기
	 * @param memberUid
	 * @param word
	 * @return 보낼 단어 detail
	 */
	public WordDto.SearchWord searchWordDetail(String memberUid, String word) {
		Member member = findMemberService.findMember(memberUid);

		Word wordDetail = wordRepository.findByContent(word)
			.orElseThrow(() -> new IllegalArgumentException("해당 단어가 DB에 없습니다."));
		WordBookmark wordBookmark = wordSentenceRepository.findByMemberAndWord(member, wordDetail).orElse(null);

		boolean bookMarked = false;
		if (wordBookmark != null) {
			bookMarked = true;
		}

		return WordDto.SearchWord.builder()
			.bookMarked(bookMarked)
			.content(wordDetail.getContent())
			.mean(wordDetail.getMean())
			.wordNo(wordDetail.getNo())
			.build();
	}

	public void saveWordBookmark(String memberUid, WordBookmarkDto wordBookmarkDto) {
		Member member = findMemberService.findMember(memberUid);
		wordBookmarkRepository.findByMemberAndWord(member, wordBookmarkDto.word())
			.ifPresentOrElse(noEntity -> {
					throw new IllegalArgumentException("이미 존재하는 북마크입니다.");
				},
				() -> wordBookmarkRepository.save(
					wordBookmarkDto.toEntity(member)
				));
	}

	public void deleteWordBookmark(String memberUid, WordBookmarkDto wordBookmarkDto) {
		Member member = findMemberService.findMember(memberUid);
		WordBookmark bookmark = wordBookmarkRepository.findByMemberAndWord(member, wordBookmarkDto.word())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 북마크입니다."));

		wordBookmarkRepository.delete(bookmark);
	}

	public List<WordBookmark> findWordBookmark(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);
		List<WordBookmark> bmk = wordBookmarkRepository.findByMember(member).stream().collect(Collectors.toList());
		for (int i = 0; i < bmk.size(); i++) {
			System.out.println(bmk.get(i).getWord());
		}
		return bmk;
	}

}