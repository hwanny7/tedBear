package com.ssafy.tedbear.domain.word.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.word.dto.WordBookmarkDto;
import com.ssafy.tedbear.domain.word.dto.WordDto;

public interface WordService {
	List<String> searchWordRelatedSentence(String word, Pageable pageable);

	WordDto.SearchWord searchWordDetail(String memberUid, String word);

	void saveWordBookmark(String memberUid, WordBookmarkDto wordBookmarkDto);

	void deleteWordBookmark(String memberUid, WordBookmarkDto wordBookmarkDto);

	WordBookmarkDto.WordBookmarkListResponse findWordBookmark(String memberUid, Pageable pageable);

}
