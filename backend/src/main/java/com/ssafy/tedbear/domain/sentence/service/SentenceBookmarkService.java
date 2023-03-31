package com.ssafy.tedbear.domain.sentence.service;

import java.util.List;
import java.util.Optional;

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
import com.ssafy.tedbear.global.common.FindMemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SentenceBookmarkService {
	private final SentenceBookmarkRepository sentenceBookmarkRepository;
	private final FindMemberService findMemberService;

	public void saveSentenceBookmark(String memberUid, SentenceBookmarkDto sentenceBookmarkDto) {
		Member member = findMemberService.findMember(memberUid);
		Sentence sentence = new Sentence(sentenceBookmarkDto.getSentenceNo());
		if (isPresent(member, sentence)) {
			throw new IllegalArgumentException("이미 북마크된 문장입니다.");
		}
		SentenceBookmark sentenceBookmark = sentenceBookmarkDto.toEntity(member, sentence);
		sentenceBookmarkRepository.save(sentenceBookmark);
	}

	public void deleteSentenceBookmark(String memberUid, SentenceBookmarkDto sentenceBookmarkDto) {
		Member member = findMemberService.findMember(memberUid);
		Sentence sentence = new Sentence(sentenceBookmarkDto.getSentenceNo());
		if (!isPresent(member, sentence)) {
			throw new IllegalArgumentException("해당 문장의 북마크 정보가 존재하지 않습니다.");
		}
		sentenceBookmarkRepository.deleteByMemberAndSentence(member, sentence);
	}

	public SentenceBookmarkStatusDto getBookmarkStatus(String memberUid, Long sentenceId) {
		Member member = findMemberService.findMember(memberUid);
		Sentence sentence = Sentence.builder().no(sentenceId).build();
		boolean isBookmarked = sentenceBookmarkRepository.findByMemberAndSentence(member, sentence).isPresent();
		return new SentenceBookmarkStatusDto(isBookmarked);
	}

	public SentenceBookmarkDetailDto.ListResponse getBookmarkList(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);
		List<Sentence> bookmarkedSenteceList = sentenceBookmarkRepository.findSentenceByMember(member, pageable)
			.getContent();

		return new SentenceBookmarkDetailDto.ListResponse(bookmarkedSenteceList);
	}

	public boolean isPresent(Member member, Sentence sentence) {
		Optional<SentenceBookmark> byMemberAndSentence = sentenceBookmarkRepository.findByMemberAndSentence(member,
			sentence);
		return byMemberAndSentence.isPresent();
	}

}
