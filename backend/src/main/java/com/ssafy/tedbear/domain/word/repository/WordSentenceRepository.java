package com.ssafy.tedbear.domain.word.repository;

import java.util.Optional;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.word.entity.WordBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.word.entity.Word;
import com.ssafy.tedbear.domain.word.entity.WordSentence;

@Repository
public interface WordSentenceRepository extends JpaRepository<WordSentence, Long> {
    @Query("select wb from WordBookmark wb where wb.member = :member and wb.word = :word")
    Optional<WordBookmark> findByMemberAndWord(Member member, Word word);

//    Optional<WordBookmark> findByMemberAndWord(Member member, Word word);
}
