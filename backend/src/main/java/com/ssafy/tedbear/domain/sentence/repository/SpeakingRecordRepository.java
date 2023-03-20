package com.ssafy.tedbear.domain.sentence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;

@Repository
public interface SpeakingRecordRepository extends JpaRepository<SpeakingRecord, Long> {

}
