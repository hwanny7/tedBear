package com.ssafy.tedbear.domain.sentence.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDetailDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkDto;
import com.ssafy.tedbear.domain.sentence.dto.SentenceBookmarkStatusDto;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SentenceBookmark;
import com.ssafy.tedbear.domain.sentence.repository.SentenceBookmarkRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SentenceBookmarkService {
	private final SentenceBookmarkRepository sentenceBookmarkRepository;

	public void saveSentenceBookmark(Member member, SentenceBookmarkDto sentenceBookmarkDto) {
		SentenceBookmark sentenceBookmark = sentenceBookmarkDto.toEntity(member);
		sentenceBookmarkRepository.save(sentenceBookmark);
	}

	public void deleteSentenceBookmark(Member member, SentenceBookmarkDto sentenceBookmarkDto) {
		Sentence sentence = sentenceBookmarkDto.toSentenceEntity();
		sentenceBookmarkRepository.deleteByMemberAndSentence(member, sentence);
	}

	public SentenceBookmarkStatusDto getBookmarkStatus(Member member, Long sentenceId) {
		Sentence sentence = Sentence.builder().no(sentenceId).build();
		boolean isBookmarked = sentenceBookmarkRepository.findByMemberAndSentence(member, sentence).isPresent();
		return new SentenceBookmarkStatusDto(isBookmarked);
	}

	public SentenceBookmarkDetailDto.ListResponse getBookmarkList(Long memberId, Pageable pageable) {
		List<SentenceBookmarkDetailDto> bookmarkedList = sentenceBookmarkRepository.findSentenceByMember(memberId,
			pageable).getContent();
		return new SentenceBookmarkDetailDto.ListResponse(bookmarkedList);
	}

}
