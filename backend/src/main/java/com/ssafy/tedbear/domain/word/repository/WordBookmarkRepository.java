package com.ssafy.tedbear.domain.word.repository;

import java.util.Optional;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;

@Repository
public interface WordBookmarkRepository extends JpaRepository<WordBookmark, Long> {
	Optional<WordBookmark> findByMemberAndWord(Member member, Word word);

	@Query("select wb from WordBookmark wb join fetch wb.word where wb.member=:member")
	Slice<WordBookmark> findByMember(Member member);

	@Query("select count(*) from Word as w join fetch WordSentence as ws on w = ws.word join fetch Sentence as s on ws.sentence = s where w.content = :word")
	Long getSentenceCount(String word);
}