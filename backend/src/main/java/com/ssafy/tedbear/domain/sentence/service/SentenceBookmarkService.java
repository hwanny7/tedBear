package com.ssafy.tedbear.domain.sentence.service;

import java.util.List;

import javax.transaction.Transactional;

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

	public void saveSentenceBookmark(Long memberId, SentenceBookmarkDto sentenceBookmarkDto) {
		Member member = Member.builder().no(memberId).build();
		SentenceBookmark sentenceBookmark = sentenceBookmarkDto.toEntity(member);
		sentenceBookmarkRepository.save(sentenceBookmark);
	}

	public void deleteSentenceBookmark(Long memberId, SentenceBookmarkDto sentenceBookmarkDto) {
		Member member = Member.builder().no(memberId).build();
		Sentence sentence = sentenceBookmarkDto.toSentenceEntity();
		sentenceBookmarkRepository.deleteByMemberAndSentence(member, sentence);
	}

	public SentenceBookmarkStatusDto getBookmarkStatus(Long memberId, Long sentenceId) {
		Member member = Member.builder().no(memberId).build();
		Sentence sentence = Sentence.builder().no(sentenceId).build();
		boolean isBookmarked = sentenceBookmarkRepository.findByMemberAndSentence(member, sentence).isPresent();
		return new SentenceBookmarkStatusDto(isBookmarked);
	}

	public SentenceBookmarkDetailDto.ListResponse getBookmarkList(Long memberId) {
		List<SentenceBookmarkDetailDto> bookmarkedList = sentenceBookmarkRepository.findSentenceByMember(memberId);
		return new SentenceBookmarkDetailDto.ListResponse(bookmarkedList);
	}

}
