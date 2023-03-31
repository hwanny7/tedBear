package com.ssafy.tedbear.domain.sentence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.sentence.entity.SentenceBookmark;

@Repository
public interface SentenceBookmarkRepository extends JpaRepository<SentenceBookmark, Long> {

	List<SentenceBookmark> findByMemberAndSentenceIn(Member member, List<Sentence> sentenceList);

	void deleteByMemberAndSentence(Member member, Sentence sentence);

	Optional<SentenceBookmark> findByMemberAndSentence(Member member, Sentence sentence);

	@Query("select sb.sentence from SentenceBookmark sb join fetch sb.sentence.video v where sb.member=:member ")
	Slice<Sentence> findSentenceByMember(Member member, Pageable pageable);
}
