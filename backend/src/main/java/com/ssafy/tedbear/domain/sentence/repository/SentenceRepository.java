package com.ssafy.tedbear.domain.sentence.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

@Repository
public interface SentenceRepository extends JpaRepository<Sentence, Long> {
	List<Sentence> findByNoBetweenAndScoreBetween(long startNo, long endNo, int startScore, int endScore);

	@Query("select s from Sentence s join fetch s.video where s.score between :startScore and :endScore")
	List<Sentence> findByScoreBetween(int startScore, int endScore);

	@Query("select s from Sentence s join fetch s.video where s.content like %:query%")
	Slice<Sentence> findSliceByContent(String query, Pageable pageable);


	// @Query(value = "select * "
	// 	+ "from sentence_tb st "
	// 	+ "         inner join word_sentence_tb wst on wst.sentence_no = st.no "
	// 	+ "    inner join video_tb vt on st.video_no = vt.no "
	// 	+ "where wst.word_no = :wordId "
	// 	+ "order by ABS(st.score- :memberScore) asc limit 1", nativeQuery = true)
	// Optional<Sentence> findByWordOrderByMemberScore(Long wordId, Integer memberScore);

	@Query("select ws.sentence from WordSentence ws "
		+ "join fetch ws.sentence.video "
		+ "where ws.word.no = :wordId "
		+ "order by ABS(ws.sentence.score - :memberScore)")
	List<Sentence> findByWordOrderByMemberScore(Long wordId, Integer memberScore,Pageable pageable);


	// @Modifying
	// @Query(value = "UPDATE sentence_tb  SET content = TRIM(SUBSTRING_INDEX(content,':',-1)) WHERE content LIKE '%:%'", nativeQuery = true)
	// void processSentence();
}
