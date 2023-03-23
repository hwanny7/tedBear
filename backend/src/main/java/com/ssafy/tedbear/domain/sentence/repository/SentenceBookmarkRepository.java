package com.ssafy.tedbear.domain.sentence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.SentenceBookmark;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;

@Repository
public interface SentenceBookmarkRepository extends JpaRepository<SentenceBookmark, Long> {
	Optional<SentenceBookmark> findByMemberAndSentence(Member member, Sentence sentence);
}
