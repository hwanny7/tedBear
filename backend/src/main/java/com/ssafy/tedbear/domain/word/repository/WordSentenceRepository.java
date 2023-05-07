package com.ssafy.tedbear.domain.word.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import com.ssafy.tedbear.domain.word.entity.WordSentence;

@Repository
public interface WordSentenceRepository extends JpaRepository<WordSentence, Long> {
	@Query("select wb from WordBookmark wb where wb.member = :member and wb.word = :word")
	Optional<WordBookmark> findByMemberAndWord(Member member, Word word);

	@Query("select ws from WordSentence  ws join fetch ws.sentence where ws.word=:word")
	List<WordSentence> findTop3ByWord(Word word, Pageable pageable);

	Optional<WordSentence> findTop1ByWord(Word word);

	Optional<WordSentence> findByWordNoAndSentenceNo(Long wordNo, Long sentenceNo);
}
