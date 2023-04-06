package com.ssafy.tedbear.domain.sentence.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;

@Repository
public interface SpeakingRecordRepository extends JpaRepository<SpeakingRecord, Long> {
	List<SpeakingRecord> findSpeakingRecordsByCreatedDateAfterAndMember(LocalDateTime date, Member member);
}
