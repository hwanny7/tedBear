package com.ssafy.tedbear.domain.word.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordSentence;

@Repository
public interface WordSentenceRepository extends JpaRepository<WordSentence, Long> {
}
