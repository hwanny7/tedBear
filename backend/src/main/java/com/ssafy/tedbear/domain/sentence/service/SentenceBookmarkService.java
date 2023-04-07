package com.ssafy.tedbear.domain.sentence.service;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkStatusDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;

public interface SentenceBookmarkService {
	void saveSentenceBookmark(String memberUid, SentenceBookmarkDto sentenceBookmarkDto);

	void deleteSentenceBookmark(String memberUid, SentenceBookmarkDto sentenceBookmarkDto);

	SentenceBookmarkStatusDto getBookmarkStatus(String memberUid, Long sentenceId);

	SentenceBookmarkDetailDto.ListResponse getBookmarkList(String memberUid, Pageable pageable);

	boolean isPresent(Member member, Sentence sentence);
}
