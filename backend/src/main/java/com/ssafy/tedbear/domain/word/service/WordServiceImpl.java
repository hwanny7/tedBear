package com.ssafy.tedbear.domain.word.service;

import java.util.ArrayList;
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
	 * 단어검색 - 연관 문장 가져오기
	 * @param word
	 * @param pageable
	 * @return 문장 리스트
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
		Long sentenceCount = wordBookmarkRepository.getSentenceCount(word);

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
			.sentenceCount(sentenceCount)
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

	public WordBookmarkDto.WordBookmarkListResponse findWordBookmark(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);

		List<String> sentenceContentList;
		List<WordBookmarkDto.WordList> wordBookmarkLists = new ArrayList<>();
		List<WordBookmark> wordBookmarks = wordBookmarkRepository.findByMember(member, pageable).getContent();

		for (WordBookmark wb : wordBookmarks) {
			sentenceContentList = new ArrayList<>();

			Word word = wb.getWord();
			WordBookmarkDto.WordDetail wordDetail = WordBookmarkDto.WordDetail.builder()
				.wordNo(word.getNo())
				.content(word.getContent())
				.mean(word.getContent())
				.build();

			int size = wb.getWord().getWordSentenceList().size();
			if (size < 3) {
				for (int i = 0; i < size; i++) {
					sentenceContentList.add(wb.getWord().getWordSentenceList().get(i).getSentence().getContent());
				}
			} else {
				for (int i = 0; i < 3; i++) {
					sentenceContentList.add(wb.getWord().getWordSentenceList().get(i).getSentence().getContent());
				}
			}
			wordBookmarkLists.add(
				WordBookmarkDto.WordList.builder()
					.wordInfo(wordDetail)
					.sentenceContentList(sentenceContentList)
					.build());
		}
		return new WordBookmarkDto.WordBookmarkListResponse(wordBookmarkLists);
	}

}