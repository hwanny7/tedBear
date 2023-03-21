package com.ssafy.tedbear.domain.word.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.word.entity.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
	Optional<Word> findByContent(String content);
}
