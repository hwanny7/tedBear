package com.ssafy.tedbear.domain.sentence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

@Repository
public interface SentenceRepository extends JpaRepository<Sentence, Long> {
	List<Sentence> findByNoBetweenAndScoreBetween(long startNo, long endNo, int startScore, int endScore);

	@Query("select s from Sentence s join fetch s.video where s.score between :startScore and :endScore")
	List<Sentence> findByScoreBetween(int startScore, int endScore);

}
