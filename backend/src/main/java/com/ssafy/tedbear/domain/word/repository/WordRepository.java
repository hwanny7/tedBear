package com.ssafy.tedbear.domain.word.repository;

import java.util.List;
import java.util.Optional;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.word.entity.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
	Optional<Word> findByContent(String content);
	List<Word> findByScoreIsNot(int score);
	@Query("select s from Word as w join fetch WordSentence as ws on w = ws.word join fetch Sentence as s on ws.sentence = s where w.content = :word")
	Slice<Sentence> findByWord(String word, Pageable pageable);
}
