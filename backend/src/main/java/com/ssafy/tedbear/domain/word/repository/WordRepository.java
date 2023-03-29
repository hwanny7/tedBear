package com.ssafy.tedbear.domain.word.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.entity.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
	Optional<Word> findByContent(String content);

	List<Word> findByScoreIsNot(int score);

	@Query("select s from Word as w join fetch WordSentence as ws on w = ws.word join fetch Sentence as s on ws.sentence = s where w.content = :word")
	Slice<Sentence> findByWord(String word, Pageable pageable);

	@Query(value = "SELECT * FROM word_tb AS wt JOIN "
		+ "(SELECT CEIL(RAND() * (SELECT MAX(no) FROM word_tb)) AS no) AS r2 "
		+ "WHERE wt.no >= r2.no ORDER BY wt.no ASC LIMIT 1", nativeQuery = true)
	Word findNoByRand();

	@Query(value = "SELECT * FROM word_tb where length(content) between 3 and 8 and score != 0 order by rand() limit 1000", nativeQuery = true)
	List<Word> findWordsForCrosswordGame();
}
