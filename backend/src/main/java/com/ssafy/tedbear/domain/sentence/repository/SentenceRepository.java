package com.ssafy.tedbear.domain.sentence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

@Repository
public interface SentenceRepository extends JpaRepository<Sentence, Long> {
	List<Sentence> findByNoBetweenAndScoreBetween(long startNo, long endNo, int startScore, int endScore);

	List<Sentence> findByScoreBetween(int startScore, int endScore);

}
